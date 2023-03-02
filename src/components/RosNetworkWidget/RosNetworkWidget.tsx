import React, { ReactElement } from "react";
import { BiTrashAlt } from "react-icons/bi";
import { FaSignal } from "react-icons/fa";
import ReactApexChart from "react-apexcharts";
import { useComponentSize } from "react-use-size/dist/useComponentSize";
import WidgetLayout from "../../layouts/WidgetLayout";

interface IRosNetworkWidget {
  ros: any;
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosNetworkWidget({
  ros,
  id,
  handleRemoveWidget,
}: IRosNetworkWidget): ReactElement {
  const data = {
    series: [
      {
        name: "Internal Network",
        data: [31, 30, 28, 32, 31, 30, 34],
      },
      {
        name: "External Network",
        data: [20, 22, 24, 21, 22, 20, 21],
      },
    ],
  };

  const { ref, height } = useComponentSize();

  return (
    <WidgetLayout
      id={id}
      type="RosNetworkWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<FaSignal size={22} className="text-layer-light-400" />}
      title="Network"
    >
      <div
        ref={ref}
        className="grid grid-cols-1 gap-2 overflow-auto scrollbar-hide p-2"
      >
        <div className="col-span-1">
          <ReactApexChart
            options={{
              chart: {
                height: height - 30,
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
                  formatter(val, opts) {
                    return val + " Mbps";
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
            series={data.series}
            type="area"
            height={height - 30}
          />
        </div>
      </div>
    </WidgetLayout>
  );
}
