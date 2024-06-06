"use client";

import { settingPageLinks, navLinks } from "@/config/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Heading } from "../elements/headings";
import { settingLinks } from "@/config/constants";

export default function SettingSideGroup() {
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<string>(navLinks[0].name);

  useEffect(() => {
    const isInternalUserPage = settingPageLinks.findIndex((item) =>
      pathname.includes(item)
    );

    if (isInternalUserPage !== -1 && pathname.includes("/internal-user")) {
      setCurrentPage("internal");
      return;
    }

    const isAccountSettingsPage = settingPageLinks.findIndex((item) =>
      pathname.includes(item)
    );

    if (isAccountSettingsPage !== -1 && pathname.includes("/setting")) {
      setCurrentPage("accountSettings");
      return;
    }
  }, [pathname]);

  return (
    <nav className="h-full w-[247px] p-8 lg:flex flex-col gap-6 hidden">
      <Heading level={"7"}>Settings</Heading>
      <div className="flex flex-col gap-2 items-start w-full">
        {settingLinks.map(({ icon: Icon, label, link, name }, index) => (
          <Link className="w-full" href={link} key={index}>
            <div
              className={`rounded-[10px] p-3 flex flex-row w-full gap-2 items-center ${
                name === currentPage ? "bg-[#F4F4F4]" : ""
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  name === currentPage ? "text-[#333333]" : "text-[#919191]"
                }`}
              />
              <Heading
                level={"16"}
                className={`${
                  name === currentPage ? "text-[#333333]" : "text-[#919191]"
                }`}
              >
                {label}
              </Heading>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
