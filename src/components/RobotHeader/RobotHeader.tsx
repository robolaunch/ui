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
  responseRobot: any;
  handleChangeActiveTab: any;
  activeTab: string;
}

export default function RobotHeader({
  responseRobot,
  handleChangeActiveTab,
  activeTab,
}: IRobotHeader): ReactElement {
  console.log(responseRobot);

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
      state: true,
    },
    {
      name: "K8S Resources",
      state: responseRobot ? true : false,
    },
    {
      name: "Task Management",
      state: responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
    },
    {
      name: "Teleoperation",
      state: responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
    },
    {
      name: "Visualization",
      state: responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
    },
    {
      name: "Development Suite",
      state:
        responseRobot?.ideIngressEndpoint && responseRobot?.vdiIngressEndpoint
          ? true
          : false,
      disabled:
        responseRobot?.ideIngressEndpoint && responseRobot?.vdiIngressEndpoint
          ? false
          : true,
    },
    {
      name: "Code Editor",
      state: responseRobot?.ideIngressEndpoint ? true : false,
      disabled: responseRobot?.ideIngressEndpoint ? false : true,
    },
    {
      name: "Remote Desktop",
      state: responseRobot?.vdiIngressEndpoint ? true : false,
      disabled: responseRobot?.vdiIngressEndpoint ? false : true,
    },
  ];

  return (
    <CardLayout className="pt-6 px-8 !pb-0">
      <Fragment>
        <div className="h-28 flex items-center justify-between">
          <div className="h-full flex flex-col justify-around">
            <span className="text-lg font-medium">{url?.robotName}</span>
            <span className="flex gap-2 items-center">
              <AiOutlineTeam size={16} />
              <span className="text-xs font-light">
                {url?.organizationName} Organization
              </span>
            </span>
            <span className="flex gap-2 items-center">
              <IoLocationOutline size={16} />
              <span className="text-xs font-light">Ankara, Turkiye</span>
            </span>
          </div>

          <div className="hidden md:flex text-xs font-medium text-layer-dark-400  gap-8">
            <div className="h-full flex flex-col items-end gap-4">
              <div className="flex gap-2">
                <div className="flex  items-center rounded-lg p-2">
                  <span>Code Editor</span>
                  <InputToggle
                    icons={false}
                    checked={responseRobot?.ideEnabled}
                    onChange={() => {}}
                  />
                </div>
                <div className="flex  items-center rounded-lg p-2">
                  <span>ROS2 Bridge</span>
                  <InputToggle
                    icons={false}
                    checked={responseRobot?.bridgeEnabled}
                    onChange={() => {}}
                  />
                </div>
                <div className="flex  items-center rounded-lg p-2">
                  <span>Remote Desktop</span>
                  <InputToggle
                    icons={false}
                    checked={responseRobot?.vdiEnabled}
                    onChange={() => {}}
                  />
                </div>
              </div>

              <div className="flex flex-col items-end">
                {responseRobot?.robotClusters?.length > 1 && (
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
                )}
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
        <ul className="flex gap-8 px-6 pt-5 overflow-x-auto items-end">
          {tabs.map((tab: any, index: number) => {
            return (
              <div
                className={`flex flex-col gap-3 ${
                  tab?.disabled ? "cursor-not-allowed" : "cursor-pointer"
                }`}
                onClick={() =>
                  tab?.state &&
                  !tab?.disabled &&
                  handleChangeActiveTab(tab.name)
                }
                key={index}
              >
                <li
                  className={`text-xs font-medium px-2 transition-all duration-500 min-w-max hover:scale-90  ${
                    tab.name === activeTab
                      ? "text-layer-primary-500"
                      : "text-layer-light-500"
                  } `}
                >
                  {!tab?.state ? (
                    <img
                      className="w-6 h-6 scale-125"
                      src="/svg/general/loading.svg"
                      alt="loading"
                    />
                  ) : (
                    tab.name
                  )}
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
