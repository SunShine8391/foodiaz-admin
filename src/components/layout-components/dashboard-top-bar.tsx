"use client";

import { dashboardLinks, settingLinks } from "@/config";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { Text } from "../elements/typography";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Separator } from "../ui/separator";

export default function DashboardTopNavbar({
  variant,
}: {
  variant: "DASHBOARD" | "SETTING";
}) {
  const pathname = usePathname();
  const navLinks = useMemo(
    () => (variant === "DASHBOARD" ? dashboardLinks : settingLinks),
    [variant]
  );

  const [currentTab, setCurrentTab] = useState<string>("");

  useEffect(() => {
    const settingPage = settingLinks.find((item) =>
      pathname.includes(item.link.toString())
    );

    if (settingPage) {
      setCurrentTab(settingPage.name);
      return;
    }

    const dashboardPage = dashboardLinks.find((item) =>
      pathname.includes(item.link.toString())
    );

    if (dashboardPage) {
      setCurrentTab(dashboardPage.name);
      return;
    }
  }, [pathname]);

  return (
    <Tabs
      className="flex lg:hidden w-full flex-col px-3"
      value={currentTab}
      onValueChange={(e) => setCurrentTab(e)}
    >
      <TabsList
        className={`w-full bg-transparent max-w-dashboard-top-bar pb-0 ${
          variant === "DASHBOARD"
            ? "grid-cols-4 flex flex-row justify-between sm:grid overflow-x-auto"
            : "grid-cols-2 grid"
        }`}
      >
        {navLinks.map(({ name, label, link }, index) => (
          <TabsTrigger
            key={index}
            value={name}
            asChild
            className="col-span-1 text-[#919191] data-[state=active]:bg-transparent data-[state=active]:border-[#333333] data-[state=active]:shadow-none rounded-none data-[state=active]:border-b-[3px] data-[state=active]:text-[#333333] data-[state=active]:font-semibold"
          >
            <Link href={link}>
              <Text level={"base"}>{label}</Text>
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>
      <Separator />
    </Tabs>
  );
}
