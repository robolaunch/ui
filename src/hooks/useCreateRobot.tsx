import { useContext } from "react";
import { CreateRobotContext } from "../contexts/CreateRobotContext";
import { IuseCreateRobot } from "../interfaces/robotInterfaces";

const useCreateRobot = () => {
  const useCreateRobot: IuseCreateRobot = useContext(CreateRobotContext);

  return useCreateRobot;
};

export default useCreateRobot;
