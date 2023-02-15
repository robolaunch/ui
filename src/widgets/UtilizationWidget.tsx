import React, { FC } from "react";
import ReactApexChart from "react-apexcharts";

export const UtilizationWidget: FC = () => {
  const data = {
    series: [
      {
        name: "Utilization Data #1",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  };

  return (
    <div className="shadow-lg rounded-xl pt-8 pl-4 pr-8 bg-layer-light-50">
      <div className="flex items-center gap-2 pl-4">
        <div>
          <i className="pi pi-chart-line " style={{ fontSize: "1rem" }}></i>
        </div>
        <span className="font-medium">Utilization Widget</span>
      </div>
      <div className="p-2">
        <ReactApexChart
          series={data?.series}
          options={{
            dataLabels: {
              enabled: false,
            },
            stroke: {
              curve: "smooth",
            },
            xaxis: {
              categories: data?.labels,
              labels: {
                style: {
                  colors: "#bfbfbf",
                  fontSize: "12px",
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  colors: "#bfbfbf",
                  fontSize: "12px",
                },
              },
            },
          }}
          type="area"
          height={350}
        />
      </div>
    </div>
  );
};
