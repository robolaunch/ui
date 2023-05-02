export interface ISidebarState {
  isOpen: boolean;
  isCreateMode: boolean;
  page:
    | "organization"
    | "roboticsCloud"
    | "fleet"
    | "robot"
    | "workspacesmanager"
    | "buildsmanager"
    | undefined;
}

export interface ISelectedState {
  organization: string | null;
  roboticsCloud: string | null;
  fleet: string | null;
}
