"use client";

import {
  dashboardPageLinks,
  navLinks,
  settingPageLinks,
} from "@/config/constants";
import { Text } from "../elements/typography";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavLinkGroup() {
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<string>(navLinks[0].name);

  useEffect(() => {
    const isSettingPage =
      settingPageLinks.findIndex((item) => pathname.includes(item)) !== -1;

    if (isSettingPage) {
      setCurrentPage("setting");
      return;
    }

    const isDashboardPage =
      dashboardPageLinks.findIndex((item) => pathname.includes(item)) !== -1;

    if (isDashboardPage) {
      setCurrentPage("dashboard");
      return;
    }

    setCurrentPage("user");
  }, [pathname]);

  return (
    <div className="flex flex-row gap-7 items-center">
      {navLinks.map(({ icon: Icon, label, link, name }, index) => (
        <Link href={link} key={index}>
          <Text
            level={"md"}
            className={`flex items-center gap-2 font-medium ${
              name === currentPage ? "text-white" : "text-[#AFAFAF]"
            }`}
          >
            <Icon
              className={`w-4 h-4 ${
                name === currentPage ? "text-white" : "text-[#AFAFAF]"
              }`}
            />
            {label}
          </Text>
        </Link>
      ))}
    </div>
  );
}
