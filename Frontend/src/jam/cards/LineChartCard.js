import React from "react";
import "../views/View.css";
import "./Card.css";

import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend, CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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


export function LineChartCard({ styleClass, data = dummyLineData, title = "Dummy Title" }) {
  
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      y: {
        grid: {
          borderColor: "black",
        },
        position: "left",
      },
      x: {
        grid: {
          borderColor: "black",
        },
        position: "center",
      },
    },
  };
  
  return (
    <div className={styleClass + " chart-card"}>
      <div className="chart">
        <Line options={lineOptions} data={data} style={{minHeight:"20rem"}}/>
      </div>
    </div>
  );
}