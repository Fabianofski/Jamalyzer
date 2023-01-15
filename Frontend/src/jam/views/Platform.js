import React from "react";
import "./View.css";
import {JsxCard} from "../cards/BasicCard.js";
import {BarChartCard} from "../cards/BarChartCard";
import {PieChartCard} from "../cards/PieChartCard";
import {GetJamPrimaryVariations} from "../../components/ColorManager";

function PlatformDescription(){
  return(
    <p style={{textAlign:"justify", hyphens:"auto"}}>
      Making your game available to players on multiple or specific platforms can increase your visibility and give you a higher score.
      By releasing your game on a variety of platforms, you can reach a wider audience and potentially achieve a higher score as more players discover and play your game.
    </p>
  );
}

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
          title={"Platform Distribution"}
        />
        <JsxCard
          jsx={PlatformDescription()}
          styleClass={"card card-col-span-4"}
        />
        <BarChartCard
          data={barData}
          styleClass={"card card-col-span-4 card-row-span-2"}
          title={"Ranking - Platform Distribution"}
        />
      </div>
    </div>
  );
}

function getPieChartData(jamData) {
  let data = [0, 0, 0, 0];
  Object.entries(jamData.jam_games).forEach(([id, entry]) => {
    if (!entry.platforms) return;
    if (entry.platforms.includes("web")) data[0]++;
    if (entry.platforms.includes("windows")) data[1]++;
    if (entry.platforms.includes("osx")) data[2]++;
    if (entry.platforms.includes("linux")) data[3]++;
  });
  const colors = GetJamPrimaryVariations(4);
  return {
    labels: ["Web", "Windows", "MacOS", "Linux"],
    datasets: [
      {
        data: data,
        backgroundColor: [
          colors[0],
          colors[1],
          colors[2],
          colors[3],
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

  entries.forEach(([, ids]) => {
    ids.forEach(() => totalEntries++);
  });

  let oldP = 0;
  let sums = [0, 0, 0, 0];
  let entryNumber = 0;
  entries.forEach(([, ids]) => {
    let percentage = Math.floor(entryNumber / Math.ceil(totalEntries * 0.1));
    ids.forEach((id) => {
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
      labels.push(`<${110 - percentage * 10}%`);
      web.push(sums[0]);
      windows.push(sums[1]);
      mac.push(sums[2]);
      linux.push(sums[3]);
      sums = [0, 0, 0, 0];
    }
    oldP = percentage;
  });
  const colors = GetJamPrimaryVariations(4);
  return {
    labels,
    datasets: [
      {
        label: "Web",
        data: web,
        backgroundColor: colors[0],
        stack: "Stack 0",
      },
      {
        label: "Windows",
        data: windows,
        backgroundColor: colors[1],
        stack: "Stack 1",
      },
      {
        label: "MacOS",
        data: mac,
        backgroundColor: colors[2],
        stack: "Stack 2",
      },
      {
        label: "Linux",
        data: linux,
        backgroundColor: colors[3],
        stack: "Stack 3",
      },
    ],
  };
}

export default Platform;
