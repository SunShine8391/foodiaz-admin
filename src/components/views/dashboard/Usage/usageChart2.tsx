"use client";
import React from "react";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  ChartDataLabels
);

interface EarningStatsCardProps {
  labels: string[];
  data: number[];
}

const options = {
  indexAxis: "y" as const, // This changes the chart to horizontal bar
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    datalabels: {
      display: true,
      labels: {
        title: {
          align: "top" as const,
          anchor: "center" as const,
          formatter: (value: any, context: any) => {
            return context.chart.data.labels[context.dataIndex];
          },
        },
        value: {
          align: "top" as const,
          anchor: "end" as const,
          formatter: (value: number) => {
            return value;
          },
        },
      },
    },
  },
  scales: {
    x: {
      display: true,
      grid: {
        display: true, // Show the x-axis gridlines
      },
    },
    y: {
      grid: {
        display: false, // Hide the y-axis gridlines
      },
      ticks: {
        display: false, // Remove the y-axis values
      },
    },
  },
  layout: {
    padding: {
      top: 10,
      right: 0, // Increase right padding to ensure labels fit
      bottom: 0,
      left: 0,
    },
  },
};

export const MostRageChart = (props: EarningStatsCardProps) => {
  const { data, labels } = props;

  const temp = {
    labels,
    datasets: [
      {
        label: "Rage taps",
        data: data,
        backgroundColor: "#FFA978",
        barThickness: 16,
        borderRadius: {
          topLeft: 0,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 4,
        },
      },
    ],
  };

  return (
    <div className="w-full">
      <Bar className="w-full" options={options} data={temp} />
    </div>
  );
};
