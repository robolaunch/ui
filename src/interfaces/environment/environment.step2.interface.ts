export interface IEnvironmentStep2 {
  configureWorkspace: boolean;
  workspaces: IEnvironmentStep2Workspace[];
}

export interface IEnvironmentStep2Workspace {
  name: string;
  workspaceDistro: "IRON" | "HUMBLE" | "GALACTIC" | "FOXY" | "";
  robotRepositories: IEnvironmentStep2WorkspaceRepository[];
}

export interface IEnvironmentStep2WorkspaceRepository {
  name: string;
  url: string;
  branch: string;
}
