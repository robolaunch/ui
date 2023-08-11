import { useContext } from "react";
import { RobotContext } from "../contexts/RobotContext";

interface IuseRobot {
  activeTab: string;
  setActiveTab: any;
  responseRobot: any;
  responseBuildManager: any;
  responseLaunchManagers: any;
  ros: any;
  setRos: any;
  topicList: any;
  setTopicList: any;
  isSettedCookie: boolean | null;
  setIsSettedCookie: any;
}

const useRobot = () => {
  const useRobot: IuseRobot = useContext(RobotContext);

  return useRobot;
};

export default useRobot;
