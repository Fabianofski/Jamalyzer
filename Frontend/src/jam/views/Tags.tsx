import React from "react";
import { jamData } from "../../model/jamData/jamData";
import { JsxCard } from "../cards/BasicCard";
import BasicTable from "../components/BasicTable";
import { generatePieChartData, PieChartCard } from "../cards/PieChartCard";

function Tags({ jamData }: { jamData: jamData }) {
  const tags = countTags(jamData);

  return (
    <div className="view" id="Tags">
      <h1>Tags</h1>
      <div className="card-grid">
        <JsxCard
          jsx={<BasicTable data={tags} title={"Tags"} amount={10} />}
          styleClass={"card card-col-span-4"}
        />
        <PieChartCard
          data={generatePieChartData(tags, 10)}
          styleClass={"card card-col-span-2"}
          title={"Top 10 Tags"}
          showLegend={false}
        />
      </div>
    </div>
  );
}

function countTags(jamData: jamData) {
  const tags: { name: string; amount: number }[] = [];
  Object.entries(jamData.jam_games).forEach(([_, entry]) => {
    entry.game_info_panel.tags?.forEach((tag) => {
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