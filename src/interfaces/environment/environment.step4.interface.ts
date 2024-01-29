export interface IEnvironmentStep4 {
  robotLaunchSteps: IEnvironmentStep4LaunchStep[];
}

export interface IEnvironmentStep4LaunchStep {
  name: string;
  workspace: string;
  entryPointType: "custom";
  entryPointCmd: string;
  instancesName: any[];
  robotLmEnvs: IEnvironmentStep4LaunchENV[];
}

export interface IEnvironmentStep4LaunchENV {
  name: string;
  value: string;
}
