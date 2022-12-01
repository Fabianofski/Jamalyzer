import {Pie} from "react-chartjs-2";
import React from "react";
import "../View.css";
import "./Card.css";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
);

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

export function PieChartCard({ styleClass, data = dummyPieData, title="Dummy Title" }) {
  
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
      title: {
        display: true,
        text: title,
      },
    },
  };
  
  return (
    <div className={styleClass}>
      <div className="chart">
        <Pie options={pieOptions} data={data} />
      </div>
    </div>
  );
}