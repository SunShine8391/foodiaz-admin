"use client";
import React from "react";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  ChartConfiguration,
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

interface AcquisitionStatsProps {
  data: number[];
  labels: string[];
}

export const AcquisitionChart = ({ data, labels }: AcquisitionStatsProps) => {
  const temp = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: data,
        backgroundColor: "#FF5D00",
        animation: {
          duration: 200, // animation of each data (bar)
          easing: "easeOutBounce" as const,
        },
        barThickness: 60,
        borderRadius: {
          topLeft: 4,
          topRight: 4,
          bottomLeft: 0,
          bottomRight: 0,
        },
      },
    ],
  };

  const options: ChartConfiguration<"bar", number[], unknown>["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hide the legend
      },
      title: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Hide the x-axis gridlines
        },
        ticks: {
          color: "#919191", // Change the color of the labels
          font: {
            size: 12, // Adjust the font size of the labels
            weight: "lighter", // Set the font weight of the labels
          },
        },
      },
      y: {
        display: true,
        grid: {
          display: true, // Hide the y-axis gridlines
        },
        ticks: {
          stepSize: 50, // This controls the step size
        },
      },
    },
  };

  const key = Math.random();

  return (
    <div className="w-full h-[220px]">
      <Bar className="w-full" key={key} options={options} data={temp} />
    </div>
  );
};
