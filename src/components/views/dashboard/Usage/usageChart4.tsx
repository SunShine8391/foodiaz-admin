"use client";
import { insertHyphenYearMonth } from "@/lib/utils";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
  }[];
}

const options = {
  elements: {
    point: {
      radius: 1
    }
  },
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
          weight: "lighter" as const,
        },
      },
    },
    y: {
      display: true,
      grid: {
        display: true, // Show the y-axis gridlines
      },
      ticks: {
        stepSize: 5, // This controls the step size
      },
    },
  },
};

export const MonthlyActiveChart = ({
  data: {
    data,
    labels
  }
}: {
  data: {
    data?: number[];
    labels?: string[];
  }
}) => {
  const chartData: ChartData = {
    labels: labels?.map(
      item => new Date(insertHyphenYearMonth(item) + '-01').toUTCString().slice(8, 16)
    ) ?? [],
    datasets: [
      {
        label: "Visits",
        data: data ?? [],
        borderColor: "#75CF9A",
        backgroundColor: "#75CF9A",
      },
    ],
  };

  return (
    <div className="w-full h-[200px]">
      <Line className="w-full" options={options} data={chartData} />
    </div>
  );
};
