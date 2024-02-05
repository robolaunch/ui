export interface IEnvironmentStep3 {
  name: string;
  steps: IEnvironmentStep3BuildStep[];
}

export interface IEnvironmentStep3BuildStep {
  name: string;
  workspace: string;
  isCommandCode: boolean;
  command: string;
  script: string;
  instanceScope: any[];
  log: string;
  status: string;
}
