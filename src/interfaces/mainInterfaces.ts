import { IOrganization } from "./organization.interface";
import { IRegion } from "./region.interface";
import { INamespace } from "./namespace.interface";
import { IFleet } from "./fleet.interface";
import { ICloudInstance } from "./cloudInstance.interface";

export interface ISidebarState {
  isOpen: boolean;
  isCreateMode: boolean;
  page:
    | "organization"
    | "roboticscloud"
    | "instance"
    | "fleet"
    | "robot"
    | "importmanager"
    | "workspacesmanager"
    | "buildsmanager"
    | "launchsmanager"
    | undefined;
  instanceTab: "Cloud Instances" | "Physical Instances";
}

export interface ISelectedState {
  organization: IOrganization | null;
  roboticsCloud: IRegion | null;
  instance: ICloudInstance | null;
  fleet: INamespace | IFleet | null;
}

export interface IpagesState {
  organization: IOrganization | null;
  roboticsCloud: IRegion | null;
  instance: ICloudInstance | null;
  fleet: INamespace | IFleet | null;
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
