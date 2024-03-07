import { IDeployBE } from "../interfaces/deploy.interface";
import { IEnvironmentStep1 } from "../interfaces/environment/environment.step1.interface";
import { IEnvironmentStep2 } from "../interfaces/environment/environment.step2.interface";

function handleMapper(data: IDeployBE[]): {
  step1: IEnvironmentStep1;
  step2: IEnvironmentStep2;
}[] {
  return (
    data?.map((deploy) => {
      return {
        step1: {
          details: {
            name: deploy?.name,
            isVirtualRobot: true,
            isDevelopmentMode: true,
            configureWorkspace: false,
            physicalInstanceName: "",
            isDeployMode: true,
          },
          resources: {
            cpu: {
              allocatedCore: 0,
            },
            gpu: {
              enabledForCloudInstance: true,
              allocatedCore: 0,
            },
            memory: {
              allocatedCapacity: 0,
            },
            storage: {
              allocatedCapacity: 0,
            },
          },
          services: {
            ros: {
              isEnabled: deploy.bridgeEnabled,
              rosDistros: [],
              socketEndpoint: "",
              podName: "",
              log: "",
              bridgeDistro: deploy.bridgeDistro,
            },

            vdi: {
              isEnabled: false,
              socketEndpoint: "",
              fileManagerEndpoint: "",
              customPorts: [],
              gpuAllocation: 0,
              podName: "",
              sessionCount: 0,
              log: "",
            },
            ide: {
              isEnabled: false,
              httpsEndpoint: "",
              fileManagerEndpoint: "",
              customPorts: [],
              gpuAllocation: 0,
              gpuModelName: "",
              podName: "",
              log: "",
            },
            physicalIde: {
              isEnabled: false,
              httpsEndpoint: "",
            },
            jupyterNotebook: {
              isEnabled: false,
              httpsEndpoint: "",
              fileManagerEndpoint: "",
              gpuAllocation: 0,
              customPorts: [],
              podName: "",
              log: "",
            },
          },
          directories: {
            permittedDirectories: "",
            persistentDirectories: "",
            hostDirectories: [],
          },
          applicationConfig: {
            domainName: "",
            application: {
              name: "",
              version: "",
            },
            devspace: {
              desktop: "",
              ubuntuDistro: "",
              version: "",
            },
          },

          clusters: {
            environment: [],
            build: [],
            launch: [],
          },

          sharing: {
            alias: "",
            private: false,
            organization: false,
            public: false,
          },
          launchContainers: [],
          volumes: [],
        },
        step2: {
          configureWorkspace: false,
          workspaces: [],
        },
      };
    }) || []
  );
}

export function deploysMapper(data: IDeployBE[]): {
  step1: IEnvironmentStep1;
  step2: IEnvironmentStep2;
}[] {
  return handleMapper(data);
}

export function deployMapper(data: IDeployBE): {
  step1: IEnvironmentStep1;
  step2: IEnvironmentStep2;
} {
  return handleMapper([data])?.[0] || null;
}
