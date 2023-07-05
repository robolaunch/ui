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
    <div className="flex flex-col items-center gap-6 w-full">
      <div className="relative w-full h-fit flex items-center justify-between text-xs">
        {steps?.map((step: any, index: number) => {
          return (
            <div
              className={`flex flex-col gap-1 z-20
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
              flex items-center justify-center w-7 h-7 rounded-full font-semibold border  ${
                index + 1 > currentStep
                  ? "bg-layer-primary-300 border-layer-primary-600 text-layer-primary-900"
                  : index + 1 < currentStep
                  ? "bg-green-200 border-green-500 text-green-900"
                  : "bg-layer-secondary-200 border-layer-secondary-500 text-layer-secondary-900 animate__animated animate__pulse animate__fast animate__infinite"
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
          className="absolute inset-0 h-0.5 w-full top-3.5 bg-layer-primary-200 appearance-none"
        />
      </div>
      <ul className="flex flex-col items-start text-xs gap-1 border border-layer-light-100 shadow-sm px-12 py-4 rounded w-fit">
        {steps?.[currentStep - 1]?.process?.map(
          (process: any, index: number) => {
            return (
              <li key={index} className="flex items-center gap-1">
                {process?.isFinished ? (
                  <BsCheck2Circle size={16} className="!text-green-500 " />
                ) : (
                  <img
                    className="w-4 scale-[2.25] mx-auto"
                    src="/svg/general/loading.svg"
                    alt="Loading..."
                  />
                )}
                <span>{process?.name}</span>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
}
