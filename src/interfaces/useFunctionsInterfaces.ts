import {
  IgetEnvironmentRequest,
  IsingleGetEnviromentParameters,
} from "./environmentInterfaces";

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
  getInstance: (
    values: IgetInstance,
    parameters?: IsingleGetParameters,
  ) => void;
  getFleets: (values: IgetFleets, parameters?: ImultipleGetParameters) => void;
  getFleet: (values: IgetFleet, parameters?: IsingleGetParameters) => void;
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

  getBuildManager: (
    values: IgetBuildManager,
    parameters?: IsingleGetBuildParameters,
  ) => void;
  getLaunchManagers: (
    values: IgetLaunchManagers,
    parameters?: ImultipleGetLaunchParameters,
  ) => void;
  getEnvironments: (
    values: IgetEnvironments,
    parameters?: ImultipleGetParameters,
  ) => void;
  getEnvironment: (
    values: IgetEnvironmentRequest,
    parameters?: IsingleGetEnviromentParameters,
  ) => void;
  addPhysicalInstanceToFleet: () => void;
  createRobot: () => void;
  updateRobot: () => void;
  createEnvironment: (withoutWorkspaces?: boolean) => void;
  createBuildManager: () => void;
  getIP: () => void;
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
}
