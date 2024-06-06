"use client"

import { Heading } from "@/components/elements/headings";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { userCountAtom, userCountPeriodAtom } from "@/lib/jotai";
import { devide, getComparingText, percentage } from "@/lib/utils";
import { Duration } from "@/types/dashboard/app-usage";
import { useAtom } from "jotai";
import { HiOutlineArrowRightCircle } from "react-icons/hi2";

export default function UserCount() {
  const [period, setPeriod] = useAtom(userCountPeriodAtom);
  const [userCount] = useAtom(userCountAtom);

  return (
    <div
      className="p-6 rounded-2xl flex flex-col gap-5 w-full h-fit"
      style={{ boxShadow: "0px 2px 8px 0px rgba(51, 51, 51, 0.13)" }}
    >
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-1">
          <Heading level={"9"} className="text-start">
            User Count
          </Heading>
          <Heading level={"10"} className="text-start">
            {userCount.state === 'hasData'
              ? userCount.data.range.cur.start + ' - ' + userCount.data.range.cur.end
              : userCount.state
            }
          </Heading>
        </div>
        <Select value={period} onValueChange={v => setPeriod(v as Duration)}>
          <SelectTrigger className="w-28">
            <SelectValue placeholder="7 days" />
          </SelectTrigger>
          <SelectContent className="h-[150px]">
            <SelectGroup>
              <SelectItem value="1d">1 day</SelectItem>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="1m">1 month</SelectItem>
              <SelectItem value="3m">3 months</SelectItem>
              <SelectItem value="6m">6 months</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      {userCount.state === 'hasData' ? (
        <div className="flex flex-col gap-2 justify-center items-center">
          <Heading level={"12"}>{userCount.data.curValue}</Heading>
          <div className="flex flex-row gap-2 items-center">
            <div className="flex flex-row gap-1 items-center">
              <Heading
                level={"11"}
                className={(userCount.data.rateChange < 0) ? 'text-[#ED1C24]' : 'text-[#0d9a47]'}
              >
                {percentage(devide(userCount.data.curValue, userCount.data.prevValue))}
              </Heading>
              <HiOutlineArrowRightCircle
                color={(userCount.data.rateChange < 0) ? '#ED1C24' : '#0d9a47'}
                size={16}
                style={{
                  transform: (userCount.data.rateChange < 0) ? "rotate(45deg)" : "rotate(-45deg)"
                }}
              />
            </div>
            <Heading level={"11"} className="text-[#919191]">
              {getComparingText(period)}
            </Heading>
          </div>
        </div>
      ) : (
        <Skeleton className="w-full h-6" />
      )}
    </div>
  );
}