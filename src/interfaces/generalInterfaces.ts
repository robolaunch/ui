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
  organization: any;
  roboticsCloud: any;
  instance: any;
  fleet: any;
}

export interface IpagesState {
  organization: any;
  roboticsCloud: any;
  instance: any;
  fleet: any;
}

export interface IuseGeneral {
  pagesState: IpagesState;
  setPagesState: React.Dispatch<React.SetStateAction<IpagesState>>;
  sidebarState: ISidebarState;
  setSidebarState: React.Dispatch<React.SetStateAction<ISidebarState>>;
  selectedState: ISelectedState;
  setSelectedState: React.Dispatch<React.SetStateAction<ISelectedState>>;
  handleCreateRobotPreviousStep: () => void;
  handleCreateRobotNextStep: () => void;
}
