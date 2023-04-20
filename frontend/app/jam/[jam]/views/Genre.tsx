import React, { ReactElement } from "react";
import { jamData } from "@/model/jamData/jamData";
import { JsxCard } from "../cards/BasicCard";
import BasicTable from "../components/BasicTable";
import { generatePieChartData } from "@/utilities/PieChartData";
import { PieChartCard } from "../cards/PieChartCard";
import Loader from "../components/Loader";
import styles from "@/styles/jam/views/View.module.css";

function Genre({ jamData }: { jamData: jamData }): ReactElement {
  const genres = countGenres(jamData);

  if (jamData.extendedData)
    return (
      <div className={styles.view} id="Genre">
        <h1>Genre</h1>
        <div className={styles["card-grid"]}>
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
      <div className={styles.view} id="Genre">
        <h1>Genre</h1>
        <Loader text={""} />
        <a href={"/jobs"}>This data is still processing...</a>
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
