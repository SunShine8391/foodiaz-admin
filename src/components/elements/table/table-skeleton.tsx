import React from "react";

import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = () => {
  const commonNodes = (
    <>
      <Skeleton className="h-[15px] w-[120px] rounded-full"></Skeleton>
      <Skeleton className="h-[15px] w-[220px] rounded-full"></Skeleton>
      <Skeleton className="h-[15px] w-[120px] rounded-full"></Skeleton>
      <Skeleton className="h-[15px] w-[120px] rounded-full"></Skeleton>
      <Skeleton className="h-[15px] w-[90px] rounded-full"></Skeleton>
    </>
  );
  return (
    <div className="w-full rounded-md border">
      <div className="flex items-center justify-between bg-muted px-5 py-3">
        {commonNodes}
      </div>
      <div className="datas">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b px-5 py-4"
          >
            {commonNodes}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
