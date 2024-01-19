import { IOrganization } from "./organizationInterfaces";
import { IInstance } from "./instanceInferfaces";
import { IRegion } from "./regionInterfaces";

export interface ISidebarState {
  isOpen: boolean;
  isCreateMode: boolean;
  page:
    | "organization"
    | "roboticscloud"
    | "instance"
    | "fleet"
    | "robot"
    | "workspacesmanager"
    | "buildsmanager"
    | "launchsmanager"
    | undefined;
  instanceTab: "Cloud Instances" | "Physical Instances";
}

export interface ISelectedState {
  organization: IOrganization | null;
  roboticsCloud: IRegion | null;
  instance: IInstance | null;
  fleet: any;
}

export interface IpagesState {
  organization: IOrganization | null;
  roboticsCloud: IRegion | null;
  instance: IInstance | null;
  fleet: any;
}

export interface IuseMain {
  applicationMode: boolean;
  trialState: any;
  setTrialState: React.Dispatch<React.SetStateAction<any>>;
  pagesState: IpagesState;
  setPagesState: React.Dispatch<React.SetStateAction<IpagesState>>;
  sidebarState: ISidebarState;
  setSidebarState: React.Dispatch<React.SetStateAction<ISidebarState>>;
  selectedState: ISelectedState;
  setSelectedState: React.Dispatch<React.SetStateAction<ISelectedState>>;
  handleCreateRobotPreviousStep: () => void;
  handleCreateRobotNextStep: () => void;
}
