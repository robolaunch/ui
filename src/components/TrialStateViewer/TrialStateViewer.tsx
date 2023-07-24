import React, { Fragment, ReactElement, useEffect, useState } from "react";
import TrialCardLayout from "../../layouts/TrialCardLayout";
import StateCell from "../Cells/StateCell";
import Seperator from "../Seperator/Seperator";
import useTrial from "../../hooks/useTrial";

interface ITrialStateViewer {
  layoutClassName?: string;
}

export default function TrialStateViewer({
  layoutClassName,
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
      state: "Creating",
      success: false,
    },
    {
      name: "cloud instance",
      path: "instance",
      state: "Pending",
      success: false,
    },
    {
      name: "fleet",
      path: "fleet",
      state: "Pending",
      success: false,
    },
  ]);

  useEffect(() => {
    setStates([
      {
        name: "organization",
        path: "organization",
        state: trialState?.organization ? "Ready" : "Pending",
        success: trialState?.organization ? true : false,
      },
      {
        name: "robotics cloud",
        path: "roboticscloud",
        state: trialState?.roboticsCloud ? "Ready" : "Pending",
        success: trialState?.roboticsCloud ? true : false,
      },
      {
        name: "cloud instance",
        path: "instance",
        state: trialState?.instance?.instanceCloudState || "Pending",
        success:
          trialState?.instance?.instanceCloudState === "ConnectionHub_Ready"
            ? true
            : false,
      },
      {
        name: "fleet",
        path: "fleet",
        state: trialState?.fleet?.fleetStatus || "Pending",
        success: trialState?.fleet?.fleetStatus === "Ready" ? true : false,
      },
    ]);
  }, [trialState]);

  return (
    <TrialCardLayout className={layoutClassName} title="State">
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
              {index !== states?.length - 1 && <Seperator />}
            </Fragment>
          );
        })}
      </div>
    </TrialCardLayout>
  );
}
