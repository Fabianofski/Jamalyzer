import React from "react";
import styles from "@/styles/jam/components/BasicTable.module.css";
import { id } from "date-fns/locale";

function BasicTable({
  data,
  title,
  amount,
}: {
  data: { name: string; amount: number }[];
  title: string;
  amount: number;
}) {
  let sum: number = 0;
  data.forEach((tool) => {
    sum += tool.amount;
  });

  let otherAmount = 0;
  data.slice(amount - 1).forEach((tool) => {
    {
      otherAmount += tool.amount;
    }
  });

  return (
    <div className={styles["basic-table-wrapper"]}>
      <h3>
        Top 10 <br />
        {title}
      </h3>
      <table className={styles["basic-table"]}>
        <tbody>
          {data.slice(0, amount - 1).map((tool, idx) => {
            return (
              <TableEntry
                amount={tool.amount}
                name={tool.name.toUpperCase()}
                rank={idx + 1}
                sum={sum}
              />
            );
          })}
          <TableEntry
            rank={Math.min(10, data.length + 1)}
            name={"OTHER"}
            amount={otherAmount}
            sum={sum}
          />
        </tbody>
      </table>
    </div>
  );
}

interface Props {
  rank: number;
  name: string;
  amount: number;
  sum: number;
}

function TableEntry({ rank, name, amount, sum }: Props) {
  return (
    <tr>
      <td className={styles.rank}>
        <b>{rank}.</b>
      </td>
      <td>{name}</td>
      <td>
        <b>{amount}</b>
      </td>
      <td>
        <b>{((amount / sum) * 100).toFixed(2)}%</b>
      </td>
    </tr>
  );
}

export default BasicTable;
