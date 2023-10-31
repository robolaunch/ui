import React, { ReactElement } from "react";
import FormInputToggle from "../FormInputToggle/FormInputToggle";
import { IRobotStep1 } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFConfigWorkspaces {
  formik: FormikProps<IRobotStep1>;
  disabled?: boolean;
}

export default function CFConfigWorkspaces({
  formik,
  disabled,
}: ICFConfigWorkspaces): ReactElement {
  return (
    <FormInputToggle
      labelName="Configure Workspaces:"
      labelInfoTip="Configure Workspaces"
      dataTut="create-robot-step1-ros2-bridge"
      disabled={disabled}
      checked={formik?.values?.configureWorkspace}
      onChange={(e: boolean) => {
        formik.setFieldValue("configureWorkspace", e);
      }}
    />
  );
}
