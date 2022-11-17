import React from "react";
import "./View.css";
import { BarChartCard, Card, ChartCard, PieChartCard } from "../Cards.js";

const teamDescription = "Team Sizes Lorem ipsum dolor sit amet.";

function Team({ jamData }) {
  const pieData = extractData(jamData);
  const barData = getBarChartData(jamData);

  return (
    <div className="view" id="Team">
      <h1>Team</h1>
      <div className="card-grid">
        <Card text={teamDescription} styleClass={"card card-col-span-4"} />
        <PieChartCard
          data={pieData}
          styleClass={"card card-col-span-2 card-row-span-3"}
        />
        <BarChartCard
          data={barData}
          styleClass={"card card-col-span-3 card-row-span-2"}
        />
        <Card
          text={"Median: 2 Collaborators"}
          styleClass={"card card-col-span-1"}
        />
        <Card
          styleClass={"card card-col-span-1"}
          text={"Most: 5 Collaborators"}
        />
      </div>
    </div>
  );
}

function extractData(jamData) {
  let data = [0, 0, 0, 0];
  Object.entries(jamData.jam_games).map(([id, entry]) => {
    const teamSize = clamp(entry.contributors.length - 1, 0, 3);
    data[teamSize]++;
  });
  const pieData = {
    labels: ["Solo", "Duo", "Trio", "More than 3"],
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
  return pieData;
}

function getBarChartData(jamData) {
  const labels = [];
  const solo = [],
    duo = [],
    trio = [],
    more = [];
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
      sums[clamp(entry.contributors.length, 1, 4) - 1]++;
    });
    if (oldP != percentage || entryNumber == totalEntries) {
      percentage = entryNumber == totalEntries ? 10 : percentage;
      labels.push(`>${110 - percentage * 10}%`);
      solo.push(sums[0]);
      duo.push(sums[1]);
      trio.push(sums[2]);
      more.push(sums[3]);
      sums = [0, 0, 0, 0];
    }
    oldP = percentage;
  });

  const barData = {
    labels,
    datasets: [
      {
        label: "Solo",
        data: solo,
        backgroundColor: "rgb(255, 99, 132)",
        stack: "Stack 0",
      },
      {
        label: "Duo",
        data: duo,
        backgroundColor: "rgb(54, 162, 235)",
        stack: "Stack 1",
      },
      {
        label: "Trio",
        data: trio,
        backgroundColor: "rgb(255, 205, 86)",
        stack: "Stack 2",
      },
      {
        label: ">3",
        data: more,
        backgroundColor: "rgb(132, 235, 99)",
        stack: "Stack 3",
      },
    ],
  };
  return barData;
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default Team;
