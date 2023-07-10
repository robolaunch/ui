export interface ICreateRoboticsCloudRequest {
  organizationId: string;
  roboticsCloudName: string;
  provider: string;
  region: string;
}

export interface IGetRoboticsCloudsRequest {
  organizationId: string;
}
