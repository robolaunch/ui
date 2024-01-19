import { MdDashboard, MdMap, MdScreenShare } from "react-icons/md";
import RobotHeaderTab from "../RobotHeaderTab/RobotHeaderTab";
import { IrobotTab } from "../../interfaces/robotInterfaces";
import { AiFillCode, AiFillLayout } from "react-icons/ai";
import { BiSolidJoystickButton } from "react-icons/bi";
import { BsCameraVideoFill } from "react-icons/bs";
import useRobot from "../../hooks/useRobot";
import { ReactElement } from "react";
import { FaPython } from "react-icons/fa";
import useCreateRobot from "../../hooks/useCreateRobot";
import { useAppSelector } from "../../hooks/redux";

export default function EnvironmentHeaderTabs(): ReactElement {
  const { responseRobot, isSettedCookie, isRobotReady } = useRobot();
  const { applicationMode } = useAppSelector((state) => state.user);

  const { robotData } = useCreateRobot();

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
          robotData.step1.services.ros.isEnabled &&
          robotData.step1.services.ros.socketEndpoint &&
          isSettedCookie
        ),
      isHidden:
        applicationMode || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Teleoperation",
      icon: <BiSolidJoystickButton size={16} />,
      isLoading:
        !responseRobot ||
        !(
          robotData.step1.services.ros.isEnabled &&
          robotData.step1.services.ros.socketEndpoint &&
          isSettedCookie
        ),
      isHidden:
        applicationMode || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Visualization",
      icon: <BsCameraVideoFill size={16} />,
      isLoading:
        !responseRobot ||
        !(
          robotData.step1.services.ros.isEnabled &&
          robotData.step1.services.ros.socketEndpoint &&
          isSettedCookie
        ),
      isHidden:
        applicationMode || (responseRobot && !responseRobot?.bridgeEnabled),
    },
    {
      name: "Development Suite",
      icon: <AiFillLayout size={16} />,
      isLoading:
        !responseRobot ||
        !(
          robotData.step1.services.ide.isEnabled &&
          robotData.step1.services.ide.httpsEndpoint &&
          robotData.step1.services.vdi.isEnabled &&
          robotData.step1.services.vdi.socketEndpoint &&
          isSettedCookie
        ) ||
        !isRobotReady,

      isHidden: false,
    },
    {
      name: "Code Editor",
      icon: <AiFillCode size={16} />,
      isLoading:
        !responseRobot ||
        !(
          robotData.step1.services.ide.isEnabled &&
          robotData.step1.services.ide.httpsEndpoint &&
          isSettedCookie
        ),
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
      name: "Jupyter Notebook",
      icon: <FaPython size={16} />,
      isLoading:
        !responseRobot ||
        !(
          robotData?.step1.services.jupyterNotebook?.isEnabled &&
          robotData?.step1.services.jupyterNotebook?.httpsEndpoint &&
          isSettedCookie
        ),
      isHidden: !robotData?.step1.services.jupyterNotebook?.isEnabled,
    },
  ];

  return (
    <ul
      data-tut="robot-header-tabs"
      className="flex items-end gap-6 overflow-x-auto px-6 pt-4"
    >
      {tabs.map((tab: IrobotTab, index: number) => {
        return <RobotHeaderTab tab={tab} key={index} />;
      })}
    </ul>
  );
}