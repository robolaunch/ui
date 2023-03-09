import React, { ReactElement } from "react";
import { GoGraph } from "react-icons/go";
import Widget from "../../layouts/WidgetLayout";
import ReactApexChart from "react-apexcharts";

interface IUtilizationWidget {
  title: string;
}

export default function UtilizationWidget({
  title,
}: IUtilizationWidget): ReactElement {
  return (
    <Widget
      title={`Utilization Widget`}
      subtitle={`${title} Base Utilization`}
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
            name: `${title} Base Utilization`,
            data: [31, 30, 28, 32, 31, 30, 34],
          },
        ]}
        type="area"
        height={250}
      />
    </Widget>
  );
}
