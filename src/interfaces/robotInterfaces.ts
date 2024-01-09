import { ReactElement } from "react";

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

export interface IRobotData {
  step1: IDetails;
  step2: IWorkspaces;
  step3: IBuildSteps;
  step4: ILaunchSteps;
}

export interface IDetails {
  details: {
    name: string;
    isVirtualRobot: boolean;
    configureWorkspace: boolean;
    isDevelopmentMode: boolean;
  };
  tree: {
    organization: {
      id: string;
      name: string;
    };
    region: {
      name: string;
    };
    cloudInstance: {
      name: string;
      id: string;
      resources: {
        cpu: {
          coreTotal: number;
        };
        gpu: {
          coreTotal: number;
        };
        memory: {
          capacityTotal: number;
        };
        storage: {
          capacityTotal: number;
        };
      };
    };
    physicalInstance: {
      name: string;
    };
    namespace: {
      name: string;
    };
  };
  resources: {
    cpu: {
      allocatedCore: number;
    };
    gpu: {
      enabledForCloudInstance: boolean;
      allocatedCore: number;
    };
    memory: {
      allocatedCapacity: number;
    };
    storage: {
      allocatedCapacity: number;
    };
  };
  services: {
    ros: {
      isEnabled: boolean;
      rosDistros: any[];
      socketEndpoint: string;
      podName: string;
      log: string;
    };
    vdi: {
      isEnabled: boolean;
      socketEndpoint: string;
      fileManagerEndpoint: string;
      customPorts: any[];
      gpuAllocation: number;
      podName: string;
      sessionCount: number;
      log: string;
    };
    ide: {
      isEnabled: boolean;
      httpsEndpoint: string;
      fileManagerEndpoint: string;
      customPorts: any[];
      gpuAllocation: number;
      maxGpuAllocation: number;
      gpuModelName: string;
      podName: string;
      log: string;
    };
    physicalIde: {
      isEnabled: boolean;
      httpsEndpoint: string;
    };
    jupyterNotebook: {
      isEnabled: boolean;
      httpsEndpoint: string;
      fileManagerEndpoint: string;
      customPorts: any[];
      gpuAllocation: number;
      podName: string;
      log: string;
    };
  };
  directories: {
    permittedDirectories: string;
    persistentDirectories: string;
    hostDirectories: IhostDirectories[];
  };
  applicationConfig: {
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
  };
  clusters: {
    environment: IEnvironmentCluster[];
    build: any[];
    launch: any[];
  };
}

export interface IEnvironmentCluster {
  name: string;
  status: string;
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
