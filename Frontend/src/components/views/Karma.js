import React from "react";
import "./View.css";
import { Card, ChartCard } from "../Cards.js";

const karmaDescription =
  "Karma is a score every entry gets, based on the number of ratings received and given. Karma is calculated by the following formula: Log(1 + ratings_given) - Log(1 + ratings_received) / Log(5)";

function Karma({ jamData }) {
  return (
    <div className="view" id="Karma">
      <h1>Karma</h1>
      <div className="card-grid">
        <Card text={karmaDescription} styleClass={"card card-col-span-6"} />
        {karmaStats(jamData).map((element, idx) => {
          return (
            <Card
              text={element}
              styleClass={"card card-col-span-2"}
              key={idx}
            />
          );
        })}
        <ChartCard styleClass={"card card-col-span-3 card-row-span-3"} />
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

export default Karma;
