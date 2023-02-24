import { Bar } from "react-chartjs-2";
import React, { ReactElement, useEffect, useState } from "react";
import "../views/View.css";
import "./Card.css";

import { BarElement, Chart as ChartJS, ChartData, Legend, Title, Tooltip } from "chart.js";
import { updateStyle } from "../../components/Color/ChartColorObserver";

ChartJS.register(Title, Tooltip, Legend, BarElement);

const labels = [];
for (let i = 0; i < 10; i++) labels.push(i);

const dummyBarData = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => Math.random() * 200),
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 0"
    },
    {
      label: "Dataset 2",
      data: labels.map(() => Math.random() * 200),
      backgroundColor: "rgb(75, 192, 192)",
      stack: "Stack 2"
    },
    {
      label: "Dataset 3",
      data: labels.map(() => Math.random() * 200),
      backgroundColor: "rgb(53, 162, 235)",
      stack: "Stack 1"
    }
  ]
};

interface Props {
  styleClass: string;
  data: ChartData<"bar", any>;
  title: string;
}

export function BarChartCard({
  styleClass,
  data = dummyBarData,
  title = "Dummy Title"
}: Props): ReactElement {
  const style = getComputedStyle(document.documentElement);
  const [chartColor, setChartColor] = useState(style.getPropertyValue("--text-color"));
  const [gridColor, setGridColor] = useState(style.getPropertyValue("--darker-background-color"));
  updateStyle(setChartColor, setGridColor);

  const barOptions: object = {
    plugins: {
      title: {
        display: true,
        text: title,
        color: chartColor
      },
      legend: {
        labels: {
          color: chartColor
        }
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false
    },
    scales: {
      x: {
        stacked: true,
        grid: {
          color: gridColor,
          borderColor: gridColor
        },
        ticks: {
          color: chartColor
        }
      },
      y: {
        stacked: false,
        grid: {
          color: gridColor,
          borderColor: gridColor
        },
        ticks: {
          color: chartColor
        }
      }
    }
  };

  return (
    <div className={styleClass + " chart-card"}>
      <div className="chart">
        <Bar options={barOptions} data={data} style={{ minHeight: "20rem" }} />
      </div>
    </div>
  );
}
