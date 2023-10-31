import React, { Fragment, ReactElement } from "react";
import FormInputSelect from "../FormInputSelect/FormInputSelect";
import {
  IRobotLaunchStep,
  IRobotWorkspace,
} from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFBuildWorkspace {
  formik: FormikProps<IRobotLaunchStep>;
  disabled?: boolean;
}

export default function CFLaunchWorkspace({
  formik,
  disabled,
}: ICFBuildWorkspace): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <FormInputSelect
      labelName="Workspace:"
      tip="Select a workspace."
      dataTut="create-robot-step4-workspace"
      options={
        <Fragment>
          {!formik?.values?.workspace && <option value=""></option>}
          {robotData?.step2?.workspaces?.map(
            (workspace: IRobotWorkspace, index: number) => (
              <option key={index} value={workspace.name}>
                {workspace.name}
              </option>
            ),
          )}
        </Fragment>
      }
      inputError={formik.errors.workspace}
      inputTouched={formik.touched.workspace}
      disabled={disabled || formik?.isSubmitting}
      inputProps={formik.getFieldProps("workspace")}
    />
  );
}
