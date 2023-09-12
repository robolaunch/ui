import { useContext } from "react";
import { RobotContext } from "../contexts/RobotContext";

interface IuseRobot {
  activeTab: string;
  setActiveTab: any;
  responseRobot: any;
  responseBuildManager: any;
  responseLaunchManagers: any;
  isRobotReady: boolean;
  ros: any;
  setRos: any;
  topicList: any;
  setTopicList: any;
  isSettedCookie: boolean | null;
  setIsSettedCookie: any;
  adrinState: any;
  setAdrinState: any;
  handleForceUpdate: any;
  handleResetRobot: () => void;
}

const useRobot = () => {
  const useRobot: IuseRobot = useContext(RobotContext);

  return useRobot;
};

export default useRobot;
