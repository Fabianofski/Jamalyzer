import React from "react";
import { jamData } from "@/model/jamData/jamData";
import { JsxCard } from "../cards/BasicCard";
import BasicTable from "../components/BasicTable";
import { generatePieChartData } from "@/utilities/PieChartData";
import {PieChartCard } from "../cards/PieChartCard";
import Loader from "../components/Loader";
import styles from "@/styles/jam/views/View.module.css";

function Tags({ jamData }: { jamData: jamData }) {
  const tags = countTags(jamData);

  if (jamData.extendedData)
    return (
      <div className={styles.view} id="Tags">
        <h1>Tags</h1>
        <div className={styles["card-grid"]}>
          <JsxCard
            jsx={<BasicTable data={tags} title={"Tags"} amount={10} />}
            styleClass={"card card-col-span-4"}
          />
          <PieChartCard
            data={generatePieChartData(tags, 10)}
            styleClass={"card card-col-span-2"}
            title={"Top 10 Tags"}
          />
        </div>
      </div>
    );
  else
    return (
      <div className={styles.view} id="Tags">
        <h1>Tags</h1>
        <Loader text={""} />
        <a href={"/jobs"}>This data is still processing...</a>
      </div>
    );
}

function countTags(jamData: jamData) {
  const tags: { name: string; amount: number }[] = [];
  Object.entries(jamData.jam_games).forEach(([_, entry]) => {
    entry.game_info_panel.tags?.forEach((tag: string) => {
      let idx = tags.findIndex((e) => e.name === tag);
      if (idx > -1) tags[idx].amount++;
      else tags.push({ name: tag, amount: 1 });
    });
  });
  return tags.sort((a, b) => {
    return b.amount - a.amount;
  });
}

export default Tags;
