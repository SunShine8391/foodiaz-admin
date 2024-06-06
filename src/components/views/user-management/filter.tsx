"use client"

import { Heading } from "@/components/elements/headings";
import { FilterIcon } from "@/components/icons/filter";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { deviceOptions, regionOptions, subscriptionOptions } from "@/config";
import { filterAtom } from "@/lib/jotai";
import { useAtom } from "jotai";
import { ChevronLeft } from "lucide-react";
import { useCallback, useState } from "react";

export default function UserFilter() {
  const [filter, setFilter] = useAtom(filterAtom);

  const [open, setOpen] = useState<boolean>(false);
  const [deviceType, setDeviceType] = useState<string>("All");
  const [region, setRegion] = useState<string>("All");
  const [subscription, setSubscription] = useState<string>("All");

  const handleSubmit = useCallback(() => {
    setFilter({
      ...filter,
      deviceType,
      region,
      subscription
    });
    setOpen(false);
  }, [region, deviceType, subscription, filter, setFilter]);

  const handleFilterClear = useCallback(() => {
    setRegion("All");
    setDeviceType("All");
    setSubscription("All");
  }, []);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant={"link"} className="p-0">
          <FilterIcon className="absolute right-5 w-5 h-5 cursor-pointer" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-full h-full rounded-none">
        <div className="p-5 pt-10 mx-auto w-full h-full flex flex-col overflow-auto">
          <div className="relative flex flex-row items-center h-[42px]">
            <DrawerClose asChild>
              <Button variant="outline" className="border-none absolute" size="icon">
                <ChevronLeft className="h-4 w-4" color="#333333" />
              </Button>
            </DrawerClose>
            <DrawerTitle className="uppercase text-center w-full">
              filters
            </DrawerTitle>
          </div>
          <div className="flex flex-col gap-3 mt-3">
            <div className="p-5 rounded-[10px] bg-[#F9F9F9] flex flex-col gap-4">
              <Heading level={"9"} className="text-start">
                Country
              </Heading>
              <div className="flex flex-row flex-wrap gap-2">
                {regionOptions?.map((item, index) => (
                  <Button
                    variant="outline"
                    className={`rounded-[30px] px-4 py-2 text-[14px] leading-5 font-medium not-italic ${item === region
                        ? "bg-primary text-white"
                        : "text-[#333] border-[#B3B3B3]"
                      }`}
                    key={index}
                    onClick={() => setRegion(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-[10px] bg-[#F9F9F9] flex flex-col gap-4">
              <Heading level={"9"} className="text-start">
                Device
              </Heading>
              <div className="flex flex-row flex-wrap gap-2">
                {deviceOptions?.map((item, index) => (
                  <Button
                    variant="outline"
                    className={`rounded-[30px] px-4 py-2 text-[14px] leading-5 font-medium not-italic ${item === deviceType
                        ? "bg-primary text-white"
                        : "text-[#333] border-[#B3B3B3]"
                      }`}
                    key={index}
                    onClick={() => setDeviceType(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <div className="p-5 rounded-[10px] bg-[#F9F9F9] flex flex-col gap-4">
              <Heading level={"9"} className="text-start">
                Subscription
              </Heading>
              <div className="flex flex-row flex-wrap gap-2">
                {subscriptionOptions?.map((item, index) => (
                  <Button
                    variant="outline"
                    className={`rounded-[30px] px-4 py-2 text-[14px] leading-5 font-medium not-italic ${item === subscription
                        ? "bg-primary text-white"
                        : "text-[#333] border-[#B3B3B3]"
                      }`}
                    key={index}
                    onClick={() => setSubscription(item)}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button
              className="px-5 py-4 bg-[#FF5D00] rounded-[10px] uppercase font-semibold not-italic text-base"
              onClick={handleSubmit}
            >
              Apply
            </Button>
            <Button
              variant={"link"}
              className="uppercase cursor-pointer text-center underline text-base font-semibold not-italic text-[#333]"
              onClick={handleFilterClear}
            >
              Clear all filters
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
