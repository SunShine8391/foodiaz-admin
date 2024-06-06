import { Heading } from "@/components/elements/headings";
import Image from "next/image";
import { Skeleton } from "@mantine/core";

interface Props {
  label: string;
  value: number;
}

export function MetricsCardSkeleton() {
  return (
    <div className="rounded-2xl p-6 bg-[#F9F9F9] flex w-full flex-row justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
        <Skeleton width={'2.75rem'} height={'2.75rem'} radius={10} />
        <Skeleton width={100} height={15} radius={5} />
      </div>
      <Skeleton width={30} height={15} radius={5} />
    </div>
  );
}

export default function MetricsCard({ label, value }: Props) {
  return (
    <div className="rounded-2xl p-6 bg-[#F9F9F9] flex w-full flex-row justify-between items-center">
      <div className="flex flex-row gap-2 items-center">
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
        <Heading level={"8"}>{label}</Heading>
      </div>
      <Heading level={"7"}>{value}</Heading>
    </div>
  );
}
