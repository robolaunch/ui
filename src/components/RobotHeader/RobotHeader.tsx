import React, { Fragment, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillCode, AiOutlineTeam } from "react-icons/ai";
import { BsCameraVideoFill, BsFillCpuFill } from "react-icons/bs";
import { FaMemory } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineStorage,
  MdMap,
  MdScreenShare,
} from "react-icons/md";
import CardLayout from "../../layouts/CardLayout";
import ContentLoader from "react-content-loader";
import { BiJoystickButton } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";
import Button from "../Button/Button";

interface IRobotHeader {
  responseCurrentOrganization: any;
  responseCurrentRoboticsCloud: any;
  responseCurrentInstance: any;
  responseCurrentFleet: any;
  responseRobot: any;
  handleChangeActiveTab: any;
  activeTab: string;
}

export default function RobotHeader({
  responseCurrentOrganization,
  responseCurrentRoboticsCloud,
  responseCurrentInstance,
  responseCurrentFleet,
  responseRobot,
  handleChangeActiveTab,
  activeTab,
}: IRobotHeader): ReactElement {
  const url = useParams();

  const resources = {
    virtual: {
      cpu: `${responseCurrentInstance?.cloudInstanceResource?.cpuTotal} CPU`,
      gpu: "1T4 GPU",
      ram: `${responseCurrentInstance?.cloudInstanceResource?.memoryTotal} GB`,
      storage: `${responseRobot?.storageAmount} GB`,
    },
    physical: {
      cpu: "Null",
      gpu: "Null",
      ram: "Null",
      storage: "Null",
    },
  };

  const tabs = [
    {
      name: "Overview",
      icon: <MdDashboard size={14} />,
      state: true,
    },
    {
      name: "Task Management",
      icon: <MdMap size={14} />,
      state: responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
      hidden: true,
    },
    {
      name: "Teleoperation",
      icon: <BiJoystickButton size={14} />,
      state: responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
    },
    {
      name: "Visualization",
      icon: <BsCameraVideoFill size={14} />,
      state: responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
    },
    {
      name: "Development Suite",
      icon: <RxDashboard size={14} />,
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
      icon: <AiFillCode size={14} />,
      state: responseRobot?.ideIngressEndpoint ? true : false,
      disabled: responseRobot?.ideIngressEndpoint ? false : true,
    },
    {
      name: "Remote Desktop",
      icon: <MdScreenShare size={14} />,
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
                <div className="flex  items-center rounded-lg ">
                  {/* <span>Code Editor</span>
                  <InputToggle
                    disabled
                    icons={false}
                    checked={responseRobot?.ideIngressEndpoint}
                    onChange={() => {
                      handleSwitchToggle({
                        vdi: responseRobot?.vdiIngressEndpoint,
                        ide: !responseRobot?.ideIngressEndpoint,
                        bridge: responseRobot?.bridgeIngressEndpoint,
                      });
                    }}
                  /> */}

                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={responseRobot?.ideIngressEndpoint}
                  >
                    <Button
                      text={"Code Editor"}
                      className="!h-9 text-xs px-4"
                    />
                  </a>
                </div>
                {/* <div className="flex  items-center rounded-lg p-2">
                  <span>ROS2 Bridge</span>
                  <InputToggle
                    disabled
                    icons={false}
                    checked={responseRobot?.bridgeIngressEndpoint}
                    onChange={() => {
                      handleSwitchToggle({
                        vdi: responseRobot?.vdiIngressEndpoint,
                        ide: responseRobot?.ideIngressEndpoint,
                        bridge: !responseRobot?.bridgeIngressEndpoint,
                      });
                    }}
                  />
                </div> */}
                <div className="flex  items-center rounded-lg p-2">
                  {/* <span>Remote Desktop</span>
                  <InputToggle
                    disabled
                    icons={false}
                    checked={responseRobot?.vdiIngressEndpoint}
                    onChange={() => {
                      handleSwitchToggle({
                        vdi: !responseRobot?.vdiIngressEndpoint,
                        ide: responseRobot?.ideIngressEndpoint,
                        bridge: responseRobot?.bridgeIngressEndpoint,
                      });
                    }}
                  /> */}

                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={`https://${
                      responseRobot?.vdiIngressEndpoint.split("//")[1]
                    }`}
                  >
                    <Button
                      text={"Remote Desktop"}
                      className="!h-9 text-xs px-4"
                    />
                  </a>
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
                      {resources?.virtual?.cpu || (
                        <ContentLoader
                          speed={1}
                          width={92}
                          height={12}
                          backgroundColor="#f6f6ef"
                          foregroundColor="#e8e8e3"
                        >
                          <rect width="92" height="12" />
                        </ContentLoader>
                      )}
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
        <ul className="flex gap-6 px-6 pt-5 overflow-x-auto items-end">
          {tabs.map((tab: any, index: number) => {
            return (
              <li
                className={`flex flex-col gap-3 ${
                  tab?.disabled ? "cursor-not-allowed" : "cursor-pointer"
                } ${tab?.hidden && "!hidden"}`}
                onClick={() =>
                  tab?.state &&
                  !tab?.disabled &&
                  handleChangeActiveTab(tab.name)
                }
                key={index}
              >
                <div
                  className={`flex gap-1 items-center text-xs font-medium px-2 transition-all duration-500 min-w-max ${
                    !tab?.disabled && "hover:scale-90"
                  }  ${
                    tab.name === activeTab
                      ? "text-layer-primary-500"
                      : "text-layer-light-500"
                  } `}
                >
                  {!responseRobot ? (
                    <ContentLoader
                      speed={1}
                      width={92}
                      height={12}
                      backgroundColor="#f6f6ef"
                      foregroundColor="#e8e8e3"
                    >
                      <rect width="92" height="12" />
                    </ContentLoader>
                  ) : (
                    <Fragment>
                      {tab?.icon}
                      <span>{tab.name}</span>
                    </Fragment>
                  )}
                </div>
                <div
                  className={`w-full h-[2px] transition-all duration-500 
                  ${
                    tab.name === activeTab
                      ? "bg-layer-primary-500"
                      : "bg-layer-light-100"
                  } `}
                />
              </li>
            );
          })}
        </ul>
      </Fragment>
    </CardLayout>
  );
}
