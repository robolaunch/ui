import { Fragment, ReactElement, useEffect, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";
import InputSelect from "../InputSelect/InputSelect";

export default function WidgetGPUCell(): ReactElement {
  const { pagesState } = useMain();

  const [selectedGPUIndex, setSelectedGPUIndex] = useState<number>(0);

  const [gpuStates, setGPUStates] = useState<
    | {
        deviceID: string;
        deviceModel: string;
        temperature: number;
        powerUsage: number;
        gpuPercentage: number;
        memoryUsed: number;
        memoryFree: number;
        memoryTotal: number;
        memoryPercentage: number;
      }[]
    | undefined
  >(undefined);

  useEffect(() => {
    setGPUStates(
      pagesState?.instance?.cloudInstanceResource?.gpuDeviceUsage?.map(
        (gpu: {
          device: string;
          gpuUtil: string;
          memoryFree: string;
          memoryUsed: string;
          memoryUtil: string;
          model: string;
          powerUsage: string;
          temp: string;
          uuid: string;
        }) => {
          return {
            deviceID: gpu?.device,
            deviceModel: gpu?.model,
            temperature: Number(gpu?.temp),
            powerUsage: Number(gpu?.powerUsage?.split(".")[0]),
            gpuPercentage: Number(gpu?.gpuUtil),
            memoryUsed: Number(gpu?.memoryUsed),
            memoryFree: Number(gpu?.memoryFree),
            memoryTotal: Number(
              (
                (Number(gpu?.memoryUsed) + Number(gpu?.memoryFree)) /
                1024
              ).toFixed(0),
            ),
            memoryPercentage:
              Number(
                (
                  Number(gpu?.memoryUsed) /
                  (Number(gpu?.memoryUsed) + Number(gpu?.memoryFree))
                )?.toFixed(0),
              ) * 100,
          };
        },
      ),
    );
  }, [pagesState?.instance?.cloudInstanceResource]);

  return (
    <div className="flex items-center justify-center">
      <div className=" flex w-full flex-col items-center gap-1 ">
        <InputSelect
          value={String(selectedGPUIndex)}
          onChange={(e) => {
            setSelectedGPUIndex(Number(e.target.value));
          }}
          className="h-8 !border-light-200 text-xs font-medium"
        >
          <Fragment>
            {gpuStates?.map((gpu, index: number) => {
              return (
                <option value={index}>
                  GPU {index + 1} {gpu?.deviceModel}
                </option>
              );
            })}
          </Fragment>
        </InputSelect>
        <div className="flex gap-2">
          <PercentageWidget
            percentage={gpuStates?.[selectedGPUIndex]?.gpuPercentage}
            title="GPU"
          />
          <PercentageWidget
            percentage={gpuStates?.[selectedGPUIndex]?.memoryPercentage}
            title={`Memory`}
          />
        </div>
        <p
          style={{
            fontSize: "0.66rem",
            lineHeight: "0.75rem",
          }}
        >
          {gpuStates?.[selectedGPUIndex]?.memoryTotal}GB |{" "}
          {gpuStates?.[selectedGPUIndex]?.powerUsage}W |{" "}
          {gpuStates?.[selectedGPUIndex]?.temperature}°C
        </p>
      </div>
    </div>
  );
}
