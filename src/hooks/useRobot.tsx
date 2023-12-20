import { RobotContext } from "../contexts/RobotContext";
import { useContext } from "react";

interface IuseRobot {
  activeTab: string;
  setActiveTab: any;
  responseRobot: any;
  responseBuildManager: any;
  responseLaunchManagers: any;
  isRobotReady: boolean;
  iFrameId: number;
  ros: any;
  setRos: any;
  topicList: any;
  setTopicList: any;
  isSettedCookie: boolean | null;
  setIsSettedCookie: any;
  isRosConnected: boolean | null;
  setIsRosConnected: any;
  isVDIConnected: boolean | null;
  setIsVDIConnected: any;
  handleForceUpdate: any;
  handleResetRobot: () => void;
}

const useRobot = () => {
  const useRobot: IuseRobot = useContext(RobotContext);

  return useRobot;
};

export default useRobot;
