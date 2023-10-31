import React, { ReactElement } from "react";
import StateCell from "../TableInformationCells/StateCell";

interface ICFBuildStepItemAccordionHeader {
  buildStep: any;
  buildStepIndex: number;
  isImportRobot?: boolean;
}

export default function CFBuildStepItemAccordionHeader({
  buildStep,
  buildStepIndex,
  isImportRobot,
}: ICFBuildStepItemAccordionHeader): ReactElement {
  return (
    <div className="flex justify-between">
      <span className="font-medium">
        {buildStep.name
          ? buildStep?.name + ` (Build Step #${buildStepIndex + 1})`
          : `Build Step #${buildStepIndex + 1}`}
      </span>
      {isImportRobot && buildStep?.buildStatus && (
        <div className="flex items-center gap-2 text-xs">
          <div className="flex gap-1.5">
            <span
              title={`Launch State of Cloud Instance`}
              className="font-medium"
            >
              Status:
            </span>
            <StateCell state={buildStep?.buildStatus || "Waiting"} />
          </div>
        </div>
      )}
    </div>
  );
}
