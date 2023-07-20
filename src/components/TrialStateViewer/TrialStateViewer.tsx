import React, { Fragment, ReactElement } from "react";
import TrialCardLayout from "../../layouts/TrialCardLayout";
import StateCell from "../Cells/StateCell";
import Seperator from "../Seperator/Seperator";

interface ITrialStateViewer {
  layoutClassName?: string;
}

export default function TrialStateViewer({
  layoutClassName,
}: ITrialStateViewer): ReactElement {
  const states = [
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
  ];

  return (
    <TrialCardLayout className={layoutClassName} title="State">
      <div className="h-full flex flex-col items-center justify-center gap-4">
        {states?.map((item: any, index: number) => {
          return (
            <Fragment>
              <div key={index} className="w-full flex justify-between">
                <div className="flex items-center gap-2">
                  <img
                    className="w-5 h-5"
                    src={`/svg/general/${item?.path}/${item?.path}-gray.svg`}
                    alt="robolaunch"
                  />
                  <span className="capitalize text-xs">{item?.name}</span>
                </div>
                <StateCell state={item?.success ? "Ready" : item?.state} />
              </div>
              {index !== states?.length - 1 && <Seperator />}
            </Fragment>
          );
        })}
      </div>
    </TrialCardLayout>
  );
}
