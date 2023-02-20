import React, { ReactElement, useEffect, useState } from "react";
import { GoGraph } from "react-icons/go";
import Widget from "../components/Widget/Widget";
import { Chart } from "primereact/chart";
export default function UtilizationWidget(): ReactElement {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00"],
      datasets: [
        {
          label: "Third Dataset",
          data: [12, 51, 62, 33, 21, 62, 45],
          fill: true,
          borderColor: documentStyle.getPropertyValue("--blue-500"),
          tension: 0.4,
          backgroundColor: documentStyle.getPropertyValue("--blue-500"),
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
        legend: {
          labels: {
            color: textColor,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <Widget
      title={`Utilization Widget`}
      subtitle={`Organization Base Utilization`}
      icon={<GoGraph size={18} className="text-layer-light-700 sm:hidden" />}
    >
      <Chart type="line" data={chartData} options={chartOptions} />
    </Widget>
  );
}
