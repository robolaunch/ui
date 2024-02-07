export interface ICloudInstance {
  name: string;
  id: string;
  providerModel: string; // instanceType
  providerState: string; // instanceState
  rlState: string; // instanceCloudState
  endpoint: string; // hostname
  resources: {
    software: {
      architecture: string;
      os: string;
      osDistro: string;
      kernelVersion: string;
      kubernetesVersion: string;
    };
    hardware: {
      cpu: {
        usageCore: number;
        totalCore: number;
        usagePercent: number;
      };
      gpu: {
        hardware: {
          id: string;
          uuid: string;
          model: string;
          watt: number;
          usagePercent: number;
          temperature: number;
          memory: {
            totalGB: number;
            totalMB: number;
            usedMB: number;
            freeMB: number;
            percent: number;
          };
        }[];
        platform: {
          name: string;
          available: number;
          allocated: number;
          capacity: number;
        }[];
      };
      memory: {
        usageGB: number;
        totalGB: number;
        usagePercent: number;
      };
      storage: {
        usageGB: number;
        totalGB: number;
        usagePercent: number;
      };
      network: {
        name: string;
        in: number;
        out: number;
      }[];
    };
  };
}

export interface ICloudInstanceBE {
  name: string;
  region: string;
  instanceId: string;
  instanceType: string;
  instanceState: string; // provider state
  instanceCloudState: string; // rl state
  hostname: string;
  cloudInstanceResource: {
    architecture: string;
    cpuUsage: number;
    storageUsage: number;
    storageTotal: number;
    cpuTotal: number;
    gpuDeviceUsage: {
      device: string;
      gpuUtil: string;
      memoryFree: string;
      memoryUsed: string;
      memoryUtil: string;
      model: string;
      powerUsage: string;
      temp: string;
      uuid: string;
    }[];
    gpuUsage: {
      allocated: string;
      capacity: string;
      resourceName: string;
    }[];
    kernelVersion: string;
    kubernetesVersion: string;
    memoryUsage: number;
    memoryTotal: number;
    networkUsage: {
      interfaceName: string;
      trafficIn: string;
      trafficOut: string;
    }[];
    operatingSystem: string;
    operatingSystemDistro: string;
  };
}
