import React, { ReactElement } from "react";
import CFInputToggle from "../CFInputToggle/CFInputToggle";
import { IDetails } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFConfigWorkspaces {
  formik: FormikProps<IDetails>;
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
      checked={formik?.values?.configureWorkspace}
      onChange={(e: boolean) => {
        formik.setFieldValue("configureWorkspace", e);
      }}
    />
  );
}
