"use client";

import { Heading } from "@/components/elements/headings";
import { fixedNumber } from "@/lib/utils";
import { RecipeItem } from '@/types/dashboard';

interface RateProps {
  data: RecipeItem[];
  type: string;
}

export const RateTable = ({ data, type }: RateProps) => {
  return (
    <div className="w-full pl-4">
      <div className="grid-cols-6 grid border-b border-solid py-3">
        <Heading level={"16"} className="col-span-4 text text-[#919191]">
          Recipe
        </Heading>
        <Heading level={"16"} className="col-span-1 text-[#919191]">
          Rating
        </Heading>
        <Heading level={"16"} className="col-span-1 text-[#919191]">
          Rated
        </Heading>
      </div>
      {data?.map(({ Name, Rating, NumberOfRate }, index) => (
        <div
          className="grid-cols-6 grid border border-t-0 border-x-0 border-solid py-2 items-center"
          key={index}
        >
          <div className="flex col-span-4 flex-row gap-3 items-center">
            <Heading level={"16"}>{Name}</Heading>
          </div>
          <Heading
            level={"16"}
            className={`${
              type === "Most" ? "text-[#0D9A47]" : "text-[#ED1C24]"
            }`}
          >
            {fixedNumber(Rating, 1)}
          </Heading>
          <Heading level={"16"}>{NumberOfRate}</Heading>
        </div>
      ))}
    </div>
  );
};
