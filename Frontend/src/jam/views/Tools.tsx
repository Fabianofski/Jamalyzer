import React, { ReactElement } from "react";
import "./View.css";
import { JsxCard } from "../cards/BasicCard";
import { jamData } from "../../model/jamData/jamData";
import { engines, artCreation, soundCreation } from "../components/tools";
import { ChartData } from "chart.js";
import { GetJamPrimaryVariations } from "../../components/Color/ColorManager";
import { PieChartCard } from "../cards/PieChartCard";

function ToolDescription(): ReactElement {
  return (
    <p style={{ textAlign: "justify", hyphens: "auto" }}>
      The data here are estimated values and are based on the information provided by the respective
      game creators. The actual data may differ from the values listed here.
    </p>
  );
}

function Tools({ jamData }: { jamData: jamData }): ReactElement {
  const tools = countTools(jamData);

  // <JsxCard jsx={<ToolDescription />} styleClass={"card card-col-span-2 card-row-span-2"} />
  return (
    <div className="view" id="Tools">
      <h1>Tools</h1>
      <div className="card-grid">
        <ToolAnalysis tools={tools} included={engines} title={"Engines"} />
        <ToolAnalysis tools={tools} included={artCreation} title={"Asset Creation Software"} />
        <ToolAnalysis tools={tools} included={soundCreation} title={"Sound Creation Software"} />
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

function ToolAnalysis({
  tools,
  included,
  title,
  amount = 10
}: {
  tools: { name: string; amount: number }[];
  included: string[];
  title: string;
  amount?: number;
}) {
  return (
    <>
      <JsxCard
        jsx={<ToolRankingTable tools={filter(tools, included)} title={title} amount={amount} />}
        styleClass={"card card-col-span-2 card-row-span-4"}
      />
      <PieChartCard
        data={getPieChartData(filter(tools, included))}
        styleClass={"card card-col-span-2 card-row-span-4"}
        title={"Top 10 " + title}
      />
    </>
  );
}

function filter(tools: { name: string; amount: number }[], included: string[]) {
  let regex = new RegExp(included.join("|"), "i");
  return tools.filter((tool) => regex.test(tool.name));
}

function ToolRankingTable({
  tools,
  title,
  amount
}: {
  tools: { name: string; amount: number }[];
  title: string;
  amount: number;
}) {
  let sum: number = 0;
  tools.forEach((tool) => {
    sum += tool.amount;
  });

  return (
    <div className={"tool-table-wrapper"}>
      <h3>
        Top 10 <br />
        {title}
      </h3>
      <table className={"tool-table"}>
        <tbody>
          {tools.slice(0, amount).map((tool, idx) => {
            return (
              <tr key={idx}>
                <td className={"rank"}>
                  <b>{idx + 1}.</b>
                </td>
                <td>{tool.name.toUpperCase()}</td>
                <td>
                  <b>{tool.amount}</b>
                </td>
                <td>
                  <b>{((tool.amount / sum) * 100).toFixed(2)}%</b>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getPieChartData(
  tools: { name: string; amount: number }[],
  amount: number = 5
): ChartData<"pie", any> {
  const data: number[] = [];
  const labels: string[] = [];

  tools.slice(0, amount).forEach((tool) => {
    labels.push(tool.name.toUpperCase());
    data.push(tool.amount);
  });

  const colors = GetJamPrimaryVariations(amount);

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        hoverOffset: 10
      }
    ]
  };
}

export default Tools;
