export interface IRobotData {
  step1: any;
  step2: IRobotWorkspaces;
  step3: IRobotBuildSteps;
  step4: any;
}

export interface IRobotWorkspaces {
  workspaces: IRobotWorkspace[];
}

export interface IRobotWorkspace {
  name: string;
  workspaceDistro: "IRON" | "HUMBLE" | "GALACTIC" | "FOXY" | "";
  robotRepositories: IRobotWorkspaceRepository[];
}

export interface IRobotWorkspaceRepository {
  name: string;
  url: string;
  branch: string;
}

export interface IRobotBuildSteps {
  buildManagerName: string;
  robotBuildSteps: IRobotBuildStep[];
}
export interface IRobotBuildStep {
  name: string;
  workspace: string;
  isCommandCode: boolean;
  command: string;
  script: string;
  instancesName: any[];
}

export interface IRobotLaunchSteps {
  launchManagerName: string;
  robotLaunchSteps: IRobotLaunchStep[];
}

export interface IRobotLaunchStep {
  workspace: string;
  entryPointType: string;
  entryPointCmd: string;
  instancesName: any[];
  robotLmEnvs: IRobotLaunchENV[];
}

export interface IRobotLaunchENV {
  name: string;
  value: string;
}

export interface IuseCreateRobot {
  robotData: IRobotData;
  setRobotData: React.Dispatch<React.SetStateAction<IRobotData>>;
  handleResetRobotForm: () => void;
  handleAddWorkspaceStep: (formik: any) => void;
  handleRemoveWorkspaceStep: (formik: any, workspaceIndex: number) => void;
  handleAddRepositoryToWorkspaceStep: (
    formik: any,
    workspaceIndex: number
  ) => void;
  handleRemoveRepositoryFromWorkspaceStep: (
    formik: any,
    workspaceIndex: number,
    repositoryIndex: number
  ) => void;
  handleAddStepToBuildStep: (formik: any) => void;
  handleRemoveStepFromBuildStep: (formik: any, buildStepIndex: number) => void;
  handleAddENVToLaunchStep: (formik: any, launchStepIndex: number) => void;
  handleRemoveENVFromLaunchStep: (
    formik: any,
    launchStepIndex: number,
    envIndex: number
  ) => void;
  handleAddStepToLaunchStep: (formik: any) => void;
  handleRemoveStepFromLaunchStep: (
    formik: any,
    launchStepIndex: number
  ) => void;
}
