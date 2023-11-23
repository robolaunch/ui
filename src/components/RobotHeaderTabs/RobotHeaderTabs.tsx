import { MdDashboard, MdMap, MdScreenShare } from "react-icons/md";
import RobotHeaderTab from "../RobotHeaderTab/RobotHeaderTab";
import { IrobotTab } from "../../interfaces/robotInterfaces";
import { envApplication } from "../../helpers/envProvider";
import { BsCameraVideoFill } from "react-icons/bs";
import { BiJoystickButton } from "react-icons/bi";
import { BiSolidFolder } from "react-icons/bi";
import { AiFillCode } from "react-icons/ai";
import useRobot from "../../hooks/useRobot";
import { ReactElement } from "react";

export default function RobotHeaderTabs(): ReactElement {
  const { responseRobot, isSettedCookie, isRobotReady } = useRobot();

  const tabs: IrobotTab[] = [
    {
      name: "Overview",
      icon: <MdDashboard size={16} />,
      isLoading: false,
      isHidden: false,
    },
    {
      name: "Task Management",
      icon: <MdMap size={16} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.bridgeEnabled &&
          responseRobot?.bridgeIngressEndpoint &&
          isSettedCookie
        ),
      isHidden:
        envApplication || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Teleoperation",
      icon: <BiJoystickButton size={16} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.bridgeEnabled &&
          responseRobot?.bridgeIngressEndpoint &&
          isSettedCookie
        ),
      isHidden:
        envApplication || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Visualization",
      icon: <BsCameraVideoFill size={16} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.bridgeEnabled &&
          responseRobot?.bridgeIngressEndpoint &&
          isSettedCookie
        ),
      isHidden:
        envApplication || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Code Editor",
      icon: <AiFillCode size={16} />,
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
      icon: <AiFillCode size={16} />,
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
      icon: <MdScreenShare size={16} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.vdiEnabled &&
          responseRobot?.vdiIngressEndpoint &&
          isSettedCookie
        ),
      isHidden: false,
    },
    {
      name: "File Manager",
      icon: <BiSolidFolder size={16} />,
      isLoading:
        !responseRobot ||
        !(
          responseRobot?.ideEnabled &&
          responseRobot?.ideIngressEndpoint &&
          isSettedCookie
        ),
      isHidden: false,
    },
  ];

  return (
    <ul
      data-tut="robot-header-tabs"
      className="flex items-end gap-6 overflow-x-auto px-6 pt-4"
    >
      {tabs
        ?.filter((tab: IrobotTab) => tab && tab)
        .map((tab: IrobotTab, index: number) => {
          return <RobotHeaderTab tab={tab} key={index} />;
        })}
    </ul>
  );
}
