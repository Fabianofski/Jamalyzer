import React, { ReactElement } from "react";
import "./View.css";
import { JsxCard } from "../cards/BasicCard";
import { jamData } from "../../model/jamData/jamData";
import { engines, artCreation, soundCreation } from "../components/tools";
import { ChartData } from "chart.js";
import { GetJamPrimaryVariations } from "../../components/Color/ColorManager";
import { generatePieChartData, PieChartCard } from "../cards/PieChartCard";
import BasicTable from "../components/BasicTable";
import Loader from "../components/Loader";

function Tools({ jamData }: { jamData: jamData }): ReactElement {
  const tools = countTools(jamData);

  if (jamData.extendedData)
    return (
      <div className="view" id="Tools">
        <h1>Tools</h1>
        <div className="card-grid">
          <ToolAnalysis tools={tools} included={engines} title={"Engines"} />
          <ToolAnalysis
            tools={tools}
            included={artCreation}
            title={"Asset Creation Software"}
            left={true}
          />
          <ToolAnalysis tools={tools} included={soundCreation} title={"Sound Creation Software"} />
        </div>
      </div>
    );
  else
    return (
      <div className="view" id="Tools">
        <h1>Tools</h1>
        <Loader text={"This data is still processing..."} />
      </div>
    );
}

function countTools(jamData: jamData) {
  const tools: { name: string; amount: number }[] = [];
  Object.entries(jamData.jam_games).forEach(([_, entry]) => {
    entry.game_info_panel.madeWith?.forEach((tool) => {
      let idx = tools.findIndex((e) => e.name === tool);
      if (idx > -1) tools[idx].amount++;
      else tools.push({ name: tool, amount: 1 });
    });
  });
  return tools.sort((a, b) => {
    return b.amount - a.amount;
  });
}

function ToolAnalysis({
  tools,
  included,
  title,
  amount = 10,
  left = false
}: {
  tools: { name: string; amount: number }[];
  included: string[];
  title: string;
  amount?: number;
  left?: boolean;
}) {
  const table = (
    <JsxCard
      jsx={<BasicTable data={filter(tools, included)} title={title} amount={amount} />}
      styleClass={"card card-col-span-4"}
    />
  );

  const chart = (
    <PieChartCard
      data={generatePieChartData(filter(tools, included), 10)}
      styleClass={"card card-col-span-2"}
      title={"Top 10 " + title}
    />
  );
  return (
    <>
      {left ? chart : <></>}
      {table}
      {left ? <></> : chart}
    </>
  );
}

function filter(tools: { name: string; amount: number }[], included: string[]) {
  let regex = new RegExp(included.join("|"), "i");
  return tools.filter((tool) => regex.test(tool.name));
}

export default Tools;
