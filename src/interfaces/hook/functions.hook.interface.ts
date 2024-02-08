import { ICloudInstance } from "../global/cloudInstance.interface";
import { IEnvironmentStep1 } from "../environment/environment.step1.interface";
import { IEnvironmentStep2 } from "../environment/environment.step2.interface";
import {
  IcreateDataScienceAppsRequest,
  IdeleteDataScienceAppsRequest,
  IgetEnvironmentRequest,
  IsingleGetEnviromentParameters,
} from "../environmentInterfaces";
import { IFleet } from "../global/fleet.interface";
import { INamespace } from "../global/namespace.interface";
import { IOrganization } from "../global/organization.interface";
import { IRegion } from "../global/region.interface";
import { ISystemStatus } from "../global/system.interface";

export interface IsingleGetParameters {
  isSetState?: boolean;
  ifErrorNavigateTo404?: boolean;
  setResponse?: any;
  setPages?: boolean;
}

export interface ImultipleGetParameters {
  ifErrorNavigateTo404?: boolean;
  setResponse?: any;
  setFirstItemforTrial?: any;
  setItemCount?: any;
}

export interface IgetOrganization {
  organizationName: string;
}

export interface IgetRoboticsClouds {
  organizationId: string;
}
export interface IgetRoboticsCloud {
  organizationId: string;
  roboticsCloudName: string;
}

export interface IgetInstances {
  organizationId: string;
  roboticsCloudName: string;
  region: string;
  details: boolean;
}

export interface IgetPhysicalInstances {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
}

export interface IgetPhysicalInstance {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  physicalInstanceName: string;
  region: string;
}

export interface IgetInstance {
  organizationId: string;
  roboticsCloudName: string;
  instanceName: string;
  region: string;
  details: boolean;
}

export interface IgetFleets {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
}

export interface IgetFleet {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
}

export interface IgetNamespaces {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
}

export interface IgetNamespace {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  namespaceName: string;
}

export interface IgetPhysicalFleet {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
}

export interface IgetRobots {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
}
export interface IgetRobot {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  robotName: string;
}

export interface IgetBuildManager {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  robotName: string;
}

export interface IgetLaunchManagers {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  robotName: string;
}

export interface IgetEnvironments {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
}

export interface IsingleGetRobotParameters {
  setRobotData?: boolean;
  ifErrorNavigateTo404?: boolean;
  setResponse?: any;
}

export interface IsingleGetBuildParameters {
  setRobotData?: boolean;
  ifErrorNavigateTo404?: boolean;
  setResponse?: any;
}

export interface ImultipleGetLaunchParameters {
  setRobotData?: boolean;
  ifErrorNavigateTo404?: boolean;
  setResponse?: any;
}

export interface IuseFunctions {
  getPhysicalInstances: (
    values: IgetPhysicalInstances,
    parameters?: ImultipleGetParameters,
  ) => void;
  getPhysicalInstance: (
    values: IgetPhysicalInstance,
    parameters?: IsingleGetParameters,
  ) => void;

  getInstance: (
    values: IgetInstance,
    parameters?: IsingleGetParameters,
  ) => void;

  getFleets: (values: IgetFleets, parameters?: ImultipleGetParameters) => void;
  // getFleet: (values: IgetFleet, parameters?: IsingleGetParameters) => void;

  getNamespaces: (
    values: IgetNamespaces,
    parameters: ImultipleGetParameters,
  ) => void;
  getNamespace: (
    values: IgetNamespace,
    parameters?: IsingleGetParameters,
  ) => void;

  getPhysicalFleet: (
    values: IgetPhysicalFleet,
    parameters?: IsingleGetParameters,
  ) => void;
  getRobots: (values: IgetRobots, parameters?: ImultipleGetParameters) => void;
  getRobot: (values: IgetRobot, parameters?: IsingleGetRobotParameters) => void;
  deleteRobot: (robotName: string) => Promise<void>;
  getBuildManager: (parameters?: IsingleGetBuildParameters) => void;
  getLaunchManagers: (parameters?: ImultipleGetLaunchParameters) => void;
  getEnvironments: (
    values: IgetEnvironments,
    parameters?: ImultipleGetParameters,
  ) => void;
  getEnvironment: (
    values: IgetEnvironmentRequest,
    parameters?: IsingleGetEnviromentParameters,
  ) => void;
  deleteEnvironment: (envName: string) => Promise<void>;

  createDataScienceApp: (values: IcreateDataScienceAppsRequest) => void;
  getDataScienceApps: (parameters?: ImultipleGetParameters) => void;
  deleteDataScienceApp: (values: IdeleteDataScienceAppsRequest) => void;

  createAppBuildManager: () => Promise<void>;
  getAppBuildManager: () => Promise<void>;
  deleteAppBuildManager: () => Promise<void>;

  addPhysicalInstanceToFleet: () => Promise<void>;
  getSystemStatus: () => Promise<ISystemStatus>;
  createRobot: () => Promise<void>;
  createEnvironment: (withoutWorkspaces?: boolean) => Promise<void>;
  createBuildManager: () => Promise<void>;
  getIP: () => void;

  getFilesFromFileManager: (values: {
    instanceIP: string;
    paths?: string[];
  }) => Promise<any>;

  getTemplates: () => Promise<any>;

  getFreePort: () => Promise<number | undefined>;
  // // // // // // //
  deleteNamespaceFC: (nsName: string) => Promise<void>;
  deleteFleetFC: (fleetName: string) => Promise<void>;
  // // // // // // //
  startInstanceFC: (organizationId: string) => Promise<void>;
  stopInstanceFC: (organizationId: string) => Promise<void>;
  deleteInstanceFC: (organizationId: string) => Promise<void>;
  // // // // // // //
  getOrganizationsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<IOrganization[]>;
  getRegionsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<IRegion[]>;
  getCloudInstancesFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<ICloudInstance[]>;
  getFleetsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<IFleet[]>;
  getNamespacesFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<INamespace[]>;
  getRobotsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
  ) => Promise<
    {
      step1: IEnvironmentStep1;
      step2: IEnvironmentStep2;
    }[]
  >;
  getApplicationsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
  ) => Promise<
    {
      step1: IEnvironmentStep1;
      step2: IEnvironmentStep2;
    }[]
  >;
  getRobotFC: (
    ErrorNav404: boolean,
    robotName: string,
  ) => Promise<{
    step1: IEnvironmentStep1;
    step2: IEnvironmentStep2;
  }>;
  getApplicationFC: (
    ErrorNav404: boolean,
    appName: string,
  ) => Promise<{
    step1: IEnvironmentStep1;
    step2: IEnvironmentStep2;
  }>;
}
