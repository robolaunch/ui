import React, { ReactElement } from "react";
import Widget from "../../layouts/WidgetLayout";
import { GoGraph } from "react-icons/go";
import ReactApexChart from "react-apexcharts";

interface ICountWidget {
  data: any[] | undefined;
}

export default function CountWidget({ data }: ICountWidget): ReactElement {
  return (
    <Widget
      title={`Count Widget`}
      subtitle={` Count`}
      icon={<GoGraph size={20} className="text-layer-light-700" />}
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
