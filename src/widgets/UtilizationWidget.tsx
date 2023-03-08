import React, { ReactElement, useEffect, useState } from "react";
import { GoGraph } from "react-icons/go";
import Widget from "../components/Widget/Widget";
import { Chart } from "primereact/chart";
import ReactApexChart from "react-apexcharts";
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
      icon={<GoGraph size={20} className="text-layer-light-700" />}
    >
      <ReactApexChart
        options={{
          chart: {
            type: "area",
            toolbar: {
              show: false,
            },
          },
          colors: ["#35B8FA", "#AC2DFE"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },

          xaxis: {
            type: "datetime",
            labels: {
              style: {
                colors: "#00000075",
              },
            },
            categories: [
              "2018-09-19T00:00:00.000Z",
              "2018-09-19T01:30:00.000Z",
              "2018-09-19T02:30:00.000Z",
              "2018-09-19T03:30:00.000Z",
              "2018-09-19T04:30:00.000Z",
              "2018-09-19T05:30:00.000Z",
              "2018-09-19T06:30:00.000Z",
            ],
          },
          yaxis: {
            labels: {
              style: {
                colors: "#00000075",
              },
            },
          },

          tooltip: {
            x: {
              format: "dd/MM/yy HH:mm",
            },
          },
          legend: {
            show: false,
          },
        }}
        series={[
          {
            name: "Organization Base Utilization",
            data: [31, 30, 28, 32, 31, 30, 34],
          },
        ]}
        type="area"
        height={300}
      />
    </Widget>
  );
}
