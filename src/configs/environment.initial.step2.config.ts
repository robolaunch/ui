import { IEnvironmentStep2 } from "../interfaces/environment/environment.step2.interface";

export const environmentInitialStep2Config: IEnvironmentStep2 = {
  configureWorkspace: false,
  workspaces: [
    {
      name: "",
      workspaceDistro: "",
      robotRepositories: [
        {
          name: "",
          url: "",
          branch: "",
        },
      ],
    },
  ],
};
