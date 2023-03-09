import React from "react";
import Widget from "../../layouts/WidgetLayout";
import { GoGraph } from "react-icons/go";
import ReactApexChart from "react-apexcharts";

interface ICountWidget {
  title: string;
  data: number[];
}

export default function CountWidget({
  title,
  data,
}: ICountWidget): React.ReactElement {
  return (
    <Widget
      title={`Count Widget`}
      subtitle={`${title} Base Count`}
      icon={<GoGraph size={20} className="text-layer-light-700" />}
    >
      <ReactApexChart
        series={[
          {
            data: data,
            name: "Count",
          },
        ]}
        options={{
          chart: {
            type: "bar",
            toolbar: {
              show: false,
            },

            events: {
              click: function (chart, w, e) {
                // console.log(chart, w, e)
              },
            },
          },
          colors: ["#AC2DFE", "#35B8FA", "#c77bfc", "#5492fc"],
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          xaxis: {
            categories: [
              ["Robots"],
              ["Fleets"],
              ["Robotics Clouds"],
              ["Teams"],
            ],
            labels: {
              style: {
                colors: "#00000075",

                fontSize: "12px",
              },
            },
          },
          yaxis: {
            labels: {
              style: {
                colors: "#00000075",
              },
            },
          },
        }}
        type="bar"
        height={250}
      />
    </Widget>
  );
}
