import React from "react";
import "./View.css";
import {BarChartCard, Card, PieChartCard} from "../Cards.js";

function Platform({ jamData }) {
  const barData = getBarChartData(jamData);
  const pieData = getPieChartData(jamData);

  return (
    <div className="view" id="Platform">
      <h1>Platform</h1>
      <div className="card-grid">
        <PieChartCard
          data={pieData}
          styleClass={"card card-col-span-2 card-row-span-3"}
        />
        <Card
          text={"Lorem ipsum dolor sit amet."}
          styleClass={"card card-col-span-4"}
        />
        <Card
          text={"Median: 2 Collaborators"}
          styleClass={"card card-col-span-1"}
        />
        <BarChartCard
          data={barData}
          styleClass={"card card-col-span-3 card-row-span-2"}
        />
        <Card
          text={"Most: 5 Collaborators"}
          styleClass={"card card-col-span-1"}
        />
      </div>
    </div>
  );
}

function getPieChartData(jamData) {
  let data = [0, 0, 0, 0];
  Object.entries(jamData.jam_games).map(([id, entry]) => {
    if (!entry.platforms) return;
    if (entry.platforms.includes("web")) data[0]++;
    if (entry.platforms.includes("windows")) data[1]++;
    if (entry.platforms.includes("osx")) data[2]++;
    if (entry.platforms.includes("linux")) data[3]++;
  });
  return {
    labels: ["Web", "Windows", "MacOS", "Linux"],
    datasets: [
      {
        data: data,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(132, 235, 99)",
        ],
        hoverOffset: 10,
      },
    ],
  };
}

function getBarChartData(jamData) {
  const labels = [];
  const web = [],
    windows = [],
    mac = [],
    linux = [];
  const entries = Object.entries(jamData.rankings.Overall).reverse();
  let totalEntries = 0;

  entries.map(([, ids]) => {
    ids.map(() => totalEntries++);
  });

  let oldP = 0;
  let sums = [0, 0, 0, 0];
  let entryNumber = 0;
  entries.map(([, ids]) => {
    let percentage = Math.floor(entryNumber / Math.ceil(totalEntries * 0.1));
    ids.map((id) => {
      entryNumber++;
      const entry = jamData.jam_games[id];
      if (!entry.platforms) return;
      if (entry.platforms.includes("web")) sums[0]++;
      if (entry.platforms.includes("windows")) sums[1]++;
      if (entry.platforms.includes("osx")) sums[2]++;
      if (entry.platforms.includes("linux")) sums[3]++;
    });
    if (oldP !== percentage || entryNumber === totalEntries) {
      percentage = entryNumber === totalEntries ? 10 : percentage;
      labels.push(`>${110 - percentage * 10}%`);
      web.push(sums[0]);
      windows.push(sums[1]);
      mac.push(sums[2]);
      linux.push(sums[3]);
      sums = [0, 0, 0, 0];
    }
    oldP = percentage;
  });

  return {
    labels,
    datasets: [
      {
        label: "Web",
        data: web,
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Windows",
        data: windows,
        backgroundColor: "rgb(54, 162, 235)",
        stack: "Stack 1",
      },
      {
        label: "MacOS",
        data: mac,
        backgroundColor: "rgb(255, 205, 86)",
        stack: "Stack 2",
      },
      {
        label: "Linux",
        data: linux,
        backgroundColor: "rgb(132, 235, 99)",
        stack: "Stack 3",
      },
    ],
  };
}

export default Platform;
