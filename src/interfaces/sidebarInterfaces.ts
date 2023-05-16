export interface ISidebarState {
  isOpen: boolean;
  isCreateMode: boolean;
  page:
    | "organization"
    | "roboticscloud"
    | "fleet"
    | "robot"
    | "workspacesmanager"
    | "buildsmanager"
    | undefined;
}

export interface ISelectedState {
  organization: any;
  roboticsCloud: any;
  fleet: any;
}

export interface IuseSidebar {
  sidebarState: ISidebarState;
  setSidebarState: React.Dispatch<React.SetStateAction<ISidebarState>>;
  selectedState: ISelectedState;
  setSelectedState: React.Dispatch<React.SetStateAction<ISelectedState>>;
  handleCreateRobotPreviousStep: () => void;
  handleCreateRobotNextStep: () => void;
}
