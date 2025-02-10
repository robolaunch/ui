export function environmentGPUCoreUsagebility(
  gpuList: {
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
  }[],
): number {
  const supportedGPUModels = ["T4", "A100", "V100", "Ada", "A30", "L40", "L4", "A5500", "6000"];

  for (const gpu of gpuList) {
    for (const model of supportedGPUModels) {
      if (gpu.model.includes(model)) {
        return 1;
      }
    }
  }

  return 0;
}
