"use client";

import { Heading } from "@/components/elements/headings";
import { routes } from "@/config";
import { User } from "@/types";
import { upperFirst } from "lodash";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { IoLogoAndroid, IoLogoApple, IoMdCloseCircle } from "react-icons/io";
import { MdStars } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Button } from "../../ui/button";

export default function UserTable({
  users,
  isLoading,
}: {
  users: User[];
  isLoading: boolean;
}) {
  const router = useRouter();

  return (
    <div className="w-full flex-1 flex flex-col overflow-x-auto p-2">
      <div className="w-full min-w-[1000px] relative flex flex-col">
        <div className="grid-cols-5 grid border-b border-solid py-3">
          <Heading level={"11"} className="text-[#919191] col-span-1">
            Name
          </Heading>
          <Heading level={"11"} className="text-[#919191] col-span-1">
            Country
          </Heading>
          <Heading level={"11"} className="text-[#919191] col-span-1">
            Device
          </Heading>
          <Heading level={"11"} className="text-[#919191] col-span-1">
            Zip code
          </Heading>
          <Heading level={"11"} className="text-[#919191] col-span-1">
            Subscription
          </Heading>
        </div>
        {isLoading ? Array.from({ length: 10 }).map((_, index) => (
          <div role="status" className="animate-pulse" key={index}>
            <div className="grid grid-cols-5 p-2">
              <div className="col-span-1 flex items-center gap-3">
                <svg
                  className="h-10 w-10 text-slate-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                </svg>
                <div className="h-3 w-2/3 rounded-lg bg-slate-300"></div>
              </div>
              <div className="col-span-1 flex items-center justify-start">
                <div className="h-3 w-2/3 rounded-lg bg-slate-300"></div>
              </div>
              <div className="col-span-1 flex items-center justify-start">
                <div className="h-3 w-2/3 rounded-lg bg-slate-300"></div>
              </div>
              <div className="col-span-1 flex items-center justify-start">
                <div className="h-3 w-2/3 rounded-lg bg-slate-300"></div>
              </div>
              <div className="col-span-1 flex items-center justify-start">
                <div className="h-3 w-2/3 rounded-lg bg-slate-300"></div>
              </div>
            </div>
          </div>
        )) : users?.map(({ country, device, id, subscription, userName, zipCode, uid }, index) => (
          <div
            className="grid-cols-5 grid border border-t-0 border-x-0 border-solid py-2 items-center"
            key={index}
          >
            <div className="flex flex-row gap-3 items-center col-span-1">
              <Avatar className="w-9 h-9">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Heading level={"11"}>{userName}</Heading>
            </div>
            <Heading level={"11"} className="col-span-1">
              {country}
            </Heading>
            <div className="flex flex-row gap-1 items-center col-span-1">
              {device === "iOS" ? (
                <IoLogoApple size={24} color="#919191" />
              ) : (
                <IoLogoAndroid size={24} color="#919191" />
              )}
              <Heading level={"11"}>{device}</Heading>
            </div>
            <Heading level={"11"} className="col-span-1">
              {zipCode}
            </Heading>
            <div className="text-end col-span-1 flex justify-between items-center">
              <div
                className={
                  `px-2 py-1 flex flex-row gap-1 w-fit items-center rounded-[6px] ${subscription === "free" ? "bg-[#FFF1F1]" : "bg-[#EEF9F3]"}`
                }
              >
                {subscription === "free" ? (
                  <IoMdCloseCircle size={14} color="#ED1C24" />
                ) : (
                  <MdStars size={14} color="#0D9A47" />
                )}
                <Heading level={"11"}>{upperFirst(subscription)}</Heading>
              </div>
              <Button
                variant="outline"
                className="border-none rounded-[10px]"
                size="icon"
                asChild
              >
                <Link href={routes.user.profile(`${id}`)}>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
