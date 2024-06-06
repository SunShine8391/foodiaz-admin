"use client";

import useWindowSize from "@/lib/hooks/use-window-size";
import { GoalChart } from "@/types";
import { Cell, Pie, PieChart } from "recharts";

export default function PurposeChart({
  data = [],
  height
}: {
  data: GoalChart[];
  height?: number;
}) {
  const { isMobile } = useWindowSize()
  return (
    <PieChart width={262} height={height ?? 200}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={isMobile ? 60 : 100}
        fill="#8884d8"
        label
      >
        {/* Iterating over each segment to apply a color */}
        {data.map(({ color }, index) => (
          <Cell key={`cell-${index}`} fill={color} />
        ))}
      </Pie>
    </PieChart>
  );
}
