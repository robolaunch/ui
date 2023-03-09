import React, { ReactElement } from "react";
import InputToggle from "../InputToggle/InputToggle";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { BsFillCpuFill } from "react-icons/bs";
import { FaMemory } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import ReactApexChart from "react-apexcharts";
interface IRobotHeader {
  handleChangeActiveTab: any;
  activeTab: string;
}

export default function RobotHeader({
  handleChangeActiveTab,
  activeTab,
}: IRobotHeader): ReactElement {
  const url = useParams();

  const tabs = [
    {
      name: "Overview",
    },
    {
      name: "Task Management",
    },
    {
      name: "Robot Workspaces",
    },
    {
      name: "Kubernetes Resources",
    },
    {
      name: "Development Suite",
    },
    {
      name: "Code Editor",
    },
    {
      name: "Visualization",
    },
    {
      name: "Teleoperation",
    },
    {
      name: "Remote Desktop",
    },
    {
      name: "Settings",
    },
  ];

  return (
    <div className="flex flex-col justify-between bg-layer-light-50 rounded-lg shadow">
      <div className="h-28 flex justify-between p-4">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-medium">{url?.robotName}</span>
          <span className="flex gap-2 items-center">
            <AiOutlineTeam size={16} />
            <span className="text-xs font-light">{url?.teamName}</span>
          </span>
          <span className="flex gap-2 items-center">
            <IoLocationOutline size={16} />
            <span className="text-xs font-light">Ankara, Turkiye</span>
          </span>
        </div>
        <div className="flex gap-6">
          <div id="resources" className="grid grid-cols-2 gap-x-6">
            <div className="col-span-1 flex items-center gap-2">
              <BsFillCpuFill size={18} />
              <span className="text-xs font-normal">4 Core</span>
            </div>
            <div className="col-span-1 flex items-center gap-2">
              <BsFillCpuFill size={18} />
              <span className="text-xs font-normal">4 Core</span>
            </div>{" "}
            <div className="col-span-1 flex items-center gap-2">
              <FaMemory size={18} />
              <span className="text-xs font-normal">8 RAM</span>
            </div>{" "}
            <div className="col-span-1 flex items-center gap-2">
              <MdOutlineStorage size={18} />
              <span className="text-xs font-normal">100 GB</span>
            </div>
          </div>
          <ReactApexChart
            series={[75]}
            options={{
              chart: {
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
                      color: "#111",
                      fontSize: "13px",
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
            height={100}
            width={66}
          />
        </div>
        <div className="text-xs font-medium text-layer-dark-400 flex gap-8">
          <div className="flex flex-col gap-2 items-center border border-layer-secondary-100 rounded-lg py-3 px-7 shadow">
            <span>Code Editor</span>
            <InputToggle icons={false} checked={true} onChange={() => {}} />
          </div>
          <div className="flex flex-col gap-2 items-center border border-layer-secondary-100 rounded-lg py-3 px-7 shadow">
            <span>Teleoperation</span>
            <InputToggle icons={false} checked={true} onChange={() => {}} />
          </div>
          <div className="flex flex-col gap-2 items-center border border-layer-secondary-100 rounded-lg py-3 px-7 shadow">
            <span>Remote Desktop</span>
            <InputToggle icons={false} checked={true} onChange={() => {}} />
          </div>
        </div>
      </div>
      <ul className="flex gap-8 px-6 pt-5 overflow-x-auto">
        {tabs.map((tab: any, index: number) => {
          return (
            <div
              className="flex flex-col gap-3 cursor-pointer"
              onClick={() => handleChangeActiveTab(tab.name)}
              key={index}
            >
              <li
                className={`text-xs font-medium px-2 transition-all duration-500 min-w-max ${
                  tab.name === activeTab
                    ? "text-layer-primary-500"
                    : "text-layer-light-500"
                } `}
              >
                {tab.name}
              </li>
              <div
                className={`w-full h-[2px] transition-all duration-500 ${
                  tab.name === activeTab
                    ? "bg-layer-primary-500"
                    : "bg-transparent"
                } `}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
}
