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
  const supportedGPUModels = new Set([
    "T4",
    "A100",
    "V100",
    "A6000",
    "A30",
    "L40",
  ]);

  for (const gpu of gpuList) {
    if (supportedGPUModels.has(gpu.model)) {
      return 1;
    }
  }

  return 0;
}
