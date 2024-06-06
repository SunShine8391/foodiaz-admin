"use client";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { getUsersByFilter, getUsersCount } from "@/lib/firebase/firestore";
import { filterAtom, usersCountAtom } from "@/lib/jotai";
import { User } from "@/types";
import { Input } from "@mantine/core";
import { QueryFieldFilterConstraint, orderBy, startAfter, where } from "firebase/firestore";
import { useAtom, useAtomValue } from "jotai";
import { lowerCase } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { HiSearch } from "react-icons/hi";
import InfiniteScroll from 'react-infinite-scroll-component';
import { toast } from "sonner";
import Card from "./cardMobile";
import TableCard from "./table-card";

let intervalId: NodeJS.Timeout | undefined;

export default function UserManagementMobile() {
  const userCount = useAtomValue(usersCountAtom);
  const [filter, setFilter] = useAtom(filterAtom);

  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getFilters = useCallback(() => {
    return [
      (filter.search.length > 0) && where("name", ">=", filter.search),
      (filter.region !== "All") && where("region", "==", filter.region),
      (filter.deviceType !== "All") && where("device_type", "==", filter.deviceType),
      (filter.subscription !== "All") && where("subscription", "==", lowerCase(filter.subscription))
    ].filter((item) => item !== false) as QueryFieldFilterConstraint[];
  }, [filter]);

  const loadUsers = useCallback(async (loadFirst=false) => {
    const lastUser = users.at(users.length - 1);

    try {
      const filter = getFilters();

      let documents = await getUsersByFilter(
        orderBy('name'),
        orderBy('uid'),
        ...filter,
        ...((!loadFirst && lastUser) ? [startAfter(lastUser.userName, lastUser.uid)] : [])
      );
      const totalCount = await getUsersCount(filter);
      setTotalCount(totalCount);

      const nextUsers: User[] = documents.map((item) => ({
        id: item.id,
        uid: item.uid,
        userName: item.name ?? "Not Found",
        country: String(item.region).length > 0 ? item.region : "Not Found",
        device: item.device_type ?? "Not Found",
        subscription: item.subscription ?? "Free",
        zipCode: item.zip_code && String(item.zip_code).length > 0 ? item.zip_code : "Not Found",
      }));

      if (loadFirst) {
        setUsers(nextUsers);
      } else {
        setUsers([...users, ...nextUsers]);
      }

      setIsLoading(false);
    } catch (err) {
      toast.error((err as Error).message);
    }
  }, [users, getFilters]);

  useEffect(() => { loadUsers(true); }, [filter]);

  return (
    <div className="p-4 flex flex-col gap-5">
      <Input
        leftSection={<HiSearch />}
        placeholder="Search"
        classNames={{
          wrapper:
            "bg-transparent border rounded-xl px-3 !shadow-input-box h-10",
          input: "border-transparent !pl-6 !border-none",
          section: "text-muted-foreground",
        }}
        onChange={(e) => {
          clearInterval(intervalId);
          intervalId = setTimeout(() => {
            setFilter({ ...filter, search: e.target.value });
          }, 1000);
        }}
        onKeyUp={async (e) => {
          if (e.keyCode === 13) loadUsers(true);
        }}
      />
      <Card
        loading={userCount.state !== 'hasData'}
        Users={(userCount.state === 'hasData') && userCount.data.total}
        Premium={(userCount.state === 'hasData') && userCount.data.premium}
        Free={(userCount.state === 'hasData') && userCount.data.free}
      />
      <InfiniteScroll
        dataLength={users.length}
        next={loadUsers}
        hasMore={users.length < totalCount}
        loader={<div className="h-11 mt-1 flex justify-center"><LoadingSpinner /></div>}
      >
        <div className="flex flex-col gap-4">
          {users.map((user, index) => (
            <div key={index}>
              <TableCard
                data={{
                  id: user.id,
                  userName: user.userName,
                  country: user.country,
                  device: user.device,
                  zipCode: user.zipCode,
                }}
              />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
