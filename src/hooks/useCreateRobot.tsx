import { useContext } from "react";
import { CreateRobotContext } from "../contexts/CreateRobotContext";
import { IuseCreateRobot } from "../interfaces/hook/createrobot.hook.interface";

const useCreateRobot = () => {
  const useCreateRobot: IuseCreateRobot = useContext(CreateRobotContext);

  return useCreateRobot;
};

export default useCreateRobot;
