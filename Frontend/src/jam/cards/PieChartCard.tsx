import { Pie } from "react-chartjs-2";
import React, { ReactElement, useEffect, useState } from "react";
import "../views/View.css";
import "./Card.css";

import {
  ArcElement,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  Title,
  Tooltip,
  TooltipItem
} from "chart.js";
import { GetJamPrimaryVariations } from "../../components/Color/ColorManager";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export const dummyPieData = {
  labels: ["Solo", "Duo", "More than 3"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
      hoverOffset: 4
    }
  ]
};

export function generatePieChartData(
  pieData: { name: string; amount: number }[],
  amount: number = 5
): ChartData<"pie", any> {
  const data: number[] = [];
  const labels: string[] = [];

  pieData.slice(0, amount - 1).forEach((tool) => {
    labels.push(tool.name.toUpperCase());
    data.push(tool.amount);
  });

  let value = 0;
  pieData.slice(amount - 1).forEach((tool) => {
    {
      value += tool.amount;
    }
  });
  labels.push("OTHER");
  data.push(value);

  const colors = GetJamPrimaryVariations(amount);

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        hoverOffset: 10
      }
    ]
  };
}

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
  showLegend = true
}: Props): ReactElement {
  const [chartColor, setChartColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue("--text-color")
  );
  useEffect(() => {
    document.addEventListener("textColorChanged", (e: any) => setChartColor(e.detail));
  }, []);

  let sum: number = 0;
  data.datasets[0].data.forEach((value: any) => {
    sum += value;
  });

  const pieOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: showLegend,
        position: "bottom",
        labels: {
          color: chartColor
        }
      },
      title: {
        display: true,
        text: title,
        color: chartColor
      },
      tooltip: {
        callbacks: {
          label(tooltipItem: TooltipItem<any>): string | string[] {
            return (
              tooltipItem.label + ": " + ((Number(tooltipItem.raw) / sum) * 100).toFixed(2) + "%"
            );
          }
        }
      }
    }
  };

  return (
    <div className={styleClass + " chart-card"}>
      <div className="chart">
        <Pie options={pieOptions} data={data} />
      </div>
    </div>
  );
}
