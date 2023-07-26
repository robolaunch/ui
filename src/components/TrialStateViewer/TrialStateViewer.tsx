import React, { Fragment, ReactElement, useEffect, useState } from "react";
import StateCell from "../Cells/StateCell";
import Seperator from "../Seperator/Seperator";
import useTrial from "../../hooks/useTrial";
import useSidebar from "../../hooks/useSidebar";

interface ITrialStateViewer {
  handleCloseModal?: () => void;
}

export default function TrialStateViewer({
  handleCloseModal,
}: ITrialStateViewer): ReactElement {
  const { trialState } = useTrial();
  const [states, setStates] = useState<any>([
    {
      name: "organization",
      path: "organization",
      state: "Pending",
      success: true,
    },
    {
      name: "robotics cloud",
      path: "roboticscloud",
      state: "Pending",
      success: false,
    },
    {
      name: "cloud instance",
      path: "instance",
      state: "Pending",
      success: false,
    },
  ]);

  useEffect(() => {
    setStates([
      {
        name: "organization",
        path: "organization",
        state: trialState?.organization ? "Ready" : "None",
        success: trialState?.organization ? true : false,
      },
      {
        name: "robotics cloud",
        path: "roboticscloud",
        state: trialState?.roboticsCloud ? "Ready" : "None",
        success: trialState?.roboticsCloud ? true : false,
      },
      {
        name: "cloud instance",
        path: "instance",
        state: trialState?.instance?.instanceCloudState || "None",
        success:
          trialState?.instance?.instanceCloudState === "ConnectionHub_Ready"
            ? true
            : false,
      },
    ]);
  }, [
    trialState?.organization,
    trialState?.roboticsCloud,
    trialState?.instance,
  ]);

  const { setSidebarState } = useSidebar();

  function handleRedirectSidebar() {
    if (!trialState?.organization) {
      setSidebarState((prevState: any) => ({
        ...prevState,
        page: "organization",
        isOpen: true,
      }));
    } else if (!trialState?.roboticsCloud) {
      setSidebarState((prevState: any) => ({
        ...prevState,
        page: "roboticscloud",
        isOpen: true,
      }));
    } else if (!trialState?.instance) {
      setSidebarState((prevState: any) => ({
        ...prevState,
        page: "instance",
        isOpen: true,
      }));
    }
    handleCloseModal && handleCloseModal();
  }

  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      {states?.map((item: any, index: number) => {
        return (
          <Fragment key={index}>
            <div className="w-full flex justify-between">
              <div className="flex items-center gap-2">
                <img
                  className="w-5 h-5"
                  src={`/svg/general/${item?.path}/${item?.path}-gray.svg`}
                  alt="robolaunch"
                />
                <span className="capitalize text-xs">{item?.name}</span>
              </div>
              <div className="flex items-center gap-4">
                {item?.state === "None" && (
                  <span
                    className="text-xs text-layer-dark-300 
                    cursor-pointer underline"
                    onClick={handleRedirectSidebar}
                  >
                    Create
                  </span>
                )}
                <StateCell
                  state={item?.success ? "Ready" : item?.state}
                  isRobolaunchState={
                    trialState?.instance?.instanceCloudState &&
                    item?.path === "instance"
                      ? true
                      : false
                  }
                />
              </div>
            </div>
            {index !== states?.length - 1 && <Seperator />}
          </Fragment>
        );
      })}
    </div>
  );
}
