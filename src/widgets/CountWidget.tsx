import React, { useEffect, useState } from "react";
import Widget from "../components/Widget/Widget";
import { GoGraph } from "react-icons/go";
import { Chart } from "primereact/chart";

export default function CountWidget(): React.ReactElement {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "70%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <Widget
      title={`Team Count Widget`}
      subtitle={`Team Count`}
      icon={<GoGraph size={18} className="text-layer-light-700 sm:hidden" />}
    >
      <Chart
        type="doughnut"
        data={chartData}
        options={chartOptions}
        style={{ maxHeight: "16rem" }}
      />
    </Widget>
  );
}
