import React, { ReactElement } from "react";
import "./View.css";
import { Card, JsxCard } from "../cards/BasicCard";
import { jamData } from "../../model/jamData/jamData";

function ToolRankingTable({ tools }: { tools: { name: string; amount: number }[] }) {
  return (
    <div className={"tool-table-wrapper"}>
      <h3>Top 10</h3>
      <table className={"tool-table"}>
        <tbody>
          {tools.slice(0, 10).map((tool, idx) => {
            return (
              <tr key={idx}>
                <td className={"rank"}>
                  <b>{idx + 1}.</b>
                </td>
                <td>{tool.name.toUpperCase()}</td>
                <td>
                  <b>{tool.amount}</b>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Tools({ jamData }: { jamData: jamData }): ReactElement {
  const tools = countTools(jamData);
  return (
    <div className="view" id="Tools">
      <h1>Tools</h1>
      <div className="card-grid">
        <JsxCard
          jsx={<ToolRankingTable tools={tools} />}
          styleClass={"card card-row-span-2 card-col-span-2"}
        />
      </div>
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

export default Tools;
