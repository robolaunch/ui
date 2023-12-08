import React, { ReactElement } from "react";
import Widget from "../../layouts/WidgetLayout";
import ReactApexChart from "react-apexcharts";
import { GoGraph } from "react-icons/go";

interface ICountWidget {
  data: any[] | undefined;
}

export default function CountWidget({ data }: ICountWidget): ReactElement {
  return (
    <Widget
      dataTut="counter-widget"
      title={`State Counter`}
      subtitle={`State Counter`}
      icon={<GoGraph size={20} className="text-light-700" />}
    >
      <ReactApexChart
        series={data?.map((item) => item?.value) || []}
        options={{
          chart: {
            width: "100%",
            height: "100%",
            type: "pie",
          },
          labels: data?.map((item) => item?.label) || [],
          colors: data?.map((item) => item?.color) || [],
          responsive: [
            {
              options: {
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        }}
        type="pie"
        height={"100%"}
      />
    </Widget>
  );
}
