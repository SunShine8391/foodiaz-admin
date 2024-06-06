"use client";

import { CHART_COLORS } from "@/config";
import useWindowSize from "@/lib/hooks/use-window-size";
import { PopularFeatureItem } from "@/types/dashboard/app-usage";
import { Cell, Pie, PieChart } from "recharts";

export default function ChartPie({
  data,
  height
}: {
  data: PopularFeatureItem[];
  height?: number;
}) {
  const { isMobile } = useWindowSize()

  return (
    <PieChart width={262} height={188}>
      <Pie
        data={data.map(item => ({ name: item.label, value: item.value }))}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={isMobile ? 60 : 100}
        fill="#8884d8"
      >
        {/* Iterating over each segment to apply a color */}
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
