import React, { FC, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { SelectButton } from "primereact/selectbutton";

export const UtilizationWidget: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("1D");

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
    <div className="shadow-lg rounded-xl p-6 bg-layer-light-50">
      <div className="flex justify-between items-center  pl-1">
        <div className="flex gap-2 items-center">
          <i className="pi pi-chart-line " style={{ fontSize: "1rem" }}></i>
          <span className="font-medium">Utilization Widget</span>
        </div>
        <SelectButton
          value={activeTab}
          onChange={(e) => setActiveTab(e.value)}
          options={["1D", "1W", "1M"]}
        />
      </div>
      <div className="p-2">
        <ReactApexChart
          series={data?.series}
          options={{
            dataLabels: {
              enabled: false,
            },
            fill: {
              colors: ["#AC2DFE"],
            },

            stroke: {
              curve: "smooth",
              colors: ["#AC2DFE"],
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
          className="!min-h-[10rem]"
        />
      </div>
    </div>
  );
};
