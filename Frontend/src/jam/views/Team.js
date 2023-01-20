import React from "react";
import "./View.css";
import {Card, JsxCard} from "../cards/BasicCard.tsx";
import {BarChartCard} from "../cards/BarChartCard";
import {PieChartCard} from "../cards/PieChartCard";
import {GetJamPrimaryVariations} from "../../components/ColorManager";

function TeamDescription(){
  return(
    <p style={{textAlign:"justify", hyphens:"auto"}}>
      Teams with more members are able to create games with a larger amount of content and a higher level of quality. By working on a bigger team, you may be able to increase the score of your game.
    </p>
  );
}

function Team({ jamData }) {
  const pieData = extractData(jamData);
  const barData = getBarChartData(jamData);
  const teamStats = getTeamStats(jamData);

  return (
    <div className="view" id="Team">
      <h1>Team</h1>
      <div className="card-grid">
        <Card text={TeamDescription()} styleClass={"card card-col-span-4"} />
        <PieChartCard
          data={pieData}
          styleClass={"card card-col-span-2 card-row-span-3"}
          title={"Team Size Distribution"}
        />
        <BarChartCard
          data={barData}
          styleClass={"card card-col-span-3 card-row-span-2"}
          title={"Ranking - Team Size Distribution"}
        />
        {teamStats.map((element, idx) => {
          return (
            <JsxCard
                jsx={element}
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
  Object.entries(jamData.jam_games).forEach(([id, entry]) => {
    teamSize += entry.contributors.length;
    if(entry.contributors.length > biggestTeam){
      mostID = entry.id;
      biggestTeam = entry.contributors.length;
    }
  });
  const median = <TeamStat jamData={jamData} category={"Average:"}
                           amount={(teamSize / Object.entries(jamData.jam_games).length).toFixed(2) + " Members"}/>
  const most = <TeamStat jamData={jamData} category={"Biggest Team"} amount={biggestTeam + " Members"} id={mostID}/>
  return [median, most];
}

function TeamStat({jamData, category, amount, id = -1}){
  const game = jamData.jam_games[id];
  return(
    <div >
      <p>{category}: <br /> <strong>{amount}</strong></p>
      {id !== -1 ?
          <a href={game.jamPageUrl} target="_blank" rel="noopener noreferrer">#{game.rank} {game.title}</a>
        : ""}
    </div>
  );
}

function extractData(jamData) {
  let data = [0, 0, 0, 0];
  Object.entries(jamData.jam_games).forEach(([id, entry]) => {
    const teamSize = clamp(entry.contributors.length - 1, 0, 3);
    data[teamSize]++;
  });
  const colors = GetJamPrimaryVariations(4);
  return {
    labels: ["Solo", "Duo", "Trio", ">3"],
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
  const solo = [],
    duo = [],
    trio = [],
    more = [];
  const entries = Object.entries(jamData.rankings.Overall).reverse();
  let totalEntries = 0;

  entries.forEach(([, ids]) => {
    ids.map(() => totalEntries++);
  });

  let oldP = 0;
  let sums = [0, 0, 0, 0];
  let entryNumber = 0;
  entries.forEach(([, ids]) => {
    let percentage = Math.floor(entryNumber / Math.ceil(totalEntries * 0.1));
    ids.forEach((id) => {
      entryNumber++;
      const entry = jamData.jam_games[id];
      sums[clamp(entry.contributors.length, 1, 4) - 1]++;
    });
    if (oldP !== percentage || entryNumber === totalEntries) {
      percentage = entryNumber === totalEntries ? 10 : percentage;
      labels.push(`<${110 - percentage * 10}%`);
      solo.push(sums[0]);
      duo.push(sums[1]);
      trio.push(sums[2]);
      more.push(sums[3]);
      sums = [0, 0, 0, 0];
    }
    oldP = percentage;
  });
  const colors = GetJamPrimaryVariations(4);
  return {
    labels,
    datasets: [
      {
        label: "Solo",
        data: solo,
        backgroundColor: colors[0],
        stack: "Stack 0",
      },
      {
        label: "Duo",
        data: duo,
        backgroundColor: colors[1],
        stack: "Stack 1",
      },
      {
        label: "Trio",
        data: trio,
        backgroundColor: colors[2],
        stack: "Stack 2",
      },
      {
        label: ">3",
        data: more,
        backgroundColor: colors[3],
        stack: "Stack 3",
      },
    ],
  };
}

function clamp(number, min, max) {
  return Math.max(min, Math.min(number, max));
}

export default Team;
