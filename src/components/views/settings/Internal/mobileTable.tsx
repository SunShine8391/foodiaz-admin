"use client";

import { Heading } from "@/components/elements/headings";
import TablePagination from "../../user-management/pagination";
import { GoDotFill } from "react-icons/go";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { routes } from "@/config";
import { Separator } from "@/components/ui/separator";
import { CiEdit } from "react-icons/ci";

export default function InternalUserMobileTable() {
  const invoices = [
    {
      id: 1,
      userName: "Devon Lane",
      email: "dolores.chambers@example.com",
      role: "Admin",
      status: 1,
      date_created: "11/11/2022",
      last_activity: "12/26/2022",
    },
    {
      id: 2,
      userName: "Devon Lane",
      email: "dolores.chambers@example.com",
      role: "Admin",
      status: 0,
      date_created: "11/11/2022",
      last_activity: "12/26/2022",
    },
    {
      id: 3,
      userName: "Devon Lane",
      email: "dolores.chambers@example.com",
      role: "Admin",
      status: 1,
      date_created: "11/11/2022",
      last_activity: "12/26/2022",
    },
    {
      id: 4,
      userName: "Devon Lane",
      email: "dolores.chambers@example.com",
      role: "Admin",
      status: 1,
      date_created: "11/11/2022",
      last_activity: "12/26/2022",
    },
    {
      id: 5,
      userName: "Devon Lane",
      email: "dolores.chambers@example.com",
      role: "Admin",
      status: 1,
      date_created: "11/11/2022",
      last_activity: "12/26/2022",
    },
    {
      id: 6,
      userName: "Devon Lane",
      email: "dolores.chambers@example.com",
      role: "Admin",
      status: 1,
      date_created: "11/11/2022",
      last_activity: "12/26/2022",
    },
    {
      id: 7,
      userName: "Devon Lane",
      email: "dolores.chambers@example.com",
      role: "Admin",
      status: 1,
      date_created: "11/11/2022",
      last_activity: "12/26/2022",
    },
    {
      id: 8,
      userName: "Devon Lane",
      email: "dolores.chambers@example.com",
      role: "Admin",
      status: 0,
      date_created: "11/11/2022",
      last_activity: "12/26/2022",
    },
  ];
  return (
    <div className="flex flex-col gap-3">
      {invoices.map((item, index) => (
        <div className="p-5 rounded-[10px] bg-[#F9F9F9]" key={index}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row gap-3 items-center">
                {item.status ? (
                  <GoDotFill size={16} color="#0D9A47" />
                ) : (
                  <GoDotFill size={16} color="#FF5D00" />
                )}
                <Heading level={"9"} className="text-start">
                  {item.userName}
                </Heading>
              </div>
              <CiEdit size={20} color="#919191" className="cursor-pointer" />
            </div>
            <Separator />
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-1 w-full">
                <Heading level={"14"} className="text-[#919191]">
                  Email
                </Heading>
                <Heading level={"16"} className="truncate w-[120px]">
                  {item.email}
                </Heading>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Heading level={"14"} className="text-[#919191]">
                  Role
                </Heading>
                <Heading level={"16"}>{item.role}</Heading>
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col gap-1 w-full">
                <Heading level={"14"} className="text-[#919191]">
                  Date created
                </Heading>
                <Heading level={"16"}>{item.date_created}</Heading>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <Heading level={"14"} className="text-[#919191]">
                  Last activity
                </Heading>
                <Heading level={"16"}>{item.last_activity}</Heading>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
