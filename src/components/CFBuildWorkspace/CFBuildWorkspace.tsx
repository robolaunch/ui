import React, { Fragment } from "react";
import FormInputSelect from "../FormInputSelect/FormInputSelect";
import {
  IRobotBuildSteps,
  IRobotWorkspace,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFBuildWorkspace {
  formik: FormikProps<IRobotBuildSteps>;
  buildStepIndex: number;
}

export default function CFBuildWorkspace({
  formik,
  buildStepIndex,
}: ICFBuildWorkspace): React.ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <FormInputSelect
      dataTut="create-robot-build-step-workspace"
      labelName="Workspace:"
      tip="Select a workspace name."
      inputError={
        // @ts-ignore
        formik?.errors?.robotBuildSteps?.[buildStepIndex]?.workspace
      }
      inputTouched={
        formik?.touched?.robotBuildSteps?.[buildStepIndex]?.workspace
      }
      inputProps={formik.getFieldProps(
        `robotBuildSteps.${buildStepIndex}.workspace`,
      )}
      options={
        <Fragment>
          {!formik?.values?.robotBuildSteps[buildStepIndex]?.workspace && (
            <option value=""></option>
          )}
          {robotData?.step2?.workspaces?.map(
            (workspace: IRobotWorkspace, index: number) => (
              <option key={index} value={workspace.name}>
                {workspace.name}
              </option>
            ),
          )}
        </Fragment>
      }
    />
  );
}
