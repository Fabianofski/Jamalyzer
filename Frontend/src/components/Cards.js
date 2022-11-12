import React from "react";
import "./views/View.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
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

//#region chartData
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Karma Distribution",
    },
  },
  scales: {
    y: {
      grid: {
        borderColor: "black",
      },
      position: "center",
    },
    x: {
      grid: {
        borderColor: "black",
      },
      position: "center",
    },
  },
};

const labels = [];
for (let i = 0; i < 10; i++) labels.push(i);

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 200),
      borderColor: "#17909b",
      backgroundColor: "white",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * -200),
      borderColor: "#1f7b0f",
      backgroundColor: "white",
    },
    {
      label: "Dataset 3",
      data: labels.map(() => Math.random() * 200),
      borderColor: "#fa4966",
      backgroundColor: "white",
    },
  ],
};
//#endregion

export function Card({ text, styleClass }) {
  return (
    <div className={styleClass}>
      <p>{text}</p>
    </div>
  );
}

export function ChartCard({ styleClass }) {
  return (
    <div className={styleClass}>
      <div className="chart">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
