import React, { ReactElement, useEffect } from "react";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";
import { BsBatteryFull } from "react-icons/bs";
import ReactApexChart from "react-apexcharts";
import { useComponentSize } from "react-use-size";

interface IRosBatteryWidget {
  ros: any;
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosBatteryWidget({
  ros,
  id,
  handleRemoveWidget,
}: IRosBatteryWidget): ReactElement {
  const { ref, height, width } = useComponentSize();

  useEffect(() => {
    console.log(height, width);
  }, [height, width]);

  return (
    <RosWidgetLayout
      handleRemoveWidget={handleRemoveWidget}
      id={id}
      type="RosBatteryWidget"
      icon={<BsBatteryFull size={22} className="text-light-400" />}
      title="Battery"
    >
      <div ref={ref} className="relative h-full w-full">
        <div className="absolute inset-0">
          <div className="grid grid-cols-2 ">
            <div className="col-span-1">
              <ReactApexChart
                series={[75]}
                options={{
                  chart: {
                    height: height,
                    type: "radialBar",
                    toolbar: {
                      show: false,
                    },
                  },
                  plotOptions: {
                    radialBar: {
                      startAngle: -135,
                      endAngle: 225,
                      hollow: {
                        margin: 0,
                        size: "70%",
                        background: "#fff",
                        image: undefined,
                        imageOffsetX: 0,
                        imageOffsetY: 0,
                        position: "front",
                        dropShadow: {
                          enabled: true,
                          top: 3,
                          left: 0,
                          blur: 4,
                          opacity: 0.24,
                        },
                      },
                      track: {
                        background: "#fff",
                        strokeWidth: "67%",
                        margin: 0, // margin is in pixels
                        dropShadow: {
                          enabled: true,
                          top: -3,
                          left: 0,
                          blur: 4,
                          opacity: 0.35,
                        },
                      },

                      dataLabels: {
                        show: true,
                        name: {
                          show: false,
                          color: "#888",
                          fontSize: "17px",
                        },
                        value: {
                          offsetY: 8,
                          color: "#111",
                          fontSize: "20px",
                          show: true,
                        },
                      },
                    },
                  },
                  fill: {
                    type: "gradient",
                    gradient: {
                      shade: "dark",
                      type: "horizontal",
                      shadeIntensity: 0.5,
                      gradientToColors: ["#AC2DFE", "#35B8FA"],
                      inverseColors: true,
                      opacityFrom: 1,
                      opacityTo: 1,
                      stops: [0, 100],
                    },
                  },
                  stroke: {
                    lineCap: "round",
                  },
                  labels: [""],
                }}
                type="radialBar"
                height={height + 20}
              />
            </div>
            <div className="col-span-1 flex flex-col items-center justify-center gap-4  font-medium">
              <div
                className="bg-light-100 flex flex-col gap-1 rounded-lg py-2 text-center"
                style={{ width: width / 2.5 }}
              >
                <span className="text-sm ">37.2 V</span>
                {height > 100 && <span className="text-xs ">Voltage</span>}
              </div>
              <div
                className="bg-light-100 flex flex-col gap-1 rounded-lg py-2 text-center "
                style={{ width: width / 2.5 }}
              >
                <span className="text-sm ">5.2 V</span>
                {height > 100 && <span className="text-xs ">Ampere</span>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RosWidgetLayout>
  );
}
