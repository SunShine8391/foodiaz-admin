"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { dashboardPageLinks, navLinks, settingPageLinks } from "@/config";
import { useEffect, useState } from "react";
import { Text } from "../elements/typography";

const BottomBar = () => {
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
    <section className="shadow-bottom-bar bg-white fixed bottom-0 z-10 h-14 w-full rounded-t-lg lg:hidden">
      <div className="xs:gap-5 container grid grid-cols-3 h-full items-center justify-between gap-3">
        {navLinks.map(({ icon: Icon, link, name, mobile }, index) => {
          if (!link) return null;

          const isActive =
            (pathname.includes(link) && link.length > 1) || pathname === link;

          return (
            <Link
              href={link}
              key={index}
              className={`relative flex flex-col col-span-1 items-center gap-1 rounded-lg p-2 sm:flex-1 sm:px-2 sm:py-2.5 ${
                isActive && "bg-primary-500"
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  name === currentPage ? "text-[#333333]" : "text-[#AFAFAF]"
                }`}
              />

              <Text
                level={"sm"}
                className={cn(
                  "font-medium ",
                  name === currentPage
                    ? "font-bold text-[#333333]"
                    : "text-[#AFAFAF]"
                )}
              >
                {mobile.toUpperCase()}
              </Text>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default BottomBar;
