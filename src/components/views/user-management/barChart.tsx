"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";

export function Chart({
  data
}: {
  data: {
    name: string;
    total: number;
  }[]
}) {
  return (
    <ResponsiveContainer width="100%" minHeight={204}>
      <BarChart data={data} height={204} barGap={30}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#FF5D00" stopOpacity={1} />
            <stop offset="95%" stopColor="#FFA978" stopOpacity={0.9} />
          </linearGradient>
        </defs>

        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={true}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <Bar
          dataKey="total"
          fill="url(#colorUv)"
          maxBarSize={40}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
