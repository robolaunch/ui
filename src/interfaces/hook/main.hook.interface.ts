import {
  ISelectedState,
  ISidebarState,
  IpagesState,
} from "../context/main.context.interface";

export interface IuseMain {
  applicationMode: boolean;
  trialState: any;
  setTrialState: React.Dispatch<React.SetStateAction<any>>;
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
}
