"use Client";

import { Heading } from "@/components/elements/headings";
import { Skeleton } from "@mantine/core";
import { Separator } from "@radix-ui/react-separator";
import Image from "next/image";

interface Props {
  label: string;
  value: number;
}

export function MetricsCardMobileSkeleton() {
  return (
    <div className="rounded-[10px] p-5 bg-[#F9F9F9] flex w-full flex-col justify-between gap-3">
      <div className="flex flex-col gap-3">
        <Skeleton width={'2.75rem'} height={'2.75rem'} radius={10} />
        <Skeleton width={100} height={15} radius={5} />
      </div>
      <Separator className="border border-[#EAEAEA] border-solid" />
      <Skeleton width={30} height={15} radius={5} />
    </div>
  );
}

export default function MetricsCardMobile({ label, value }: Props) {
  return (
    <div className="rounded-[10px] p-5 bg-[#F9F9F9] flex w-full flex-col justify-between gap-3">
      <div className="flex flex-col gap-3">
        <div
          className="rounded-[10px] p-2 h-11 w-11 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(82deg, #FFA978 -14.75%, #FF5D00 117.29%)",
          }}
        >
          {label === "Total Recipes" ? (
            <Image
              src={"/logo/flower.svg"}
              alt=""
              width={20}
              height={20}
              className="opacity-60"
            />
          ) : (
            <Image
              src={"/logo/list.svg"}
              alt=""
              width={20}
              height={20}
              className="opacity-60"
            />
          )}
        </div>
        <Heading level={"16"} className="text-">
          {label}
        </Heading>
      </div>
      <Separator className="border border-[#EAEAEA] border-solid" />
      <Heading level={"18"}>{value}</Heading>
    </div>
  );
}
