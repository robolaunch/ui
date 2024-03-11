import { IEnvironmentStep1 } from "../interfaces/environment/environment.step1.interface";
import { IEnvironmentStep2 } from "../interfaces/environment/environment.step2.interface";
import { IDeployBE } from "../interfaces/deploy.interface";

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
            isVirtualRobot: deploy?.isPhysicalInstance ? false : true,
            isDevelopmentMode: true,
            configureWorkspace: false,
            physicalInstanceName: deploy?.isPhysicalInstance
              ? deploy?.instanceName
              : "",
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
              isEnabled: Boolean(deploy?.bridgeEnabled),
              rosDistros: [],
              socketEndpoint: deploy?.bridgeIngressEndpoint,
              podName: "",
              log: "",
              bridgeDistro: deploy?.bridgeDistro?.toLowerCase() || "",
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
          launchContainers: deploy?.launchContainers?.map((cont) => {
            return {
              replicaCount: cont.replicas,
              container: {
                name: cont.container.name,
                image: cont.container.image,
                command: cont.container.command,
                status: cont.container.containerStatus ? "Ready" : "Creating",
                privileged: false,
                mountedVolumes:
                  cont.container.volumeMounts?.map((vol) => {
                    return {
                      name: vol.name,
                      mountPath: vol.mountPath,
                    };
                  }) || [],
                environmentVariables:
                  cont.container.envs?.map((env) => {
                    return {
                      name: env.name,
                      value: env.value,
                    };
                  }) || [],
              },
            };
          }),
          volumes:
            deploy?.volumeClaimTemplates?.map((vol) => {
              return {
                name: vol.name,
                capacity: Number(vol.capacity.value?.split("Gi")[0]),
              };
            }) || [],
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
