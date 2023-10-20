export interface IcreateEnvironmentRequest {
  organizationId: string;
  roboticsCloudName: string;
  instanceId: string;
  region: string;
  environmentName: string;
  domainName: string;
  fleetName: string;
  ideGpuResource: number;
  vdiSessionCount: number;
  storageAmount: number;
  applicationName: string;
  applicationVersion: string;
  devspaceUbuntuDistro: string;
  devspaceDesktop: string;
  devspaceVersion: string;
  workspaces: any;
  permittedDirectories: string;
  persistentDirectories: string;
  ideCustomPorts: string;
  vdiCustomPorts: string;
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
