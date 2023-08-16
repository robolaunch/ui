import React, { Fragment, ReactElement } from "react";
import { envOnPremise } from "../../helpers/envProvider";
import { MdDashboard, MdMap, MdScreenShare } from "react-icons/md";
import { BiJoystickButton } from "react-icons/bi";
import { BsCameraVideoFill } from "react-icons/bs";
import { AiFillCode } from "react-icons/ai";
import ContentLoader from "react-content-loader";

interface IRobotHeaderTabs {
  responseRobot: any;
  isSettedCookie: boolean | null;
  handleChangeActiveTab: any;
  activeTab: string;
}

export default function RobotHeaderTabs({
  responseRobot,
  isSettedCookie,
  handleChangeActiveTab,
  activeTab,
}: IRobotHeaderTabs): ReactElement {
  const tabs = [
    {
      name: "Overview",
      icon: <MdDashboard size={14} />,
      state: true,
    },

    !envOnPremise &&
      false && {
        name: "Task Management",
        icon: <MdMap size={14} />,
        state:
          isSettedCookie && responseRobot?.bridgeIngressEndpoint ? true : false,
        disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
      },

    !envOnPremise && {
      name: "Teleoperation",
      icon: <BiJoystickButton size={14} />,
      state:
        isSettedCookie && responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
    },

    !envOnPremise && {
      name: "Visualization",
      icon: <BsCameraVideoFill size={14} />,
      state:
        isSettedCookie && responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
    },

    {
      name: "Code Editor",
      icon: <AiFillCode size={14} />,
      state: isSettedCookie && responseRobot?.ideIngressEndpoint ? true : false,
      disabled: responseRobot?.ideIngressEndpoint ? false : true,
    },

    {
      name: "Development Suite",
      icon: <AiFillCode size={14} />,
      state: isSettedCookie && responseRobot?.ideIngressEndpoint ? true : false,
      disabled: responseRobot?.ideIngressEndpoint ? false : true,
    },

    {
      name: "Remote Desktop",
      icon: <MdScreenShare size={14} />,
      state: isSettedCookie && responseRobot?.vdiIngressEndpoint ? true : false,
      disabled: responseRobot?.vdiIngressEndpoint ? false : true,
    },
  ];

  return (
    <ul className="flex gap-6 px-6 pt-5 overflow-x-auto items-end">
      {tabs
        ?.filter((tab: any) => tab && tab)
        .map((tab: any, index: number) => {
          return (
            <li
              className={`flex flex-col gap-3 ${
                tab?.disabled ? "cursor-not-allowed" : "cursor-pointer"
              } ${tab?.hidden && "!hidden"}`}
              onClick={() =>
                tab?.state && !tab?.disabled && handleChangeActiveTab(tab.name)
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
                {responseRobot &&
                Array.isArray(responseRobot?.robotClusters) &&
                responseRobot?.robotClusters?.filter(
                  (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                )?.length ? (
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
  );
}
