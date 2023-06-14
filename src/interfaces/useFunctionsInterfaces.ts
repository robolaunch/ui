export interface IuseFunctions {
  handleSetterCurrentOrganization: (
    urlOrganizationName: string | undefined
  ) => void;
  handleSetterCurrentRoboticsCloud: (
    urlRoboticsCloudName: string | undefined
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
    setResponseRobot?: any
  ) => void;
  handleSetterResponseBuildManager: (
    urlRobotName: string | undefined,
    setResponseBuildManager?: any
  ) => void;
  handleSetterResponseLaunchManagers: (
    urlRobotName: string | undefined,
    setResponseLaunchManagers?: any
  ) => void;
}
