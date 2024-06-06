"use client";

import useWindowSize from "@/lib/hooks/use-window-size";
import { useState } from "react";
import { Cell, Pie, PieChart, Sector } from "recharts";

const COLORS = ["#DC86F3", "#57A9EE"];

export const renderActiveShape = (props: {
  cx: any;
  cy: any;
  midAngle: any;
  innerRadius: any;
  outerRadius: any;
  startAngle: any;
  endAngle: any;
  fill: any;
  payload: any;
  percent: any;
  value: any;
}) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const ex = sx + (cos >= 0 ? 1 : -1) * 22 - 20;
  const ey = sy - 10;

  return (
    <>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={8} fill={"black"}>{`${payload.name
        }: ${(percent * 100).toFixed(0)}%`}</text>
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    </>
  );
};

export default function UserGenderChart({
  data,
  height,
}: {
  data: {
    gender: string;
    value: number;
  }[],
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
        data={data.map(({ gender: name, value }) => ({ name, value }))}
        cx="50%"
        cy="50%"
        outerRadius={isMobile ? 60 : 100}
        fill="#8884d8"
        dataKey="value"
        label
      >
        {/* Iterating over each segment to apply a color */}
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
    </PieChart>
  );
}
