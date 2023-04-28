export interface IRobotData {
  step1: any;
  step2: IRobotWorkspaces;
  step3: any;
}

export interface IRobotWorkspaces {
  workspaces: IRobotWorkspace[];
}

export interface IRobotWorkspace {
  name: string;
  distro: "humble" | "galactic" | "foxy" | "";
  repositories: IRobotWorkspaceRepository[];
}

interface IRobotWorkspaceRepository {
  name: string;
  url: string;
  branch: string;
}
