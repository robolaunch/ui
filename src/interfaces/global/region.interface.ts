export interface IRegion {
  name: string;
  provider: string;
  region: string;
}

export interface IRegionBE {
  name: string;
  region: string;
}

export interface ICreateRoboticsCloudRequest {
  organizationId: string;
  roboticsCloudName: string;
  provider: string;
  region: string;
}

export interface IGetRoboticsCloudsRequest {
  organizationId: string;
}

export interface IRegion {
  name: string;
  region: string;
}
