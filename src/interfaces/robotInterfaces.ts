export interface IRobotData {
  step1: any;
  step2: IRobotWorkspaces;
  step3: IRobotBuildSteps;
}

export interface IRobotWorkspaces {
  workspaces: IRobotWorkspace[];
}

export interface IRobotWorkspace {
  name: string;
  workspaceDistro: "HUMBLE" | "GALACTIC" | "FOXY" | "";
  robotRepositories: IRobotWorkspaceRepository[];
}

interface IRobotWorkspaceRepository {
  name: string;
  url: string;
  branch: string;
}

export interface IRobotBuildSteps {
  steps: IRobotBuildStep[];
}
export interface IRobotBuildStep {
  name: string;
  workspace: string;
  isScriptCode: boolean;
  code: string;
}

export interface IuseCreateRobot {
  robotData: IRobotData;
  setRobotData: React.Dispatch<React.SetStateAction<IRobotData>>;
}
