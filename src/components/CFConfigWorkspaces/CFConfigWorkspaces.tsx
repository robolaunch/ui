import React, { ReactElement } from "react";
import CFInputToggle from "../CFInputToggle/CFInputToggle";
import { FormikProps } from "formik/dist/types";
import { IEnvironmentStep1 } from "../../interfaces/envitonment.step1.interface";

interface ICFConfigWorkspaces {
  formik: FormikProps<IEnvironmentStep1>;
  disabled?: boolean;
}

export default function CFConfigWorkspaces({
  formik,
  disabled,
}: ICFConfigWorkspaces): ReactElement {
  return (
    <CFInputToggle
      labelName="Configure Workspaces:"
      labelInfoTip="If you want to specify workspaces, you can do so here."
      dataTut="create-robot-step1-ros2-bridge"
      disabled={disabled}
      checked={formik?.values?.details.configureWorkspace}
      onChange={(e: boolean) => {
        formik.setFieldValue("details.configureWorkspace", e);
      }}
    />
  );
}
