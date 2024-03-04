import { envApplicationMode } from "../helpers/envProvider";
import { IEnvironmentStep1 } from "../interfaces/environment/environment.step1.interface";

export function AppMode(): boolean {
  let userPersist = JSON.parse(
    localStorage.getItem("persist:user") || "{}",
  )?.applicationMode;

  userPersist =
    userPersist === "true" ? true : userPersist === "false" ? false : null;

  if (userPersist === null) {
    return envApplicationMode;
  } else {
    return userPersist;
  }
}

export const environmentInitialStep1Config: IEnvironmentStep1 = {
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
      allocatedCapacity: 40,
    },
  },

  services: {
    ros: {
      isEnabled: true,
      socketEndpoint: "",
      rosDistros: [],
      podName: "",
      log: "",
    },
    vdi: {
      isEnabled: true,
      socketEndpoint: "",
      fileManagerEndpoint: "",
      customPorts: [],
      gpuAllocation: 0,
      podName: "",
      sessionCount: 2,
      log: "",
    },
    ide: {
      isEnabled: true,
      httpsEndpoint: "",
      fileManagerEndpoint: "",
      customPorts: [],
      gpuModelName: "",
      gpuAllocation: 0,
      podName: "",
      log: "",
    },
    physicalIde: {
      isEnabled: true,
      httpsEndpoint: "",
    },
    jupyterNotebook: {
      isEnabled: false,
      httpsEndpoint: "",
      fileManagerEndpoint: "",
      customPorts: [],
      gpuAllocation: 0,
      podName: "",
      log: "",
    },
  },
  directories: {
    permittedDirectories: "/home/robolaunch",
    persistentDirectories: "/var:/etc:/opt:/usr",
    hostDirectories: [],
  },

  applicationConfig: {
    domainName: "",
    application: {
      name: "",
      version: "",
    },
    devspace: {
      ubuntuDistro: "",
      desktop: "",
      version: "",
    },
  },
  details: {
    name: "",
    isVirtualRobot: true,
    configureWorkspace: false,
    isDeployMode: false,
    isDevelopmentMode: true || AppMode(),
    physicalInstanceName: "",
  },
  sharing: {
    private: false,
    organization: false,
    public: false,
    alias: "",
  },
  clusters: {
    environment: [],
    build: [],
    launch: [],
  },
  volumes: [],
  containers: [],
};
