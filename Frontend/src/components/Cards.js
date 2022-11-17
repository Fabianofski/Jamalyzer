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
  Filler,
  ArcElement,
  BarElement,
} from "chart.js";
import { Line, Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  Filler
);

//#region chartData
export const lineOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
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
//#endregion

export function Card({ text, styleClass }) {
  return (
    <div className={styleClass}>
      <p>{text}</p>
    </div>
  );
}

export function LineChartCard({ styleClass, data = dummyLineData }) {
  return (
    <div className={styleClass}>
      <div className="chart">
        <Line options={lineOptions} data={data} />
      </div>
    </div>
  );
}

export const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
    title: {
      display: true,
      text: "Team Size",
    },
  },
};

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

export function PieChartCard({ styleClass, data = dummyPieData }) {
  return (
    <div className={styleClass}>
      <div className="chart">
        <Pie options={pieOptions} data={data} />
      </div>
    </div>
  );
}

const barOptions = {
  plugins: {
    title: {
      display: true,
      text: "Team Distribution",
    },
  },
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: false,
    },
  },
};

const dummyBarData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 200),
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 0",
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 200),
      backgroundColor: "rgb(75, 192, 192)",
      stack: "Stack 2",
    },
    {
      label: "Dataset 3",
      data: labels.map(() => Math.random() * 200),
      backgroundColor: "rgb(53, 162, 235)",
      stack: "Stack 1",
    },
  ],
};

export function BarChartCard({ styleClass, data = dummyBarData }) {
  return (
    <div className={styleClass}>
      <div className="chart">
        <Bar options={barOptions} data={data} />
      </div>
    </div>
  );
}
