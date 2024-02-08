import { ReactElement } from "react";

export interface IhostDirectories {
  hostDirectory: string;
  mountPath: string;
}
export interface IWorkspaces {
  configureWorkspace: boolean;
  workspaces: IWorkspace[];
}

export interface IWorkspace {
  name: string;
  workspaceDistro: "IRON" | "HUMBLE" | "GALACTIC" | "FOXY" | "";
  robotRepositories: IWorkspaceRepository[];
}

export interface IWorkspaceRepository {
  name: string;
  url: string;
  branch: string;
}

export interface IBuildSteps {
  name: string;
  steps: IBuildStep[];
}
export interface IBuildStep {
  workspace: string;
  name: string;
  command: string;
  script: string;
  isCommandCode: boolean;
  status: string;
  log: string;
  instanceScope: string[];
}

export interface ILaunchSteps {
  robotLaunchSteps: ILaunchStep[];
}

export interface ILaunchStep {
  name: string;
  workspace: string;
  entryPointType: string;
  entryPointCmd: string;
  instancesName: any[];
  robotLmEnvs: ILaunchENV[];
}

export interface ILaunchENV {
  name: string;
  value: string;
}

export type IrobotTab = {
  name:
    | "Overview"
    | "Teleoperation"
    | "Task Management"
    | "Visualization"
    | "Loading"
    | "Settings"
    | "Remote Desktop"
    | "Development Suite"
    | "Code Editor"
    | "File Manager"
    | "Jupyter Notebook";
  icon: ReactElement;
  isLoading: boolean;
  isHidden: boolean;
};
