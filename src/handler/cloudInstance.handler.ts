import {
  ICloudInstance,
  ICloudInstanceBE,
} from "../interfaces/cloudInstance.interface";

function handleMapper(data: ICloudInstanceBE[]): ICloudInstance[] {
  return (
    data?.map((item) => {
      return {
        name: item.name,
        id: item.instanceId,
        providerModel: item.instanceType,
        providerState: item.instanceState,
        rlState: item.instanceCloudState,
        endpoint: item.hostname,
        resources: {
          software: {
            architecture: item.cloudInstanceResource.architecture,
            os: item.cloudInstanceResource.operatingSystem,
            osDistro: item.cloudInstanceResource.operatingSystemDistro,
            kernelVersion: item.cloudInstanceResource.kernelVersion,
            kubernetesVersion: item.cloudInstanceResource.kubernetesVersion,
          },
          hardware: {
            cpu: {
              usageCore:
                (item.cloudInstanceResource.cpuUsage / 100) *
                item.cloudInstanceResource.cpuTotal *
                item.cloudInstanceResource.cpuTotal,
              totalCore: item.cloudInstanceResource.cpuTotal,
              usagePercent: item.cloudInstanceResource.cpuUsage,
            },
            gpu: {
              hardware: item.cloudInstanceResource.gpuDeviceUsage?.map(
                (gpu) => {
                  return {
                    id: gpu.device,
                    uuid: gpu.uuid,
                    model: gpu.model,
                    watt: Number(Number(gpu.powerUsage).toFixed(1)),
                    usagePercent: Number(gpu.gpuUtil),
                    temperature: Number(Number(gpu.temp).toFixed(1)),
                    memory: {
                      totalGB: Number(
                        (
                          (Number(gpu.memoryUsed) + Number(gpu.memoryFree)) /
                          1024
                        ).toFixed(1),
                      ),
                      totalMB: Number(gpu.memoryUsed) + Number(gpu.memoryFree),
                      usedMB: Number(gpu.memoryUsed),
                      freeMB: Number(gpu.memoryFree),
                      percent: Number(gpu.memoryUtil),
                    },
                  };
                },
              ),
              platform: item.cloudInstanceResource.gpuUsage?.map((gpu) => {
                return {
                  name: gpu.resourceName,
                  allocated: Number(gpu.allocated),
                  capacity: Number(gpu.capacity),
                };
              }),
            },
            memory: {
              usageGB:
                (item.cloudInstanceResource.memoryUsage / 100) *
                item.cloudInstanceResource.memoryTotal *
                item.cloudInstanceResource.memoryTotal,
              totalGB: item.cloudInstanceResource.memoryTotal,
              usagePercent: item.cloudInstanceResource.memoryUsage,
            },
            storage: {
              usageGB: item.cloudInstanceResource.storageUsage,
              totalGB: item.cloudInstanceResource.storageTotal,
              usagePercent: Number(
                (
                  (item.cloudInstanceResource.storageUsage /
                    item.cloudInstanceResource.storageTotal) *
                  100
                ).toFixed(0),
              ),
            },
            network: item.cloudInstanceResource.networkUsage?.map((network) => {
              return {
                name: network.interfaceName,
                in: Number(network.trafficIn?.split(" ")[0]),
                out: Number(network.trafficOut?.split(" ")[0]),
              };
            }),
          },
        },
      };
    }) || []
  );
}

export function cloudInstancesMapper(
  data: ICloudInstanceBE[],
): ICloudInstance[] {
  return handleMapper(data);
}

export function cloudInstanceMapper(
  data: ICloudInstanceBE[],
  filter: string,
): null | ICloudInstance {
  return handleMapper(data).find((item) => item.name === filter) || null;
}
