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
