export interface IcreateEnvironmentRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  environmentName: string;
  domainName: string;
  fleetName: string;
  ideGpuResource: number;
  ideGpuResourceType: string;
  vdiSessionCount: number;
  vdiGpuResource: number;
  storageAmount: number;
  applicationName: string;
  applicationVersion: string;
  devspaceUbuntuDistro: string;
  devspaceDesktop: string;
  devspaceVersion: string;
  workspaces: any;
  permittedDirectories: string;
  persistentDirectories: string;
  hostDirectories: string;
  ideCustomPorts: string;
  vdiCustomPorts: string;
  notebookEnabled: boolean;
  notebookGpuResource: number;
  notebookCustomPorts: string;
  applicationObject: any;
  templateAlias: string;
  templatePrivateSharing: boolean;
  templateOrganizationSharing: boolean;
  templatePublicSharing: boolean;
}

export interface IgetEnvironmentsRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
}

export interface IsingleGetEnviromentParameters {
  setRobotData?: boolean;
  ifErrorNavigateTo404?: boolean;
  setResponse?: any;
}

export interface IgetEnvironmentRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  fleetName: string;
  environmentName: string;
}

export interface IcreateDataScienceAppsRequest {
  applicationName: string;
}

export interface IdeleteDataScienceAppsRequest {
  applicationName: string;
}

export interface IDataScienceApp {
  name: string;
  status: string;
  applicationLog: string;
  application: {
    hasUi: boolean;
    name: string;
    isDeletable: boolean;
    hasAccessToken: boolean;
    accessToken: string;
  };
  internalServiceEndpoint: string;
  externalServiceEndpoint: string;
}
