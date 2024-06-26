export interface IBuildBE {
  name: string;
  robotClusters: {
    name: string;
    buildManagerStatus: string;
  }[];
  robotBuildSteps: {
    name: string;
    workspace: string;
    isCommandCode: boolean;
    command: string;
    script: string;
    instanceScope: string[];
    log: string;
    status: string;
  }[];
}

export interface IBuild {
  name: string;
  steps: {
    name: string;
    workspace: string;
    isCommandCode: boolean;
    command: string;
    script: string;
    instanceScope: string[];
    log: string;
    status: string;
  }[];
}
