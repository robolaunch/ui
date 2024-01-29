import CFBuildStepItem from "../CFBuildStepItem/CFBuildStepItem";
import { FormikProps } from "formik/dist/types";
import CFInfoBar from "../CFInfoBar/CFInfoBar";
import { ReactElement } from "react";
import { IEnvironmentStep3 } from "../../interfaces/envitonment.step3.interface";

interface ICFBuildMapper {
  formik: FormikProps<IEnvironmentStep3>;
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
        {formik?.values?.steps?.map(
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
