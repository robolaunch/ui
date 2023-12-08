import { ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import { BsGpuCard } from "react-icons/bs";
import { IGPUDeviceUsage } from "../../interfaces/instanceInferfaces";

export default function GPUChart(): ReactElement {
  const { pagesState } = useMain();

  const [gpuData, setGpuData] = useState<IGPUDeviceUsage[] | undefined>([]);

  useEffect(() => {
    setGpuData(pagesState?.instance?.cloudInstanceResource?.gpuDeviceUsage);
  }, [pagesState?.instance?.cloudInstanceResource?.gpuDeviceUsage]);

  return (
    <div className="flex flex-col items-center gap-3">
      {gpuData?.map((data, index) => {
        return (
          <div key={index} className="flex items-center gap-4 text-sm">
            <div className="flex gap-2">
              <BsGpuCard size={22} className="text-layer-secondary-600" />
              <p>{data?.device}</p>
            </div>
            <div className="flex flex-col text-[0.66rem]">
              <div>
                <p>
                  {(Number(data?.memoryUsed) / 1024)?.toFixed(1) || 0.1} /{" "}
                  {(
                    (Number(data?.memoryFree) + Number(data?.memoryUsed)) /
                    1024
                  ).toFixed(1)}
                  GB - {data?.temp}°C
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <span className="text-[0.66rem]">
        GPU (
        {gpuData?.reduce((acc, curr) => {
          return (
            acc + (Number(curr?.memoryFree) + Number(curr?.memoryUsed)) / 1024
          );
        }, 0)}
        )
      </span>
    </div>
  );
}
