"use client";

import { CHART_COLORS } from '@/config/constants';
import { MealTypeRatioItemType } from '@/types/dashboard';
import { Cell, Pie, PieChart } from "recharts";

interface MealChartPropType {
  data: MealTypeRatioItemType[]
}

export function MealChart({ data }: MealChartPropType) {
  return (
    <PieChart width={280} height={300}>
      <Pie
        data={data.map(item => ({ name: item.MealTypeName, value: item.Ratio }))}
        cx="50%"
        cy="50%"
        innerRadius={90}
        outerRadius={140}
        fill="#8884d8"
        paddingAngle={2}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
