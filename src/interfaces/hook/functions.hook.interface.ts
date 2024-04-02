import { IEnvironmentStep1 } from "../environment/environment.step1.interface";
import { IEnvironmentStep2 } from "../environment/environment.step2.interface";
import { IPhysicalInstance } from "../global/physicalInstance.interface";
import { ICloudInstance } from "../global/cloudInstance.interface";
import { IDataScienceApp } from "../global/dataSciende.interface";
import { IOrganization } from "../global/organization.interface";
import { INamespace } from "../global/namespace.interface";
import { ISystemStatus } from "../global/system.interface";
import { ITemplate } from "../global/template.interface";
import { IRegion } from "../global/region.interface";
import { IFleet } from "../global/fleet.interface";

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

export interface IgetPhysicalFleet {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
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
  //// Organizations ////
  createOrganizationFC: (orgName: string) => Promise<void>;
  getOrganizationsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<IOrganization[]>;
  //// Regions ////
  createRegionFC: (providerRegion: string, regionName: string) => Promise<void>;
  getRegionsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<IRegion[]>;
  //// CloudInstances ////
  createCloudInstanceFC: (
    type: string,
    instanceName: string,
    devMode: boolean,
  ) => Promise<void>;
  getCloudInstancesFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<ICloudInstance[]>;
  startInstanceFC: (organizationId: string) => Promise<void>;
  stopInstanceFC: (organizationId: string) => Promise<void>;
  deleteInstanceFC: (organizationId: string) => Promise<void>;
  //// Physical Instances ////
  addPhysicalInstanceToCloudInstanceFC: (phyName: string) => Promise<string>;
  addPhysicalInstanceToFleetFC: () => Promise<void>;
  getPhysicalInstancesFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<IPhysicalInstance | IPhysicalInstance[] | null>;
  //// Fleets ////
  createFleetFC: (fleetName: string) => Promise<void>;
  getFleetsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<IFleet[]>;
  deleteFleetFC: (fleetName: string) => Promise<void>;
  //// Namespaces ////
  createNamespaceFC: (namespaceName: string) => Promise<void>;
  getNamespacesFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ) => Promise<INamespace[]>;
  deleteNamespaceFC: (nsName: string) => Promise<void>;
  //// Applications ////
  createApplicationFC: (withoutWorkspaces?: boolean) => Promise<void>;
  getApplicationsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
  ) => Promise<
    {
      step1: IEnvironmentStep1;
      step2: IEnvironmentStep2;
    }[]
  >;
  getApplicationFC: (
    ErrorNav404: boolean,
    appName: string,
  ) => Promise<{
    step1: IEnvironmentStep1;
    step2: IEnvironmentStep2;
  }>;
  deleteApplicationFC: (envName: string) => Promise<void>;
  //// Data Science Apps ////
  createDataScienceAppFC: (values: {
    applicationName: string;
  }) => Promise<void>;
  getDataScienceAppsFC: (
    fromPage: boolean,
    ErrorNav404: boolean,
  ) => Promise<IDataScienceApp[]>;
  deleteDataScienceAppFC: (values: {
    applicationName: string;
  }) => Promise<void>;
  //// Robots ////
  createRobotFC: () => Promise<void>;
  getRobotsFC: (
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
  deleteRobotFC: (robotName: string) => Promise<void>;
  //// Tools ////
  getSystemStatusFC: () => Promise<ISystemStatus>;
  getTemplatesFC: () => Promise<ITemplate[]>;
  getFreePortFC: () => Promise<number | undefined>;
  ////
  ////
  ////
  ////
  getPhysicalFleet: (
    values: IgetPhysicalFleet,
    parameters?: IsingleGetParameters,
  ) => void;
  getBuildManager: (parameters?: IsingleGetBuildParameters) => void;
  getLaunchManagers: (parameters?: ImultipleGetLaunchParameters) => void;

  createAppBuildManager: () => Promise<void>;
  getAppBuildManager: () => Promise<void>;
  deleteAppBuildManager: () => Promise<void>;

  createBuildManager: () => Promise<void>;
  getIP: () => void;

  getFilesFromFileManager: (values: {
    instanceIP: string;
    paths?: string[];
  }) => Promise<any>;
  //
  createDeployFC: () => Promise<void>;
  getDeploysFC(
    fromPage: boolean,
    ErrorNav404: boolean,
  ): Promise<
    {
      step1: IEnvironmentStep1;
      step2: IEnvironmentStep2;
    }[]
  >;
  getDeployFC(ErrorNav404: boolean, deployName: string): Promise<void>;
}
