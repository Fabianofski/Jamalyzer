import React from "react";
import "./View.css";
import {Card, LineChartCard} from "../Cards.js";

const karmaDescription =
  "Karma is a score every entry gets, based on the number of ratings received and given." +
  "\n" +
  "Karma is calculated by the following formula: Log(1 + ratings_given) - Log(1 + ratings_received) / Log(5)." +
  "\n" +
  "Karma can have an positive impact on your games ranking. Rate more games and leave feedback to rank higher.";

function Karma({ jamData }) {
  let data = getLineChartData(jamData);
  return (
    <div className="view" id="Karma">
      <h1>Karma</h1>
      <div className="card-grid">
        <Card text={karmaDescription} styleClass={"card card-col-span-6"} />
        <LineChartCard
          data={data}
          styleClass={"card card-col-span-3 card-row-span-3"}
        />
        {karmaStats(jamData).map((element, idx) => {
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

function karmaStats(jamData) {
  let leastKarma = 999999;
  let leastID;
  let mostKarma = 0;
  let mostID;
  let karmaSum = 0;
  Object.entries(jamData.jam_games).map(([id, entry]) => {
    if ("karma" in entry) {
      if (leastKarma > entry.karma) {
        leastID = id;
        leastKarma = entry.karma;
      }
      if (mostKarma < entry.karma) {
        mostID = id;
        mostKarma = entry.karma;
      }
      karmaSum += entry.karma;
    }
  });
  let least = `Least Karma: ${leastKarma} (#${jamData.jam_games[leastID].rank} ${jamData.jam_games[leastID].title})`;
  let average = `Average Karma: ${(
    karmaSum / Object.entries(jamData.jam_games).length
  ).toFixed(2)}`;
  let most = `Most Karma: ${mostKarma} (#${jamData.jam_games[mostID].rank} ${jamData.jam_games[mostID].title})`;
  return [least, average, most];
}

function getLineChartData(jamData) {
  const labels = [];
  const data = [];
  const entries = Object.entries(jamData.rankings.Overall).reverse();
  let totalEntries = 0;

  entries.map(([, ids]) => {
    ids.map(() => totalEntries++);
  });

  let oldP = 0;
  let sum = 0;
  let entryNumber = 0;
  entries.map(([, ids]) => {
    let percentage = Math.floor(entryNumber / Math.ceil(totalEntries * 0.1));
    ids.map((id) => {
      entryNumber++;
      const entry = jamData.jam_games[id];
      if (entry.karma) sum += entry.karma;
    });
    if (oldP !== percentage || entryNumber === totalEntries) {
      percentage = entryNumber === totalEntries ? 10 : percentage;
      labels.push(`>${110 - percentage * 10}%`);
      data.push(sum / Math.floor(totalEntries * 0.1));
      sum = 0;
    }
    oldP = percentage;
  });

  return {
    labels,
    datasets: [
      {
        label: "Karma",
        data: data,
        lineTension: 0.4,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "white",
      },
    ],
  };
}

export default Karma;
