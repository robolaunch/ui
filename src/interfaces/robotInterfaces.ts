import { ReactElement } from "react";
import { IEnvironment } from "./environment/environment.interface";

export interface IcreateRobotRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  robotName: string;
  fleetName: string;
  workspaceUpdated?: boolean;
  physicalInstanceName?: string;
  distributions: string[];
  bridgeEnabled: boolean;
  vdiEnabled: boolean;
  vdiSessionCount: number;
  ideEnabled: boolean;
  storageAmount: number;
  gpuEnabledForCloudInstance: boolean;
  marketPlaceEnabled?: boolean;
  imageUser?: string;
  imageRepository?: string;
  imageTag?: string;
  workspaces: IWorkspace[];
  permittedDirectories: string;
  persistentDirectories: string;
  hostDirectories: string;
  ideCustomPorts: string;
  vdiCustomPorts: string;
}

export interface IgetRobotsRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
}

export interface IgetRobotRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  robotName: string;
}

export interface IdeleteRobotRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  robotName: string;
}

export interface IcreateBuildManagerRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  robotName: string;
  fleetName: string;
  physicalInstanceName: string;
  buildManagerName: string;
  robotBuildSteps: any;
}

export interface IgetBuildManagersRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  robotName: string;
}

export interface IgetBuildManagerRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  robotName: string;
  buildManagerName: string;
}

export interface IdeleteBuildManagerRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  robotName: string;
  fleetName: string;
  physicalInstanceName: string;
}

export interface IcreateLaunchManagerRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  robotName: string;
  fleetName: string;
  physicalInstanceName: string;
  launchManagerName: string;
  robotLaunchSteps: any;
}

export interface IgetLaunchManagersRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  robotName: string;
}

export interface IgetLaunchManagerRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  robotName: string;
  buildManagerName: string;
}

export interface IdeleteLaunchManagerRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  robotName: string;
  fleetName: string;
  physicalInstanceName: string;
  launchManagerName: string;
}

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

export interface IuseCreateRobot {
  robotData: IEnvironment;
  setRobotData: React.Dispatch<React.SetStateAction<IEnvironment>>;
  handleResetRobotForm: () => void;
  handleAddWorkspaceStep: (formik: any) => void;
  handleRemoveWorkspaceStep: (formik: any, workspaceIndex: number) => void;
  handleAddRepositoryToWorkspaceStep: (
    formik: any,
    workspaceIndex: number,
  ) => void;
  handleAddLaunchManager: () => void;
  handleRemoveRepositoryFromWorkspaceStep: (
    formik: any,
    workspaceIndex: number,
    repositoryIndex: number,
  ) => void;
  handleAddBuildStep: (formik: any) => void;
  handleRemoveStepFromBuildStep: (formik: any, buildStepIndex: number) => void;
  handleAddENVToLaunchStep: (formik: any) => void;
  handleRemoveENVFromLaunchStep: (formik: any, index: number) => void;
  handleAddStepToLaunchStep: (formik: any) => void;
  handleRemoveStepFromLaunchStep: (
    formik: any,
    launchStepIndex: number,
  ) => void;
}
