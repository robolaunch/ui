import {
  ISelectedState,
  ISidebarState,
  IpagesState,
} from "../context/main.context.interface";
import { IEnvironment } from "../environment/environment.interface";

export interface IuseMain {
  applicationMode: boolean;
  itemCount: number;
  setItemCount: React.Dispatch<React.SetStateAction<number>>;
  pagesState: IpagesState;
  setPagesState: React.Dispatch<React.SetStateAction<IpagesState>>;
  sidebarState: ISidebarState;
  setSidebarState: React.Dispatch<React.SetStateAction<ISidebarState>>;
  selectedState: ISelectedState;
  setSelectedState: React.Dispatch<React.SetStateAction<ISelectedState>>;
  handleCreateRobotPreviousStep: () => void;
  handleCreateRobotNextStep: () => void;
  robotData: IEnvironment;
  setRobotData: React.Dispatch<React.SetStateAction<IEnvironment>>;
  handleResetRobotForm: () => void;
  handleAddLaunchManager: () => void;
}
