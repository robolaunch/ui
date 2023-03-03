import React, { ReactElement } from "react";
import { GoGraph } from "react-icons/go";
import ReactApexChart from "react-apexcharts";
import { useComponentSize } from "react-use-size";
import WidgetLayout from "../../layouts/WidgetLayout";

interface IRosResourceUsageWidget {
  ros: any;
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosResourceUsageWidget({
  ros,
  id,
  handleRemoveWidget,
}: IRosResourceUsageWidget): ReactElement {
  const { ref, height } = useComponentSize();

  return (
    <WidgetLayout
      id={id}
      type="RosResourceUsageWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<GoGraph size={20} className="text-layer-light-400" />}
      title="Resource Widget"
    >
      <div className="grid grid-cols-2 gap-4 h-full p-2">
        <div ref={ref} className="col-span-1 flex flex-col text-xs font-medium">
          <div className="flex justify-between">
            <div>CPU Usage</div>
            <div>48%</div>
          </div>
          <ReactApexChart
            options={{
              chart: {
                height: height / 1.23,
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
            series={[
              {
                name: "Internal Network",
                data: [31, 30, 28, 32, 31, 30, 34],
              },
            ]}
            type="area"
            height={height / 1.23}
          />
        </div>
        <div className="col-span-1 flex flex-col text-xs font-medium">
          <div className="flex justify-between">
            <div>Ram Usage</div>
            <div>58%</div>
          </div>
          <ReactApexChart
            options={{
              chart: {
                height: height / 1.23,
                type: "area",
                toolbar: {
                  show: false,
                },
              },
              colors: ["#35B8FA"],
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
            series={[
              {
                name: "Internal Network",
                data: [31, 30, 28, 32, 31, 30, 34],
              },
            ]}
            type="area"
            height={height / 1.23}
          />
        </div>{" "}
        <div className="col-span-1 flex flex-col text-xs font-medium">
          <div className="flex justify-between">
            <div>GPU Usage</div>
            <div>63%</div>
          </div>
          <ReactApexChart
            options={{
              chart: {
                height: height / 1.23,
                type: "area",
                toolbar: {
                  show: false,
                },
              },
              colors: ["#5492fc"],
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
            series={[
              {
                name: "Internal Network",
                data: [31, 30, 28, 32, 31, 30, 34],
              },
            ]}
            type="area"
            height={height / 1.23}
          />
        </div>{" "}
        <div className="col-span-1 flex flex-col text-xs font-medium">
          <div className="flex justify-between">
            <div>Disk Usage</div>
            <div>25%</div>
          </div>
          <ReactApexChart
            options={{
              chart: {
                height: height / 1.23,
                type: "area",
                toolbar: {
                  show: false,
                },
              },
              colors: ["#c77bfc"],
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
            series={[
              {
                name: "Internal Network",
                data: [31, 30, 28, 32, 31, 30, 34],
              },
            ]}
            type="area"
            height={height / 1.23}
          />
        </div>
      </div>
    </WidgetLayout>
  );
}
