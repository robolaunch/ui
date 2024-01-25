export interface IInstance {
  name: string;
  region: string;
  hostname: string;
  instanceId: string;
  instanceState: string;
  instanceType: string;
  instanceCloudState: string;
  cloudInstanceResource: IInstanceResource;
  physicalInstanceResource: any;
  systemStatus: {
    name: string;
    status: string;
    log: string;
  }[];
}

export interface IInstanceResource {
  architecture: string;
  cpuTotal: number;
  cpuUsage: number;
  gpuDeviceUsage: IGPUDeviceUsage[];
  gpuUsage: any;
  kernelVersion: string;
  kubernetesVersion: string;
  memoryTotal: number;
  memoryUsage: number;
  networkUsage: INetworkUsage[];
  operatingSystem: string;
  operatingSystemDistro: string;
  storageTotal: number;
  storageUsage: number;
  virtualGpu: number;
}

export interface IGPUDeviceUsage {
  device: string;
  gpuUtil: string;
  memoryFree: string;
  memoryUsed: string;
  memoryUtil: string;
  model: string;
  powerUsage: string;
  temp: string;
  uuid: string;
}
export interface IGpuUsage {
  gpuModel: string;
  gpuUtilization: string;
  allocated: string;
  capacity: string;
  resourceName: string;
}

export interface INetworkUsage {
  interfaceName: string;
  trafficIn: string;
  trafficOut: string;
}
