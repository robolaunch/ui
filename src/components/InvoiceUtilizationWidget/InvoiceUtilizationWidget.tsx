import React, { ReactElement } from "react";
import WidgetLayout from "../../layouts/WidgetLayout";
import { GoGraph } from "react-icons/go";
import ReactApexChart from "react-apexcharts";
import InputSelect from "../InputSelect/InputSelect";

export default function InvoiceUtilizationWidget(): ReactElement {
  return (
    <WidgetLayout
      title={`Invoice Utilization Widget`}
      subtitle={
        <div className="flex gap-4">
          <InputSelect className="!m-0 !h-fit border-none !px-1">
            <option value="organizations">Organizations</option>
            <option value="roboticsClouds">Robotics Clouds</option>
            <option value="fleets">Fleets</option>
            <option value="robots">Robots</option>
          </InputSelect>
          <InputSelect className="!m-0 !h-fit border-none !px-0.5">
            <option value="all">All Organizations</option>
            <option value="1">Organization #1</option>
            <option value="2">Organization #2</option>
            <option value="3">Organization #3</option>
          </InputSelect>
        </div>
      }
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
          colors: ["#AC2DFE"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "stepline",
            width: 3,
          },

          xaxis: {
            type: "datetime",
            labels: {
              style: {
                colors: "#00000075",
              },
            },
            categories: [
              "2023-09-01",
              "2023-09-02",
              "2023-09-03",
              "2023-09-04",
              "2023-09-05",
              "2023-09-06",
              "2023-09-07",
              "2023-09-08",
              "2023-09-09",
              "2023-09-10",
              "2023-09-11",
              "2023-09-12",
              "2023-09-13",
              "2023-09-14",
              "2023-09-15",
              "2023-09-16",
              "2023-09-17",
              "2023-09-18",
              "2023-09-19",
              "2023-09-20",
              "2023-09-21",
              "2023-09-22",
              "2023-09-23",
              "2023-09-24",
              "2023-09-25",
              "2023-09-26",
              "2023-09-27",
              "2023-09-28",
              "2023-09-29",
              "2023-09-30",
            ],
          },
          yaxis: {
            labels: {
              style: {
                colors: "#00000075",
              },
              formatter: function (val) {
                return val + "$";
              },
            },
          },
          tooltip: {
            x: {
              format: "dd/MM/yy",
            },
          },
          legend: {
            show: false,
          },
        }}
        series={[
          {
            name: `Utilization`,
            data: [
              21, 20, 24, 22, 19, 20, 24, 21, 20, 24, 22, 19, 20, 24, 21, 20,
              24, 22, 19, 20, 24, 21, 20, 24, 22, 19, 20, 24, 21, 20,
            ],
          },
        ]}
        type="area"
        height={300}
      />
    </WidgetLayout>
  );
}
