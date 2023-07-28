import { useContext } from "react";
import { RobotContext } from "../contexts/RobotContext";
import { IuseRobot } from "../interfaces/robotInterfaces";

const useRobot = () => {
  const useRobot: IuseRobot = useContext(RobotContext);

  return useRobot;
};

export default useRobot;
