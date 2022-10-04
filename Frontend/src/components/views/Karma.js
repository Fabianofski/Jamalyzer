import React from "react";
import "./View.css";
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

const karmaDescription =
  "Karma is a score every entry gets, based on the number of ratings received and given. Karma is calculated by the following formula: Log(1 + ratings_given) - Log(1 + ratings_received) / Log(5)";

//#region ChartData
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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

function Karma({ jamData }) {
  return (
    <div className="view">
      <h1>Karma</h1>
      <div className="card-grid">
        <Card text={karmaDescription} styleClass={"card card-col-span-6"} />
        <Card
          text={"Most Karma: #6 Golf, yes? 20"}
          styleClass={"card card-col-span-2"}
        />
        <Card text={"Average Karma: 15"} styleClass={"card card-col-span-2"} />
        <Card
          text={"Least Karma: #1 BillyBob 20"}
          styleClass={"card card-col-span-2"}
        />
        <ChartCard styleClass={"card card-col-span-3 card-row-span-3"} />
      </div>
    </div>
  );
}

function Card({ text, styleClass }) {
  return (
    <div className={styleClass}>
      <p>{text}</p>
    </div>
  );
}

function ChartCard({ styleClass }) {
  return (
    <div className={styleClass}>
      <div className="chart">
        <Line options={options} data={data} />
      </div>
    </div>
  );
}

export default Karma;
