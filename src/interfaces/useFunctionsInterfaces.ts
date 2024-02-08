import { ICloudInstance } from "./cloudInstance.interface";
import { IEnvironmentStep1 } from "./environment/environment.step1.interface";
import { IEnvironmentStep2 } from "./environment/environment.step2.interface";
import {
  IcreateDataScienceAppsRequest,
  IdeleteDataScienceAppsRequest,
  IgetEnvironmentRequest,
  IsingleGetEnviromentParameters,
} from "./environmentInterfaces";
import { IFleet } from "./fleet.interface";
import { INamespace } from "./namespace.interface";
import { IOrganization } from "./organization.interface";
import { IRegion } from "./region.interface";
import { ISystemStatus } from "./system.interface";

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
  getOrganizations: (parameters?: ImultipleGetParameters) => void;
  getOrganization: (
    values: IgetOrganization,
    parameters?: IsingleGetParameters,
  ) => void;
  getRoboticsClouds: (
    values: IgetRoboticsClouds,
    parameters?: ImultipleGetParameters,
  ) => void;
  getRoboticsCloud: (
    values: IgetRoboticsCloud,
    parameters?: IsingleGetParameters,
  ) => void;
  getInstances: (
    values: IgetInstances,
    parameters?: ImultipleGetParameters,
  ) => void;
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

  startInstance: (organizationId: string) => Promise<void>;
  stopInstance: (organizationId: string) => Promise<void>;
  deleteInstance: (organizationId: string) => Promise<void>;

  getFleets: (values: IgetFleets, parameters?: ImultipleGetParameters) => void;
  getFleet: (values: IgetFleet, parameters?: IsingleGetParameters) => void;
  deleteFleet: (fleetName: string) => Promise<void>;

  getNamespaces: (
    values: IgetNamespaces,
    parameters: ImultipleGetParameters,
  ) => void;
  getNamespace: (
    values: IgetNamespace,
    parameters?: IsingleGetParameters,
  ) => void;
  deleteNamespace: (nsName: string) => Promise<void>;

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

  handleSetterCurrentOrganization: (
    urlOrganizationName: string | undefined,
  ) => void;
  handleSetterCurrentRoboticsCloud: (
    urlRoboticsCloudName: string | undefined,
  ) => void;
  handleSetterCurrentInstance: (urlInstanceName: string | undefined) => void;
  handleSetterCurrentFleet: (urlFleetName: string | undefined) => void;
  handleSetterResponseOrganizations: (setResponseOrganizations: any) => void;
  handleSetterResponseRoboticsClouds: (setResponseRoboticsClouds: any) => void;
  handleSetterResponseInstances: (setResponseInstances: any) => void;
  handleSetterResponseFleets: (setResponseFleets: any) => void;
  handleSetterResponseFleet: (setResponseFleet: any) => void;
  handleSetterResponseRobots: (setResponseRobots: any) => void;
  handleSetterResponseRobot: (
    urlRobotName: string | undefined,
    setResponseRobot?: any,
  ) => void;
  handleSetterResponseBuildManager: (
    urlRobotName: string | undefined,
    setResponseBuildManager?: any,
  ) => void;
  handleSetterResponseLaunchManagers: (
    urlRobotName: string | undefined,
    setResponseLaunchManagers?: any,
  ) => void;

  getFreePort: () => Promise<number | undefined>;

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
