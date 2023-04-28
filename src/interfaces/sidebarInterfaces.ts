export interface ISidebarState {
  isOpen: boolean;
  isCreateMode: boolean;
  page: "organization" | "roboticsCloud" | "robot";
  currentCreateRobotStep: number;
}

export interface ISelectedState {
  organization: string | null;
  roboticsCloud: string | null;
  fleet: string | null;
}
