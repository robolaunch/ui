import React, { ReactElement } from "react";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import CFBuildStepItem from "../CFBuildStepItem/CFBuildStepItem";
import { IRobotBuildSteps } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFBuildMapper {
  formik: FormikProps<IRobotBuildSteps>;
  responseBuildManager: any;
  isImportRobot?: boolean;
}

export default function CFBuildMapper({
  formik,
  responseBuildManager,
  isImportRobot,
}: ICFBuildMapper): ReactElement {
  return (
    <CFInfoBar
      label="Build Steps"
      tip="Build Steps"
      dataTut="create-robot-step3-steps"
      vertical
    >
      <div className="flex flex-col gap-2">
        {formik?.values?.robotBuildSteps?.map(
          (buildStep: any, buildStepIndex: number) => {
            return (
              <CFBuildStepItem
                key={buildStepIndex}
                formik={formik}
                buildStep={buildStep}
                buildStepIndex={buildStepIndex}
                isImportRobot={isImportRobot || false}
              />
            );
          },
        )}
      </div>
    </CFInfoBar>
  );
}
