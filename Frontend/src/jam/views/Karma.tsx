import React, { ReactElement } from "react";
import "./View.css";
import { JsxCard } from "../cards/BasicCard";
import { LineChartCard } from "../cards/LineChartCard";
import { GetJamPrimary } from "../../components/ColorManager";
import { pearsonCorrelation } from "../../components/Utilities";
import { jamData } from "../../model/jamData/jamData";
import { InlineMath } from "react-katex";

function karmaDescription(): ReactElement {
  return (
    <div style={{ lineHeight: "2rem", hyphens: "auto" }}>
      Karma is a numerical score that reflects the number of ratings an entry has received and
      given. It is calculated using the formula: <br />
      <InlineMath>
        {"Karma = \\frac {Log(1 + ratings\\_given) - Log(1 + ratings\\_received)}{Log(5)}"}
      </InlineMath>
      <br />
      To possibly increase your score, you should rate more games and leave feedback.
    </div>
  );
}

function PearsonTooltip(): ReactElement {
  return (
    <p style={{ lineHeight: "1.5rem" }}>
      The Pearson correlation coefficient is a measure of the linear relationship between two
      variables. <br />
      -1 = negative relationship <br />
      0 = no relationship <br />1 = positive relationship
    </p>
  );
}

function Correlation({ jamData }: { jamData: jamData }): ReactElement {
  const ranking: number[] = [];
  const karma: number[] = [];
  Object.entries(jamData.rankings.Overall).forEach(([rank, ids]) => {
    ids.forEach((id) => {
      const game = jamData.jam_games[id];
      if (game.karma === undefined) return;
      ranking.push(game.rank);
      karma.push(game.karma);
    });
  });
  const c = pearsonCorrelation(ranking, karma);

  return (
    <div>
      <p>
        {" "}
        Pearson-Correlation: <strong>r = {c.toFixed(2)}</strong>
      </p>
    </div>
  );
}

function Karma({ jamData }: { jamData: jamData }): ReactElement {
  const data = getLineChartData(jamData);
  return (
    <div className="view" id="Karma">
      <h1>Karma</h1>
      <div className="card-grid">
        <JsxCard jsx={karmaDescription()} styleClass={"card card-col-span-6"} />
        <LineChartCard
          data={data}
          styleClass={"card card-col-span-3 card-row-span-2"}
          title={"Ranking - Karma Correlation"}
        />
        {karmaStats(jamData).map((element, idx) => {
          return <JsxCard jsx={element} styleClass={"card card-col-span-1"} key={idx} />;
        })}
        <JsxCard
          jsx={<Correlation jamData={jamData} />}
          styleClass={"card card-col-span-1"}
          tooltip={PearsonTooltip()}
        />
      </div>
    </div>
  );
}

function karmaStats(jamData: jamData): ReactElement[] {
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

  const least = (
    <KarmaStat jamData={jamData} category={"Least Karma"} amount={leastKarma} id={leastID} />
  );
  const average = (
    <KarmaStat
      jamData={jamData}
      category={"Average Karma"}
      amount={karmaSum / Object.entries(jamData.jam_games).length}
    />
  );
  const most = (
    <KarmaStat jamData={jamData} category={"Most Karma"} amount={mostKarma} id={mostID} />
  );

  return [least, average, most];
}

interface KarmaStatProps {
  jamData: jamData;
  category: string;
  amount: number;
  id?: number;
}

function KarmaStat({ jamData, category, amount, id = -1 }: KarmaStatProps): ReactElement {
  const game = jamData.jam_games[id];
  return (
    <div>
      <p>
        {category}: <strong>{amount.toFixed(2)}</strong>
      </p>
      {id !== -1 ? (
        <p>
          <a href={game.jamPageUrl} target="_blank" rel="noopener noreferrer">
            #{game.rank} {game.title}
          </a>
          &nbsp;
          <strong>
            ({game.ratings_given} /{game.rating_count})
          </strong>
        </p>
      ) : (
        <p>
          -<br />-
        </p>
      )}
    </div>
  );
}

interface LineChartData {
  datasets: [
    {
      borderColor: string;
      backgroundColor: string;
      data: number[];
      label: string;
      lineTension: number;
    }
  ];
  labels: string[];
}

function getLineChartData(jamData: jamData): LineChartData {
  const labels: string[] = [];
  const data: number[] = [];
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
      if (entry.karma !== undefined) sum += entry.karma;
    });
    if (oldP !== percentage || entryNumber === totalEntries) {
      percentage = entryNumber === totalEntries ? 10 : percentage;
      labels.push(`<${110 - percentage * 10}%`);
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
        backgroundColor: "white"
      }
    ]
  };
}

export default Karma;
