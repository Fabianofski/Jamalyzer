import React from "react";
import "./View.css";
import {JsxCard} from "./Cards/BasicCard.js";
import {LineChartCard} from "./Cards/LineChartCard.js";
import {GetJamPrimary} from "../../ColorManager";

function karmaDescription(){
  return(
    <div>
      Karma is a score every entry gets, based on the number of ratings received and given.
      Karma is calculated by the following formula: <br/>
      Karma = Log(1 + ratings_given) - Log(1 + ratings_received) / Log(5).
      Rate more games and leave feedback to rank higher.
    </div>);
}


function Karma({ jamData }) {
  let data = getLineChartData(jamData);
  return (
    <div className="view" id="Karma">
      <h1>Karma</h1>
      <div className="card-grid">
        <JsxCard jsx={karmaDescription()} styleClass={"card card-col-span-6"} />
        <LineChartCard
          data={data}
          styleClass={"card card-col-span-3 card-row-span-2"}
          title={"Karma Distribution"}
        />
        {karmaStats(jamData).map((element, idx) => {
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

function karmaStats(jamData) {
  let leastKarma = 999999;
  let leastID;
  let mostKarma = 0;
  let mostID;
  let karmaSum = 0;
  Object.entries(jamData.jam_games).forEach(([id, entry]) => {
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
  
  const least = <KarmaStat jamData={jamData} category={"Least Karma"} amount={leastKarma} id={leastID}/>;
  const average = <KarmaStat jamData={jamData} category={"Average Karma"} amount={karmaSum / Object.entries(jamData.jam_games).length}/>
  const most = <KarmaStat jamData={jamData} category={"Most Karma"} amount={mostKarma} id={mostID}/>
  
  return [least, average, most];
}

function KarmaStat({jamData, category, amount, id = -1}){
  const game = jamData.jam_games[id];
  return(
    <div >
      <p>{category}: {amount.toFixed(2)}</p>
      {id !== -1 ?
        <p>
          <a href={game.jamPageUrl} target="_blank" rel="noopener noreferrer">#{game.rank} {game.title}</a>
          &nbsp;({game.ratings_given} /{game.rating_count})
        </p>
        : ""}
    </div>
  );
}

function getLineChartData(jamData) {
  const labels = [];
  const data = [];
  const entries = Object.entries(jamData.rankings.Overall).reverse();
  let totalEntries = 0;

  entries.forEach(([, ids]) => {
    ids.forEach(() => totalEntries++);
  });

  let oldP = 0;
  let sum = 0;
  let entryNumber = 0;
  entries.forEach(([, ids]) => {
    let percentage = Math.floor(entryNumber / Math.ceil(totalEntries * 0.1));
    ids.forEach((id) => {
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
        borderColor: GetJamPrimary(),
        backgroundColor: "white",
      },
    ],
  };
}

export default Karma;
