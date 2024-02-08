import { IEnvironment } from "../environment/environment.interface";

export interface IuseCreateRobot {
  robotData: IEnvironment;
  setRobotData: React.Dispatch<React.SetStateAction<IEnvironment>>;
  handleResetRobotForm: () => void;
  handleAddLaunchManager: () => void;
}
