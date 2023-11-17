export interface IInstance {
  name: string;
  region: string;
  instanceId: string;
  instanceState: string;
  instanceType: string;
  instanceCloudState: string;
  cloudInstanceResource: IInstanceResource;
  physicalInstanceResource: any;
}

export interface IInstanceResource {
  architecture: string;
  cpuTotal: number;
  cpuUsage: number;
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
