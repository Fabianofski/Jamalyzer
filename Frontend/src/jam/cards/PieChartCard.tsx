import { Pie } from "react-chartjs-2";
import React, { ReactElement, useEffect, useState } from "react";
import "../views/View.css";
import "./Card.css";

import { ArcElement, Chart as ChartJS, ChartData, Legend, Title, Tooltip } from "chart.js";
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

interface Props {
  styleClass: string;
  data: ChartData<"pie", any>;
  title: string;
}

export function generatePieChartData(
  pieData: { name: string; amount: number }[],
  amount: number = 5
): ChartData<"pie", any> {
  const data: number[] = [];
  const labels: string[] = [];

  pieData.slice(0, amount).forEach((tool) => {
    labels.push(tool.name.toUpperCase());
    data.push(tool.amount);
  });

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

export function PieChartCard({
  styleClass,
  data = dummyPieData,
  title = "Dummy Title"
}: Props): ReactElement {
  const [chartColor, setChartColor] = useState(
    getComputedStyle(document.documentElement).getPropertyValue("--text-color")
  );
  useEffect(() => {
    document.addEventListener("textColorChanged", (e: any) => setChartColor(e.detail));
  }, []);

  const pieOptions: object = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: chartColor
        }
      },
      title: {
        display: true,
        text: title,
        color: chartColor
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
