"use client";

import {
  dashboardLinks,
  dashboardPageLinks,
  navLinks,
} from "@/config/constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Heading } from "../elements/headings";

export default function NavSideGroup() {
  const pathname = usePathname();

  const [currentPage, setCurrentPage] = useState<string>(navLinks[0].name);

  useEffect(() => {
    const isIngredientsPage = dashboardPageLinks.findIndex((item) =>
      pathname.includes(item)
    );

    if (isIngredientsPage !== -1 && pathname.includes("/ingredients")) {
      setCurrentPage("ingredients");
      return;
    }

    const isRecipesPage = dashboardPageLinks.findIndex((item) =>
      pathname.includes(item)
    );

    if (isRecipesPage !== -1 && pathname.includes("/recipes")) {
      setCurrentPage("recipes");
      return;
    }

    const isUsagePage = dashboardPageLinks.findIndex((item) =>
      pathname.includes(item)
    );

    if (isUsagePage !== -1 && pathname.includes("/usage")) {
      setCurrentPage("usage");
      return;
    }

    setCurrentPage("metrics");
  }, [pathname]);

  return (
    <div className="h-full w-[247px] p-8 lg:flex flex-col gap-6 hidden">
      <Heading level={"7"}>Dashboard</Heading>
      <div className="flex flex-col gap-2 items-start w-full">
        {dashboardLinks.map(({ icon: Icon, label, link, name }, index) => (
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
    </div>
  );
}
