import React, { ReactElement } from "react";
import StateCell from "../TableInformationCells/StateCell";

interface ILaunchFormAccordionHeader {
  step: any;
  index: number;
  robotData: any;
}

export default function LaunchFormAccordionHeader({
  step,
  index,
  robotData,
}: ILaunchFormAccordionHeader): ReactElement {
  return (
    <div className="flex justify-between animate__animated animate__fadeIn">
      <span className="font-medium">
        {step?.name || `Launch Step # ${index + 1}`}
      </span>

      <div className="flex items-center gap-2 text-xs">
        {step.robotClusters.filter(
          (cluster: any) =>
            cluster?.name !== robotData.step1.physicalInstanceName &&
            cluster.launchManagerStatus
        )?.[0]?.launchManagerStatus && (
          <div className="flex gap-1.5">
            <span
              title={`Launch State of Cloud Instance`}
              className="font-medium"
            >
              Virtual:
            </span>
            <StateCell
              state={
                step.robotClusters.filter(
                  (cluster: any) =>
                    cluster?.name !== robotData.step1.physicalInstanceName &&
                    cluster.launchManagerStatus
                )?.[0]?.launchManagerStatus || "Pending"
              }
            />
          </div>
        )}

        {step.robotClusters.filter(
          (cluster: any) =>
            cluster?.name === robotData.step1.physicalInstanceName &&
            cluster.launchManagerStatus
        )?.[0]?.launchManagerStatus && (
          <div className="flex gap-1.5">
            <span
              title={`Launch State of Physical Instance`}
              className="font-medium"
            >
              Physical:
            </span>
            <StateCell
              state={
                step.robotClusters.filter(
                  (cluster: any) =>
                    cluster?.name === robotData.step1.physicalInstanceName &&
                    cluster.launchManagerStatus
                )?.[0]?.launchManagerStatus || "Pending"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
