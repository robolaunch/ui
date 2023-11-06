import { MdDashboard, MdMap, MdScreenShare } from "react-icons/md";
import { stringSlugify } from "../../functions/GeneralFunctions";
import { envOnPremiseRobot } from "../../helpers/envProvider";
import React, { Fragment, ReactElement } from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { BiJoystickButton } from "react-icons/bi";
import ContentLoader from "react-content-loader";
import { AiFillCode } from "react-icons/ai";
import useRobot from "../../hooks/useRobot";

export default function RobotHeaderTabs(): ReactElement {
  const { responseRobot, activeTab, setActiveTab } = useRobot();

  const tabs = [
    {
      name: "Overview",
      icon: <MdDashboard size={14} />,
      isHidden: false,
    },
    {
      name: "Task Management",
      icon: <MdMap size={14} />,
      isHidden:
        envOnPremiseRobot || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Teleoperation",
      icon: <BiJoystickButton size={14} />,
      isHidden:
        envOnPremiseRobot || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Visualization",
      icon: <BsCameraVideoFill size={14} />,
      isHidden:
        envOnPremiseRobot || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Code Editor",
      icon: <AiFillCode size={14} />,
      isHidden: false,
    },
    {
      name: "Development Suite",
      icon: <AiFillCode size={14} />,
      isHidden: false,
    },
    {
      name: "Remote Desktop",
      icon: <MdScreenShare size={14} />,
      isHidden: false,
    },
  ];

  return (
    <ul
      data-tut="robot-header-tabs"
      className="flex items-end gap-6 overflow-x-auto pt-4"
    >
      {responseRobot ? (
        tabs
          .filter((tab: any) => tab && tab)
          .map((tab: any, index: number) => (
            <li
              data-tut={`robot-header-tab-${stringSlugify(tab?.name)}`}
              className={`flex cursor-pointer flex-col gap-3 ${
                tab?.isHidden && "!hidden"
              }`}
              onClick={() =>
                !tab?.isLoading && !tab?.isHidden && setActiveTab(tab.name)
              }
              key={index}
            >
              <div
                className={`flex min-w-max items-center gap-1 px-2 text-xs font-medium transition-all duration-500  ${
                  tab.name === activeTab
                    ? "text-layer-primary-500"
                    : "text-layer-light-500"
                }`}
              >
                <Fragment>
                  {tab?.icon}
                  <span>{tab.name}</span>
                </Fragment>
              </div>
              <div
                className={`h-[2px] w-full transition-all duration-500 
                  ${
                    tab.name === activeTab
                      ? "bg-layer-primary-500"
                      : "bg-layer-light-100"
                  } `}
              />
            </li>
          ))
      ) : (
        <ContentLoader
          speed={1}
          width={92}
          height={12}
          backgroundColor="#f6f6ef"
          foregroundColor="#e8e8e3"
        >
          <rect width="100%" height="12" />
        </ContentLoader>
      )}
    </ul>
  );
}
