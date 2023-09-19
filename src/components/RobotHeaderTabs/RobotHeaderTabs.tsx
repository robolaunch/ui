import React, { Fragment, ReactElement } from "react";
import { MdDashboard, MdMap, MdScreenShare } from "react-icons/md";
import { envOnPremiseRobot } from "../../helpers/envProvider";
import { BsCameraVideoFill } from "react-icons/bs";
import { BiJoystickButton } from "react-icons/bi";
import ContentLoader from "react-content-loader";
import { AiFillCode } from "react-icons/ai";
import useRobot from "../../hooks/useRobot";
import { stringSlugify } from "../../functions/GeneralFunctions";

export default function RobotHeaderTabs(): ReactElement {
  const {
    responseRobot,
    activeTab,
    isSettedCookie,
    setActiveTab,
    isRobotReady,
  } = useRobot();

  const tabs = [
    {
      name: "Overview",
      icon: <MdDashboard size={14} />,
      isLoading: false,
      isHidden: false,
    },
    {
      name: "Task Management",
      icon: <MdMap size={14} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.bridgeEnabled &&
          responseRobot?.bridgeIngressEndpoint &&
          isSettedCookie
        ),
      isHidden:
        envOnPremiseRobot || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Teleoperation",
      icon: <BiJoystickButton size={14} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.bridgeEnabled &&
          responseRobot?.bridgeIngressEndpoint &&
          isSettedCookie
        ),
      isHidden:
        envOnPremiseRobot || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Visualization",
      icon: <BsCameraVideoFill size={14} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.bridgeEnabled &&
          responseRobot?.bridgeIngressEndpoint &&
          isSettedCookie
        ),
      isHidden:
        envOnPremiseRobot || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Code Editor",
      icon: <AiFillCode size={14} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.ideEnabled &&
          responseRobot?.ideIngressEndpoint &&
          isSettedCookie
        ),
      isHidden: false,
    },
    {
      name: "Development Suite",
      icon: <AiFillCode size={14} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.ideEnabled &&
          responseRobot?.ideIngressEndpoint &&
          responseRobot?.vdiEnabled &&
          responseRobot?.vdiIngressEndpoint &&
          isSettedCookie
        ) ||
        !isRobotReady,

      isHidden: false,
    },
    {
      name: "Remote Desktop",
      icon: <MdScreenShare size={14} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.vdiEnabled &&
          responseRobot?.vdiIngressEndpoint &&
          isSettedCookie
        ),
      isHidden: false,
    },
  ];

  return (
    <ul
      data-tut="robot-header-tabs"
      className="flex gap-6 px-6 pt-5 overflow-x-auto items-end"
    >
      {tabs
        ?.filter((tab: any) => tab && tab)
        .map((tab: any, index: number) => {
          return (
            <li
              data-tut={`robot-header-tab-${stringSlugify(tab?.name)}`}
              className={`flex flex-col gap-3 cursor-pointer ${
                tab?.isHidden && "!hidden"
              }`}
              onClick={() =>
                !tab?.isLoading && !tab?.isHidden && setActiveTab(tab.name)
              }
              key={index}
            >
              <div
                className={`flex gap-1 items-center text-xs font-medium px-2 transition-all duration-500 min-w-max  ${
                  tab.name === activeTab
                    ? "text-layer-primary-500"
                    : "text-layer-light-500"
                }`}
              >
                {tab?.isLoading || !isRobotReady ? (
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
