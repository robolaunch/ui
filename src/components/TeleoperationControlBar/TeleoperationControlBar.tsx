import React, { Fragment, ReactElement } from "react";
import InputToggle from "../InputToggle/InputToggle";
import ReactApexChart from "react-apexcharts";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";
import InputSelect from "../InputSelect/InputSelect";

interface ITeleoperationControlBar {
  selectedTopic: string;
  selectableTopic: any;
  setSelectedTopic: (value: string) => void;
  isRemoteDesktopStream: boolean;
  setIsRemoteDesktopStream: (value: boolean) => void;
  handleFullScreen: any;
}

export default function TeleoperationControlBar({
  selectedTopic,
  selectableTopic,
  isRemoteDesktopStream,
  setSelectedTopic,
  setIsRemoteDesktopStream,
  handleFullScreen,
}: ITeleoperationControlBar): ReactElement {
  return (
    <div className="absolute bottom-0 flex items-center justify-between px-4 w-full bg-layer-light-50 shadow-lg z-10 rounded-t">
      <div className="flex gap-2">
        <InputSelect
          disabled={isRemoteDesktopStream}
          className="text-xs font-medium text-center h-8 p-0 min-w-[8rem]"
          onChange={(e) => setSelectedTopic(e.target.value)}
          value={selectedTopic}
        >
          <Fragment>
            <option value="None">None</option>
            {selectableTopic?.map((topic: any) => {
              return (
                <option key={topic.name} value={topic.name}>
                  {topic.name}
                </option>
              );
            })}
          </Fragment>
        </InputSelect>
        <InputToggle
          onChange={(e: any) => setIsRemoteDesktopStream(e)}
          checked={isRemoteDesktopStream}
          rightLabel="Remote Desktop"
          icons={false}
          color={"#FFFFFF"}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex items-center text-xs font-medium text-layer-light-700">
          <span>CPU: </span>
          <ReactApexChart
            series={[24]}
            options={{
              chart: {
                height: 50,
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
                      offsetY: 5,
                      color: "#11111190",
                      fontSize: "11px",
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
            height={80}
            width={60}
          />
        </div>
        <div className="flex items-center text-xs font-medium text-layer-light-700">
          <span>GPU: </span>
          <ReactApexChart
            series={[54]}
            options={{
              chart: {
                height: 50,
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
                      offsetY: 5,
                      color: "#11111190",
                      fontSize: "11px",
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
            height={80}
            width={60}
          />
        </div>
        <div className="flex items-center text-xs font-medium text-layer-light-700">
          <span>RAM: </span>
          <ReactApexChart
            series={[65]}
            options={{
              chart: {
                height: 50,
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
                      offsetY: 5,
                      color: "#11111190",
                      fontSize: "11px",
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
            height={80}
            width={60}
          />
        </div>
        <div className="flex items-center text-xs font-medium text-layer-light-700">
          <span>DISK: </span>
          <ReactApexChart
            series={[12]}
            options={{
              chart: {
                height: 50,
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
                      offsetY: 5,
                      color: "#11111190",
                      fontSize: "11px",
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
            height={80}
            width={60}
          />
        </div>
        <div className="flex items-center text-xs font-medium text-layer-light-700">
          <span>Battery: </span>
          <ReactApexChart
            series={[75]}
            options={{
              chart: {
                height: 50,
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
                      offsetY: 5,
                      color: "#11111190",
                      fontSize: "11px",
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
            height={80}
            width={60}
          />
        </div>
        <div className="flex items-center text-xs font-medium text-layer-light-700">
          <span>Ping: </span>
          <ReactApexChart
            series={[68]}
            options={{
              chart: {
                height: 50,
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
                      offsetY: 5,
                      color: "#11111190",
                      fontSize: "11px",
                      show: true,
                      formatter(val) {
                        return val + "";
                      },
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
            height={80}
            width={60}
          />
        </div>
      </div>

      {handleFullScreen.active ? (
        <button onClick={handleFullScreen.exit}>
          <BsFullscreenExit size={24} className="text-layer-light-700" />
        </button>
      ) : (
        <button onClick={handleFullScreen.enter}>
          <BsFullscreen size={24} className="text-layer-light-700" />
        </button>
      )}
    </div>
  );
}
