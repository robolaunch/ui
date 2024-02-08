export interface IEnvironmentStep1 {
  details: {
    name: string;
    isVirtualRobot: boolean;
    isDevelopmentMode: boolean;
    configureWorkspace: boolean;
    physicalInstanceName: string;
  };
  resources: {
    cpu: {
      allocatedCore: number;
    };
    gpu: {
      enabledForCloudInstance: boolean;
      allocatedCore: number;
    };
    memory: {
      allocatedCapacity: number;
    };
    storage: {
      allocatedCapacity: number;
    };
  };
  services: {
    ros: {
      isEnabled: boolean;
      rosDistros: any[];
      socketEndpoint: string;
      podName: string;
      log: string;
    };
    vdi: {
      isEnabled: boolean;
      socketEndpoint: string;
      fileManagerEndpoint: string;
      customPorts: {
        name: string;
        port: string;
        backendPort: number;
      }[];
      gpuAllocation: number;
      podName: string;
      sessionCount: number;
      log: string;
    };
    ide: {
      isEnabled: boolean;
      httpsEndpoint: string;
      fileManagerEndpoint: string;
      customPorts: {
        name: string;
        port: string;
        backendPort: number;
      }[];
      gpuAllocation: number;
      gpuModelName: string;
      podName: string;
      log: string;
    };
    physicalIde: {
      isEnabled: boolean;
      httpsEndpoint: string;
    };
    jupyterNotebook: {
      isEnabled: boolean;
      httpsEndpoint: string;
      fileManagerEndpoint: string;
      gpuAllocation: number;
      customPorts: {
        name: string;
        port: string;
        backendPort: number;
      }[];
      podName: string;
      log: string;
    };
  };
  directories: {
    permittedDirectories: string;
    persistentDirectories: string;
    hostDirectories: {
      hostDirectory: string;
      mountPath: string;
    }[];
  };
  applicationConfig: {
    domainName: string;
    application: {
      name: string;
      version: string;
    };
    devspace: {
      desktop: string;
      ubuntuDistro: string;
      version: string;
    };
  };
  sharing: {
    private: boolean;
    organization: boolean;
    public: boolean;
    alias: string;
  };
  clusters: {
    environment: IEnvironmentStep1Cluster[];
    build: IEnvironmentStep1Cluster[];
    launch: IEnvironmentStep1Cluster[];
  };
}

export interface IEnvironmentStep1Cluster {
  name: string;
  status: string;
}
