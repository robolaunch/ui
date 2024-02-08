import { RobotContext } from "../contexts/RobotContext";
import { useContext } from "react";
import { IuseRobot } from "../interfaces/hook/robot.hook.interface";

const useRobot = () => {
  const useRobot: IuseRobot = useContext(RobotContext);

  return useRobot;
};

export default useRobot;
