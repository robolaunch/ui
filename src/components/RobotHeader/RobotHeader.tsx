import React, { Fragment, ReactElement } from "react";
import InputToggle from "../InputToggle/InputToggle";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { AiOutlineTeam } from "react-icons/ai";
import { BsFillCpuFill } from "react-icons/bs";
import { FaMemory } from "react-icons/fa";
import { MdOutlineStorage } from "react-icons/md";
import CardLayout from "../../layouts/CardLayout";
interface IRobotHeader {
  handleChangeActiveTab: any;
  activeTab: string;
}

export default function RobotHeader({
  handleChangeActiveTab,
  activeTab,
}: IRobotHeader): ReactElement {
  const url = useParams();

  const resources = {
    virtual: {
      cpu: "4 Core",
      gpu: "Nvidia RTX 2080",
      ram: "16 GB",
      storage: "100 GB",
    },
    physical: {
      cpu: "4 Core",
      gpu: "None",
      ram: "16 GB",
      storage: "100 GB",
    },
  };

  const tabs = [
    {
      name: "Overview",
    },
    {
      name: "K8S Resources",
    },
    {
      name: "Task Management",
    },
    {
      name: "Teleoperation",
    },
    {
      name: "Visualization",
    },
    {
      name: "Development Suite",
    },
    {
      name: "Code Editor",
    },
    {
      name: "Remote Desktop",
    },
  ];

  return (
    <CardLayout className="!pb-0">
      <Fragment>
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

          <div className="text-xs font-medium text-layer-dark-400 flex gap-8">
            <div className="flex 2xl:flex-col items-end gap-8">
              <div className="flex xl:flex-col 2xl:flex-row  gap-2">
                <div className="flex  items-center rounded-lg p-2">
                  <span>Code Editor</span>
                  <InputToggle
                    icons={false}
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
                <div className="flex  items-center rounded-lg p-2">
                  <span>Teleoperation</span>
                  <InputToggle
                    icons={false}
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
                <div className="flex  items-center rounded-lg p-2">
                  <span>Remote Desktop</span>
                  <InputToggle
                    icons={false}
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-center font-semibold">
                    Physical Resources:
                  </span>
                  <div className="col-span-1 flex items-center gap-2">
                    <BsFillCpuFill size={16} color="#666666" />
                    <span className="text-xs font-light">
                      {resources?.physical?.cpu}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center gap-2">
                    <BsFillCpuFill size={16} color="#666666" />
                    <span className="text-xs font-light">
                      {resources?.physical?.gpu}
                    </span>
                  </div>{" "}
                  <div className="col-span-1 flex items-center gap-2">
                    <FaMemory size={16} color="#666666" />
                    <span className="text-xs font-light">
                      {resources?.physical?.ram}
                    </span>
                  </div>{" "}
                  <div className="col-span-1 flex items-center gap-2">
                    <MdOutlineStorage size={16} color="#666666" />
                    <span className="text-xs font-light">
                      {resources?.physical?.storage}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3 pt-6">
                  <span className="text-xs text-center font-semibold">
                    Virtual Resources:
                  </span>
                  <div className="col-span-1 flex items-center gap-2">
                    <BsFillCpuFill size={16} color="#666666" />
                    <span className="text-xs font-light">
                      {resources?.virtual?.cpu}
                    </span>
                  </div>
                  <div className="col-span-1 flex items-center gap-2">
                    <BsFillCpuFill size={16} color="#666666" />
                    <span className="text-xs font-light">
                      {resources?.virtual?.gpu}
                    </span>
                  </div>{" "}
                  <div className="col-span-1 flex items-center gap-2">
                    <FaMemory size={16} color="#666666" />
                    <span className="text-xs font-light">
                      {resources?.virtual?.ram}
                    </span>
                  </div>{" "}
                  <div className="col-span-1 flex items-center gap-2">
                    <MdOutlineStorage size={16} color="#666666" />
                    <span className="text-xs font-light">
                      {resources?.virtual?.storage}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="flex gap-8 px-6 pt-5 overflow-x-auto">
          {tabs.map((tab: any, index: number) => {
            return (
              <div
                className="flex flex-col gap-3 cursor-pointer "
                onClick={() => handleChangeActiveTab(tab.name)}
                key={index}
              >
                <li
                  className={`text-xs font-medium px-2 transition-all duration-500 min-w-max hover:scale-90  ${
                    tab.name === activeTab
                      ? "text-layer-primary-500"
                      : "text-layer-light-500"
                  } `}
                >
                  {tab.name}
                </li>
                <div
                  className={`w-full h-[2px] transition-all duration-500 
                  ${
                    tab.name === activeTab
                      ? "bg-layer-primary-500"
                      : "bg-layer-light-100"
                  } `}
                />
              </div>
            );
          })}
        </ul>
      </Fragment>
    </CardLayout>
  );
}
