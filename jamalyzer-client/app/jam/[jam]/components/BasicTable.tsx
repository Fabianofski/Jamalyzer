import React from "react";

function BasicTable({
  data,
  title,
  amount
}: {
  data: { name: string; amount: number }[];
  title: string;
  amount: number;
}) {
  let sum: number = 0;
  data.forEach((tool) => {
    sum += tool.amount;
  });

  return (
    <div className={"basic-table-wrapper"}>
      <h3>
        Top 10 <br />
        {title}
      </h3>
      <table className={"basic-table"}>
        <tbody>
          {data.slice(0, amount).map((tool, idx) => {
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

export default BasicTable;
