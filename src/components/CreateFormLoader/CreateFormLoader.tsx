import React, { Fragment, ReactElement } from "react";
import { MdVerified } from "react-icons/md";
import "react-step-progress-bar/styles.css";
import CreateRobotFormStepbar from "../CreateRobotFormStepbar/CreateRobotFormStepbar";
import { useParams } from "react-router-dom";
import CreateRobotFormCancelButton from "../CreateRobotFormCancelButton/CreateRobotFormCancelButton";
import CreateFormTourSwither from "../CreateFormTourSwither/CreateFormTourSwither";
interface ICreateFormLoader {
  type: "step1-robot" | "step1-app" | "workspace" | "build" | "launch";
  isLoading?: boolean;
  loadingItems?: any[];
  loadingText?: string;
  children?: ReactElement | ReactElement[];
  stepbarItems?: any[];
  currentStep?: number;
  formik?: any;
}

export default function CreateFormLoader({
  type,
  isLoading,
  loadingItems,
  loadingText,
  children,
  stepbarItems,
  currentStep,
  formik,
}: ICreateFormLoader): ReactElement {
  const url = useParams();

  return (
    <Fragment>
      {isLoading ? (
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <img
              className="mx-auto w-12 pt-10"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
            <span className="pb-4 text-sm text-layer-light-900">
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
                      className="flex w-full flex-col items-center justify-center gap-3 rounded border border-layer-light-100 p-4 shadow"
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
                          <span className="text-sm font-semibold text-layer-light-900">
                            {item?.name}
                          </span>
                          <span className="text-sm text-layer-dark-700">
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
          {!url?.robotName && <CreateRobotFormCancelButton disabled={false} />}
        </div>
      ) : (
        <form
          onSubmit={formik.handleSubmit}
          className="animate__animated animate__fadeIn relative flex flex-col gap-4"
        >
          {children}
        </form>
      )}
      <CreateFormTourSwither type={type} isLoading={isLoading} />
    </Fragment>
  );
}
