import React, { ReactElement } from "react";
import { BsCheck2Circle } from "react-icons/bs";

interface IStepbar {
  steps: any[];
  currentStep: number;
}

export default function Stepbar({
  steps,
  currentStep,
}: IStepbar): ReactElement {
  return (
    <div className="flex w-full flex-col items-center gap-12">
      <div className="relative flex h-fit w-full items-center justify-between text-xs">
        {steps?.map((step: any, index: number) => {
          return (
            <div
              key={index}
              className={`z-20 flex flex-col gap-1
         ${
           index === 0
             ? "items-start"
             : index === steps?.length - 1
             ? "items-end"
             : "items-center"
         }
          `}
            >
              <div
                className={`
              flex h-7 w-7 items-center justify-center rounded-full border font-semibold  ${
                index + 1 > currentStep
                  ? "border-layer-primary-600 bg-layer-primary-300 text-layer-primary-900"
                  : index + 1 < currentStep
                  ? "border-green-500 bg-green-200 text-green-900"
                  : "animate__animated animate__pulse animate__fast animate__infinite border-layer-secondary-500 bg-layer-secondary-200 text-layer-secondary-900"
              }`}
              >
                <span>{index + 1}</span>
              </div>
              <span>{step?.name}</span>
            </div>
          );
        })}
        <progress
          value={currentStep - 1}
          max={steps?.length - 1}
          className="absolute inset-0 top-3.5 h-0.5 w-full appearance-none bg-layer-primary-200"
        />
      </div>
      <ul className="flex w-fit flex-col items-start gap-1 rounded border border-layer-light-100 px-12 py-4 text-xs shadow-sm">
        {steps?.[currentStep - 1]?.process?.map(
          (process: any, index: number) => {
            return (
              <li key={index} className="flex items-center gap-1">
                {process?.isFinished ? (
                  <BsCheck2Circle size={16} className="!text-green-500 " />
                ) : (
                  <img
                    className="mx-auto w-4 scale-[2.25]"
                    src="/svg/general/loading.svg"
                    alt="Loading..."
                  />
                )}
                <span>{process?.name}</span>
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
}
