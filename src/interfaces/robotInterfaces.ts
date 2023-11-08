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

export interface IRobotData {
  step1: IDetails;
  step2: IWorkspaces;
  step3: IBuildSteps;
  step4: ILaunchSteps;
}

export interface IDetails {
  robotName: string;
  isVirtualRobot: boolean;
  physicalInstanceName: string;
  robotStorage: number;
  isEnabledIde: boolean;
  ideGpuResource: number;
  ideGpuResourceType: string;
  isEnabledROS2Bridge: boolean;
  configureWorkspace: boolean;
  remoteDesktop: {
    isEnabled: boolean;
    sessionCount: number;
  };
  rosDistros: string[];
  gpuEnabledForCloudInstance: boolean;
  isDevelopmentMode: boolean;
  domainName: string;
  application: {
    name: string;
    version: string;
  };
  devspace: {
    ubuntuDistro: string;
    desktop: string;
    version: string;
  };
  permittedDirectories: string;
  persistentDirectories: string;
  ideCustomPorts: any[];
  vdiCustomPorts: any[];
  hostDirectories: IhostDirectories[];
  idePodName: string;
  vdiPodName: string;
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
  buildManagerName: string;
  robotBuildSteps: IBuildStep[];
}
export interface IBuildStep {
  name: string;
  workspace: string;
  isCommandCode: boolean;
  command: string;
  script: string;
  instancesName: any[];
  robotClusters?: any;
  buildLog?: string;
  buildStatus?: string;
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

export interface IuseCreateRobot {
  robotData: IRobotData;
  setRobotData: React.Dispatch<React.SetStateAction<IRobotData>>;
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
  handleAddStepToBuildStep: (formik: any) => void;
  handleRemoveStepFromBuildStep: (formik: any, buildStepIndex: number) => void;
  handleAddENVToLaunchStep: (formik: any) => void;
  handleRemoveENVFromLaunchStep: (formik: any, index: number) => void;
  handleAddStepToLaunchStep: (formik: any) => void;
  handleRemoveStepFromLaunchStep: (
    formik: any,
    launchStepIndex: number,
  ) => void;
}
