"use client";

import useWindowSize from "@/lib/hooks/use-window-size";
import { GoalChart } from "@/types";
import { useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

const COLORS = ["#FF5D00", "#DC86F3", "#57A9EE", "#75CF9A", "#FFCB7D"];

export default function UserCountryChart({
  data = [],
  height,
}: {
  data: GoalChart[];
  height?: number;
}) {
  const { isMobile } = useWindowSize();
  const [activeIndex, setActiveIndex] = useState(-1);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={262} height={height ?? 200}>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        outerRadius={isMobile ? 60 : 100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {/* Iterating over each segment to apply a color */}
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
