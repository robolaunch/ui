import { IBuildBE } from "../interfaces/global/build.interfaces";
import { IEnvironmentStep1Cluster } from "../interfaces/environment/environment.step1.interface";
import { IEnvironmentStep3 } from "../interfaces/environment/environment.step3.interface";

export function buildMapper(data: IBuildBE): {
  step1: {
    clusters: {
      launch: IEnvironmentStep1Cluster[];
    };
  };
  step3: IEnvironmentStep3;
} {
  return {
    step1: {
      clusters: {
        launch:
          data.robotClusters.map((item) => {
            return {
              name: item.name,
              status: item.buildManagerStatus,
            };
          }) || [],
      },
    },

    step3: {
      name: data.name,
      steps: data.robotBuildSteps.map((item) => {
        return {
          name: item.name,
          workspace: item.workspace,
          isCommandCode: item.isCommandCode,
          command: item.command,
          script: item.script,
          instanceScope: item.instanceScope,
          log: item.log,
          status: item.status,
        };
      }),
    },
  };
}
