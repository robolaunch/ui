import React, { Fragment, ReactElement } from "react";
import { useParams } from "react-router-dom";
import { IoLocationOutline } from "react-icons/io5";
import { AiFillCode, AiOutlineTeam } from "react-icons/ai";
import { BsCameraVideoFill } from "react-icons/bs";
import { MdDashboard, MdMap, MdScreenShare } from "react-icons/md";
import CardLayout from "../../layouts/CardLayout";
import ContentLoader from "react-content-loader";
import { BiJoystickButton } from "react-icons/bi";
import Button from "../Button/Button";
import RobotResource from "../RobotResource/RobotResource";
import RobotConnectionsViewer from "../RobotConnectionsViewer/RobotConnectionsViewer";

interface IRobotHeader {
  responseRobot: any;
  isSettedCookie: boolean | null;
  handleChangeActiveTab: any;
  activeTab: string;
  ros: any;
}

export default function RobotHeader({
  responseRobot,
  isSettedCookie,
  handleChangeActiveTab,
  activeTab,
  ros,
}: IRobotHeader): ReactElement {
  const url = useParams();

  const tabs = [
    {
      name: "Overview",
      icon: <MdDashboard size={14} />,
      state: true,
    },
    {
      name: "Task Management",
      icon: <MdMap size={14} />,
      state:
        isSettedCookie && responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
    },
    {
      name: "Teleoperation",
      icon: <BiJoystickButton size={14} />,
      state:
        isSettedCookie && responseRobot?.bridgeIngressEndpoint ? true : false,
      disabled: responseRobot?.bridgeIngressEndpoint ? false : true,
    },
    {
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
    <CardLayout className="pt-6 px-8 !pb-0">
      <Fragment>
        <div className="h-28 flex items-center justify-between">
          <div className="h-full flex flex-col justify-around">
            <div className="flex gap-2 items-center">
              <span className="text-lg font-medium">{url?.robotName}</span>

              <div
                className={`text-[0.64rem] capitalize font-medium px-3 py-1 rounded-lg w-fit text-layer-primary-500 bg-layer-primary-100`}
              >
                {responseRobot?.robotClusters?.length === 1
                  ? "Virtual Robot"
                  : (responseRobot?.robotClusters?.length === 2 &&
                      "Physical Robot") || (
                      <ContentLoader
                        speed={1}
                        width={64}
                        height={18}
                        backgroundColor="#f5e5ff"
                        foregroundColor="#fbf4ff"
                      >
                        <rect width="64" height="18" />
                      </ContentLoader>
                    )}
              </div>
            </div>
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

          <div className="hidden md:flex text-xs font-medium text-layer-dark-400 gap-8">
            <div className="h-full flex flex-col items-end gap-4">
              <div className="flex gap-2">
                <div className="flex  items-center rounded-lg">
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
                <div className="flex items-center rounded-lg p-2">
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
              <RobotConnectionsViewer
                ide={isSettedCookie}
                vdiURL={responseRobot?.vdiIngressEndpoint}
                ros={ros}
              />
              <RobotResource responseRobot={responseRobot} />
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
                  {!isSettedCookie ? (
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
