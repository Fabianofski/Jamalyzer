"use client";
import React, { ReactElement, useEffect, useState } from "react";

import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { updateStyle } from "@/utilities/Color/ChartColorObserver";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const labels = [];
for (let i = 0; i < 10; i++) labels.push(i);

export const dummyLineData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 200),
      lineTension: 0.4,
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "white",
    },
  ],
};

interface Props {
  styleClass: string;
  data: ChartData<"line", any>;
  title: string;
}

export function LineChartCard({
  styleClass,
  data = dummyLineData,
  title = "Dummy Title",
}: Props): ReactElement {
  const [chartColor, setChartColor] = useState<string>("");
  const [gridColor, setGridColor] = useState<string>("");

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setGridColor(style.getPropertyValue("--darker-background-color"));
    setChartColor(style.getPropertyValue("--text-color"));
  });

  updateStyle(setChartColor, setGridColor);

  const lineOptions: object = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        color: chartColor,
      },
    },
    scales: {
      y: {
        grid: {
          color: gridColor,
          borderColor: gridColor,
        },
        ticks: {
          color: chartColor,
        },
        position: "left",
      },
      x: {
        grid: {
          color: gridColor,
          borderColor: gridColor,
        },
        ticks: {
          color: chartColor,
        },
        position: "center",
      },
    },
  };

  return (
    <div className={styleClass + " chart-card"}>
      <div className="chart">
        <Line
          options={lineOptions}
          data={data}
          style={{ minHeight: "20rem", color: "white" }}
        />
      </div>
    </div>
  );
}
