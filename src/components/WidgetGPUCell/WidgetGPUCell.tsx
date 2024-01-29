import { Fragment, ReactElement, useState } from "react";
import useMain from "../../hooks/useMain";
import PercentageWidget from "../PercentageBar/PercentageBar";
import InputSelect from "../InputSelect/InputSelect";

export default function WidgetGPUCell(): ReactElement {
  const { pagesState } = useMain();

  const [selectedGPUIndex, setSelectedGPUIndex] = useState<number>(0);

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
            {pagesState?.instance?.resources?.hardware?.gpu?.hardware?.map(
              (gpu, index: number) => {
                return (
                  <option value={index}>
                    GPU {index + 1} {gpu?.model}
                  </option>
                );
              },
            )}
          </Fragment>
        </InputSelect>
        <div className="flex gap-2">
          <PercentageWidget
            percentage={
              pagesState?.instance?.resources?.hardware?.gpu?.hardware?.[
                selectedGPUIndex
              ]?.usagePercent
            }
            title="GPU"
          />
          <PercentageWidget
            percentage={
              pagesState?.instance?.resources?.hardware?.gpu?.hardware?.[
                selectedGPUIndex
              ]?.memory?.percent
            }
            title={`Memory`}
          />
        </div>
        <p
          style={{
            fontSize: "0.66rem",
            lineHeight: "0.75rem",
          }}
        >
          {
            pagesState?.instance?.resources?.hardware?.gpu?.hardware?.[
              selectedGPUIndex
            ]?.memory.totalGB
          }
          GB |{" "}
          {
            pagesState?.instance?.resources?.hardware?.gpu?.hardware?.[
              selectedGPUIndex
            ]?.watt
          }
          W |{" "}
          {
            pagesState?.instance?.resources?.hardware?.gpu?.hardware?.[
              selectedGPUIndex
            ]?.temperature
          }
          °C
        </p>
      </div>
    </div>
  );
}
