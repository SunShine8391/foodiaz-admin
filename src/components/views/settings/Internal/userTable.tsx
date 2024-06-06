"use client";

import { Heading } from "@/components/elements/headings";
import TablePagination from "../../user-management/pagination";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";

const invoices = [
  {
    id: 1,
    userName: "Devon Lane",
    email: "dolores.chambers@example.com",
    role: "Admin",
    status: "Invited",
    date_created: "11/11/2022",
    last_activity: "12/26/2022",
  },
  {
    id: 2,
    userName: "Devon Lane",
    email: "dolores.chambers@example.com",
    role: "Admin",
    status: "Invited",
    date_created: "11/11/2022",
    last_activity: "12/26/2022",
  },
  {
    id: 3,
    userName: "Devon Lane",
    email: "dolores.chambers@example.com",
    role: "Admin",
    status: "Invited",
    date_created: "11/11/2022",
    last_activity: "12/26/2022",
  },
  {
    id: 4,
    userName: "Devon Lane",
    email: "dolores.chambers@example.com",
    role: "Admin",
    status: "Invited",
    date_created: "11/11/2022",
    last_activity: "12/26/2022",
  },
  {
    id: 5,
    userName: "Devon Lane",
    email: "dolores.chambers@example.com",
    role: "Admin",
    status: "Invited",
    date_created: "11/11/2022",
    last_activity: "12/26/2022",
  },
  {
    id: 6,
    userName: "Devon Lane",
    email: "dolores.chambers@example.com",
    role: "Admin",
    status: "Stopped",
    date_created: "11/11/2022",
    last_activity: "12/26/2022",
  },
  {
    id: 7,
    userName: "Devon Lane",
    email: "dolores.chambers@example.com",
    role: "Admin",
    status: "Stopped",
    date_created: "11/11/2022",
    last_activity: "12/26/2022",
  },
  {
    id: 8,
    userName: "Devon Lane",
    email: "dolores.chambers@example.com",
    role: "Admin",
    status: "Active",
    date_created: "11/11/2022",
    last_activity: "12/26/2022",
  },
];

export default function InternalUserTable() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  return (
    <div className="w-full flex-1">
      <div className="w-full min-w-[1100px]">
        <div className="grid-cols-8 grid border-b border-solid py-3">
          <Heading level={"16"} className="text-[#919191]">
            Name
          </Heading>
          <Heading level={"16"} className="text-[#919191] col-span-2">
            Email
          </Heading>
          <Heading level={"16"} className="text-[#919191]">
            Role
          </Heading>
          <Heading level={"16"} className="text-[#919191]">
            Status
          </Heading>
          <Heading level={"16"} className="text-[#919191]">
            Date created
          </Heading>
          <Heading level={"16"} className="text-[#919191]">
            Last activity
          </Heading>
          <Heading level={"16"} className="text-[#919191]">
            Actions
          </Heading>
        </div>
        {invoices?.map(
          (
            { userName, email, id, role, status, date_created, last_activity },
            index
          ) => (
            <div
              className="grid-cols-8 grid border border-t-0 border-x-0 border-solid py-2 items-center"
              key={index}
            >
              <Heading level={"16"} className="font-semibold py-2">
                {userName}
              </Heading>
              <Heading level={"16"} className="col-span-2 py-2">
                {email}
              </Heading>
              <Heading level={"16"}>{role}</Heading>
              <div
                className={`flex flex-row gap-1 items-center px-1 py-2 w-fit rounded-[6px] ${
                  status === "Invited"
                    ? "bg-[#FCEEE7]"
                    : status === "Active"
                    ? "bg-[#EEF9F3]"
                    : "bg-[#FFF1F1]"
                }`}
              >
                {status === "Invited" ? (
                  <GoDotFill size={16} color="#FF5D00" />
                ) : status === "Active" ? (
                  <GoDotFill size={16} color="#0D9A47" />
                ) : (
                  <GoDotFill size={16} color="#ED1C24" />
                )}
                <Heading level={"16"}>{status}</Heading>
              </div>
              <Heading level={"16"}>{date_created}</Heading>
              <Heading level={"16"}>{last_activity}</Heading>
            </div>
          )
        )}
        <TablePagination onPrev={() => {}} onNext={() => {}} />
      </div>
    </div>
  );
}
