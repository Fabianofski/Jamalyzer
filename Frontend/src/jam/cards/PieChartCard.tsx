import { Pie } from "react-chartjs-2";
import React, { ReactElement } from "react";
import "../views/View.css";
import "./Card.css";

import { ArcElement, Chart as ChartJS, ChartData, Legend, Title, Tooltip } from "chart.js";

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

export function PieChartCard({
  styleClass,
  data = dummyPieData,
  title = "Dummy Title"
}: Props): ReactElement {
  const pieOptions: object = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom"
      },
      title: {
        display: true,
        text: title
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
