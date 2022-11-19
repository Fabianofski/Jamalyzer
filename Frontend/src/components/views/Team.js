import React from "react";
import "./View.css";
import {BarChartCard, Card, PieChartCard} from "../Cards.js";

const teamDescription = "Team Sizes Lorem ipsum dolor sit amet.";

function Team({ jamData }) {
  const pieData = extractData(jamData);
  const barData = getBarChartData(jamData);
  const teamStats = getTeamStats(jamData);

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
        {teamStats.map((element, idx) => {
          return (
            <Card
                text={element}
                styleClass={"card card-col-span-1"}
                key={idx}
            />
          );
        })}
      </div>
    </div>
  );
}

function getTeamStats(jamData){
  let teamSize = 0;
  let mostID = 0;
  let biggestTeam = 0;
  Object.entries(jamData.jam_games).map(([id, entry]) => {
    teamSize += entry.contributors.length;
    if(entry.contributors.length > biggestTeam){
      mostID = entry.id;
      biggestTeam = entry.contributors.length;
    }
  });
  let median = `Average: ${(teamSize / Object.entries(jamData.jam_games).length).toFixed(2)} Members`;
  let most = `Biggest Team: ${biggestTeam} Members (#${jamData.jam_games[mostID].rank} ${jamData.jam_games[mostID].title})`;
  return [median, most];
}

function extractData(jamData) {
  let data = [0, 0, 0, 0];
  Object.entries(jamData.jam_games).map(([id, entry]) => {
    const teamSize = clamp(entry.contributors.length - 1, 0, 3);
    data[teamSize]++;
  });
  return {
    labels: ["Solo", "Duo", "Trio", ">3"],
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
    if (oldP !== percentage || entryNumber === totalEntries) {
      percentage = entryNumber === totalEntries ? 10 : percentage;
      labels.push(`>${110 - percentage * 10}%`);
      solo.push(sums[0]);
      duo.push(sums[1]);
      trio.push(sums[2]);
      more.push(sums[3]);
      sums = [0, 0, 0, 0];
    }
    oldP = percentage;
  });

  return {
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
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default Team;
