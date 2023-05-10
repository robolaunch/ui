import React, { ReactElement } from "react";
import WidgetLayout from "../../layouts/WidgetLayout";
import { GoGraph } from "react-icons/go";
import ReactApexChart from "react-apexcharts";
import InputSelect from "../InputSelect/InputSelect";

export default function InvoiceOrganizationsUtilizationWidget(): ReactElement {
  return (
    <WidgetLayout
      title={`Invoice Utilization Widget`}
      subtitle={
        <div className="flex gap-4">
          <InputSelect className="!px-1 !m-0 !h-fit border-none">
            <option value="organizations">Organizations</option>
            <option value="roboticsClouds">Robotics Clouds</option>
            <option value="fleets">Fleets</option>
            <option value="robots">Robots</option>
          </InputSelect>
          <InputSelect className="!px-0.5 !m-0 !h-fit border-none">
            <option value="all">All Organizations</option>
            <option value="1">Organization #1</option>
            <option value="2">Organization #2</option>
            <option value="3">Organization #3</option>
          </InputSelect>
        </div>
      }
      icon={<GoGraph size={20} className="text-layer-light-700" />}
    >
      <div className="flex items-center justify-center py-2 px-4 "></div>
      <ReactApexChart
        options={{
          chart: {
            type: "area",
            toolbar: {
              show: false,
            },
          },
          colors: ["#AC2DFE", "#35B8FA", "#c77bfc", "#5492fc"],
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
            name: `Organization #1 Utilization`,
            data: [
              21, 20, 24, 22, 19, 20, 24, 21, 20, 24, 22, 19, 20, 24, 21, 20,
              24, 22, 19, 20, 24, 21, 20, 24, 22, 19, 20, 24, 21, 20,
            ],
          },
          {
            name: `Organization #2 Utilization`,
            data: [
              31, 30, 28, 32, 31, 30, 34, 31, 30, 28, 32, 31, 30, 34, 31, 30,
              28, 32, 31, 30, 34, 31, 30, 28, 32, 31, 30, 34, 31, 30,
            ],
          },
          {
            name: `Organization #3 Utilization`,
            data: [
              36, 40, 38, 42, 36, 40, 44, 36, 40, 38, 42, 36, 40, 44, 36, 40,
              38, 42, 36, 40, 44, 36, 40, 38, 42, 36, 40, 44, 36, 40,
            ],
          },
          {
            name: `Organization #4 Utilization`,
            data: [
              11, 10, 18, 12, 11, 10, 14, 11, 10, 18, 12, 11, 10, 14, 11, 10,
              18, 12, 11, 10, 14, 11, 10, 18, 12, 11, 10, 14, 11, 10,
            ],
          },
        ]}
        type="area"
        height={300}
      />
    </WidgetLayout>
  );
}
