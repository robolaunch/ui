import { Fragment, ReactElement } from "react";
import CreateRobotFormStepbar from "../CreateRobotFormStepbar/CreateRobotFormStepbar";
import { MdVerified } from "react-icons/md";
import CFCancelButton from "../CFCancelButton/CFCancelButton";
import { useParams } from "react-router-dom";

interface ICFLoading {
  loadingText?: string;
  loadingItems?: any[];
  stepbarItems?: any[];
  currentStep?: number;
}

export default function CFLoading({
  loadingText,
  loadingItems,
  stepbarItems,
  currentStep,
}: ICFLoading): ReactElement {
  const url = useParams();

  return (
    <div className="flex h-full w-full flex-col items-center justify-between">
      <div className="flex h-full w-full flex-col items-center justify-center gap-2">
        <img
          className="mx-auto w-12 pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
        <span className="pb-4 text-sm text-light-900">
          {loadingText ||
            "Please wait while we create your robot. This may take a few minutes."}
        </span>
        {stepbarItems && currentStep && !url?.robotName ? (
          <CreateRobotFormStepbar
            steps={stepbarItems || []}
            currentStep={currentStep || 1}
          />
        ) : (
          <div className="flex w-full gap-4">
            {loadingItems?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="flex w-full flex-col items-center justify-center gap-3 rounded border border-light-100 p-4 shadow"
                >
                  <div className="flex items-center justify-center">
                    {item?.status === "EnvironmentReady" ||
                    item?.status === "Ready" ? (
                      <MdVerified size={20} className="!text-green-500" />
                    ) : (
                      <img
                        className="mx-auto w-12"
                        src="/svg/general/loading.svg"
                        alt="Loading..."
                      />
                    )}
                  </div>
                  {loadingItems?.length && (
                    <Fragment>
                      <span className="text-sm font-semibold text-light-900">
                        {item?.name}
                      </span>
                      <span className="text-sm text-light-950">
                        {item?.status || "Loading..."}
                      </span>
                    </Fragment>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {!url?.robotName && <CFCancelButton disabled={false} />}
    </div>
  );
}
