import React, { ReactElement } from "react";
import Widget from "../../layouts/WidgetLayout";
import { GoGraph } from "react-icons/go";
import ReactApexChart from "react-apexcharts";

interface ICountWidget {
  title: string;
  data: any;
}

export default function CountWidget({
  title,
  data,
}: ICountWidget): ReactElement {
  return (
    <Widget
      title={`Count Widget`}
      subtitle={`${title} Count`}
      icon={<GoGraph size={20} className="text-layer-light-700" />}
    >
      <ReactApexChart
        series={[44, 55, 13, 43, 22]}
        options={{
          chart: {
            width: 380,
            type: "pie",
          },
          labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        }}
        type="pie"
        height={250}
      />
    </Widget>
  );
}
