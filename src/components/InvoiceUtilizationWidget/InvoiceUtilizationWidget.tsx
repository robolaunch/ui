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
        <div className="flex flex-col gap-1">
          <span>Monthly Invoice Utilization</span>
          <InputSelect className="text-xs !p-0.5 !h-fit">
            <option value="1">Organization #1</option>
            <option value="2">Organization #2</option>
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
          colors: ["#AC2DFE"],
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
              "2023-09-10",
              "2023-09-11",
              "2023-09-12",
              "2023-09-13",
              "2023-09-14",
              "2023-09-15",
              "2023-09-16",
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
            name: ` Base Utilization`,
            data: [31, 30, 28, 32, 31, 30, 34],
          },
        ]}
        type="area"
        height={250}
      />
    </WidgetLayout>
  );
}
