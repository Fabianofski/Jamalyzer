"use client";
import { Pie } from "react-chartjs-2";
import React, { ReactElement, useEffect, useState } from "react";

import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  Title,
  Tooltip,
  TooltipItem,
} from "chart.js";
import { getJamPrimaryVariations } from "@/utilities/Color/ColorManager";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export const dummyPieData = {
  labels: ["Solo", "Duo", "More than 3"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};

interface Props {
  styleClass: string;
  data: ChartData<"pie", any>;
  title: string;
  showLegend?: boolean;
}

export function PieChartCard({
  styleClass,
  data = dummyPieData,
  title = "Dummy Title",
  showLegend = true,
}: Props): ReactElement {
  const [chartColor, setChartColor] = useState<string>("");
  useEffect(() => {
    setChartColor(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--text-color"
      )
    );
    document.addEventListener("textColorChanged", (e: any) =>
      setChartColor(e.detail)
    );
  }, []);

  let sum: number = 0;
  data.datasets[0].data.forEach((value: any) => {
    sum += value;
  });

  const pieOptions: ChartOptions = {
    responsive: true,
    datasets: {
      pie: {
        borderColor: "transparent",
        hoverBorderColor: chartColor,
      },
    },
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom",
        labels: {
          color: chartColor,
        },
      },
      title: {
        display: true,
        text: title,
        color: chartColor,
      },
      tooltip: {
        callbacks: {
          label(tooltipItem: TooltipItem<any>): string | string[] {
            return (
              tooltipItem.label +
              ": " +
              ((Number(tooltipItem.raw) / sum) * 100).toFixed(2) +
              "%"
            );
          },
        },
      },
    },
  };

  return (
    <div className={styleClass + " chart-card"}>
      <div className="chart">
        <Pie options={pieOptions} data={data} />
      </div>
    </div>
  );
}
