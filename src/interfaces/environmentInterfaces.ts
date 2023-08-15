export interface IcreateEnvironmentRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  environmentName: string;
  domainName: string;
  fleetName: string;
  vdiSessionCount: number;
  storageAmount: number;
  applicationName: string;
  applicationVersion: string;
  devspaceUbuntuDistro: string;
  devspaceDesktop: string;
  devspaceVersion: string;
  workspaces: any;
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
