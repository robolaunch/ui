import React, { Fragment, ReactElement } from "react";
import InputToggle from "../InputToggle/InputToggle";
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
import { useAppDispatch } from "../../hooks/redux";
import { createRobot } from "../../resources/RobotSlice";
import { SiKubernetes } from "react-icons/si";
import { BiJoystickButton } from "react-icons/bi";
import { RxDashboard } from "react-icons/rx";

interface IRobotHeader {
  responseCurrentOrganization: any;
  responseCurrentRoboticsCloud: any;
  responseCurrentInstance: any;
  responseCurrentFleet: any;
  responseRobot: any;
  handleChangeActiveTab: any;
  activeTab: string;
  handleSetCookies: () => void;
}

export default function RobotHeader({
  responseCurrentOrganization,
  responseCurrentRoboticsCloud,
  responseCurrentInstance,
  responseCurrentFleet,
  responseRobot,
  handleChangeActiveTab,
  activeTab,
  handleSetCookies,
}: IRobotHeader): ReactElement {
  const dispatch = useAppDispatch();

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
      icon: <MdDashboard size={14} />,
      state: true,
    },
    {
      name: "K8S Resources",
      icon: <SiKubernetes size={14} />,
      state: responseRobot ? true : false,
    },
    {
      name: "Task Management",
      icon: <MdMap size={14} />,
      state: responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
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

  function handleSwitchToggle(data: {
    vdi: string | boolean;
    ide: string | boolean;
    bridge: string | boolean;
  }) {
    dispatch(
      createRobot({
        organizationId: responseCurrentOrganization?.organizationId,
        roboticsCloudName: responseCurrentRoboticsCloud?.name,
        instanceId: responseCurrentInstance?.instanceId,
        region: responseCurrentRoboticsCloud?.region,
        robotName: responseRobot?.name,
        fleetName: responseCurrentFleet?.name,
        physicalInstanceName: responseRobot?.physicalInstanceName,
        distributions: responseRobot?.distributions,
        bridgeEnabled: data.bridge ? true : false,
        ideEnabled: data.ide ? true : false,
        vdiEnabled: data.vdi ? true : false,
        vdiSessionCount: responseRobot?.vdiSessionCount,
        storageAmount: responseRobot?.storageAmount,
        gpuEnabledForCloudInstance: responseRobot?.gpuEnabledForCloudInstance,
        workspaces: responseRobot?.robotWorkspaces,
      })
    ).then(() => {
      window.location.reload();
    });
  }

  return (
    <CardLayout className="pt-6 px-8 !pb-0">
      <Fragment>
        <div className="h-28 flex items-center justify-between">
          <div className="h-full flex flex-col justify-around">
            {responseRobot?.ideIngressEndpoint && (
              <iframe
                title="gg"
                className="hidden"
                src={responseRobot?.ideIngressEndpoint}
                onLoad={() => {
                  handleSetCookies();
                }}
              />
            )}
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
                    checked={responseRobot?.ideIngressEndpoint}
                    onChange={() => {
                      handleSwitchToggle({
                        vdi: responseRobot?.vdiIngressEndpoint,
                        ide: !responseRobot?.ideIngressEndpoint,
                        bridge: responseRobot?.bridgeIngressEndpoint,
                      });
                    }}
                  />
                </div>
                <div className="flex  items-center rounded-lg p-2">
                  <span>ROS2 Bridge</span>
                  <InputToggle
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
                </div>
                <div className="flex  items-center rounded-lg p-2">
                  <span>Remote Desktop</span>
                  <InputToggle
                    icons={false}
                    checked={responseRobot?.vdiIngressEndpoint}
                    onChange={() => {
                      handleSwitchToggle({
                        vdi: !responseRobot?.vdiIngressEndpoint,
                        ide: responseRobot?.ideIngressEndpoint,
                        bridge: responseRobot?.bridgeIngressEndpoint,
                      });
                    }}
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
        <ul className="flex gap-6 px-6 pt-5 overflow-x-auto items-end">
          {tabs.map((tab: any, index: number) => {
            return (
              <li
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
