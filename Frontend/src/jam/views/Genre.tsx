import React, { ReactElement } from "react";
import "./View.css";
import { jamData } from "../../model/jamData/jamData";
import { JsxCard } from "../cards/BasicCard";
import BasicTable from "../components/BasicTable";
import { generatePieChartData, PieChartCard } from "../cards/PieChartCard";
import { tr } from "date-fns/locale";
import Loader from "../components/Loader";

function Genre({ jamData }: { jamData: jamData }): ReactElement {
  const genres = countGenres(jamData);

  if (jamData.extendedData)
    return (
      <div className="view" id="Genre">
        <h1>Genre</h1>
        <div className="card-grid">
          <JsxCard
            jsx={<BasicTable data={genres} title={"Genres"} amount={10} />}
            styleClass={"card card-col-span-4"}
          />
          <PieChartCard
            data={generatePieChartData(genres, 10)}
            styleClass={"card card-col-span-2"}
            title={"Top 10 Genres"}
          />
        </div>
      </div>
    );
  else
    return (
      <div className="view" id="Genre">
        <h1>Genre</h1>
        <Loader text={"This data is still processing..."} />
      </div>
    );
}

function countGenres(jamData: jamData) {
  const genres: { name: string; amount: number }[] = [];
  Object.entries(jamData.jam_games).forEach(([_, entry]) => {
    entry.game_info_panel.genre?.forEach((genre) => {
      let idx = genres.findIndex((e) => e.name === genre);
      if (idx > -1) genres[idx].amount++;
      else genres.push({ name: genre, amount: 1 });
    });
  });
  return genres.sort((a, b) => {
    return b.amount - a.amount;
  });
}

export default Genre;
