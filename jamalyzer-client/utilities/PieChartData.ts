import { ChartData } from "chart.js";
import { getJamPrimaryVariations } from "@/utilities/Color/ColorManager";

export function generatePieChartData(
  pieData: { name: string; amount: number }[],
  amount: number = 5
): ChartData<"pie", any> {
  const data: number[] = [];
  const labels: string[] = [];

  pieData.slice(0, amount - 1).forEach((tool) => {
    labels.push(tool.name.toUpperCase());
    data.push(tool.amount);
  });

  let value = 0;
  pieData.slice(amount - 1).forEach((tool) => {
    {
      value += tool.amount;
    }
  });
  labels.push("OTHER");
  data.push(value);

  const colors = getJamPrimaryVariations(amount);

  return {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        hoverOffset: 10,
      },
    ],
  };
}