import React, { Fragment, ReactElement } from "react";
import { MdVerified } from "react-icons/md";

interface ICreateRobotFormLoader {
  isLoading?: boolean;
  loadingItems: any;
  loadingText?: string;
  children?: ReactElement | ReactElement[];
}

export default function CreateRobotFormLoader({
  isLoading,
  loadingItems,
  loadingText,
  children,
}: ICreateRobotFormLoader): ReactElement {
  return (
    <Fragment>
      {isLoading ? (
        <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
          <img
            className="w-12 mx-auto pt-10"
            src="/svg/general/loading.svg"
            alt="Loading..."
          />
          <span className="text-sm text-layer-light-900 pb-4">
            {loadingText ||
              "Please wait while we create your robot. This may take a few minutes."}
          </span>
          <div className="w-full flex gap-4">
            {loadingItems?.map((item: any, index: number) => {
              return (
                <div
                  key={index}
                  className="w-full flex flex-col gap-3 justify-center items-center border border-layer-light-100 shadow rounded p-4"
                >
                  <div className="flex items-center justify-center">
                    {item?.status === "EnvironmentReady" ||
                    item?.status === "Ready" ? (
                      <MdVerified size={20} className="!text-green-500" />
                    ) : (
                      <img
                        className="w-12 mx-auto"
                        src="/svg/general/loading.svg"
                        alt="Loading..."
                      />
                    )}
                  </div>
                  {loadingItems?.length && (
                    <Fragment>
                      <span className="font-semibold text-sm text-layer-light-900">
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
        </div>
      ) : (
        children
      )}
    </Fragment>
  );
}
