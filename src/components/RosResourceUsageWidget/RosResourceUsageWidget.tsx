import React, { ReactElement } from "react";
import { GoGraph } from "react-icons/go";
import ReactApexChart from "react-apexcharts";
import { useComponentSize } from "react-use-size";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";

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
    <RosWidgetLayout
      id={id}
      type="RosResourceUsageWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<GoGraph size={20} className="text-light-400" />}
      title="Resource Widget"
    >
      <div className="relative h-full w-full">
        <div ref={ref} className="absolute inset-0 grid grid-cols-2 p-2">
          <div className="col-span-1 text-xs font-medium">
            <ReactApexChart
              options={{
                chart: {
                  height: height / 2.35,
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
                  name: "CPU Usage",
                  data: [31, 30, 28, 32, 31, 30, 34],
                },
              ]}
              type="area"
              height={height / 2.35}
            />
          </div>
          <div className="col-span-1 text-xs font-medium">
            <ReactApexChart
              options={{
                chart: {
                  height: height / 2.35,
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
                  name: "Ram Usage",
                  data: [31, 30, 28, 32, 31, 30, 34],
                },
              ]}
              type="area"
              height={height / 2.35}
            />
          </div>{" "}
          <div className="col-span-1 text-xs font-medium">
            <ReactApexChart
              options={{
                chart: {
                  height: height / 2.35,
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
                  name: "GPU Usage",
                  data: [31, 30, 28, 32, 31, 30, 34],
                },
              ]}
              type="area"
              height={height / 2.35}
            />
          </div>{" "}
          <div className="col-span-1 text-xs font-medium">
            <ReactApexChart
              options={{
                chart: {
                  height: height / 2.35,
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
                  name: "Disk Usage",
                  data: [31, 30, 28, 32, 31, 30, 34],
                },
              ]}
              type="area"
              height={height / 2.35}
            />
          </div>
        </div>
      </div>
    </RosWidgetLayout>
  );
}
