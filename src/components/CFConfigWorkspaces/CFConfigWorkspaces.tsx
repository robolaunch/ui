import React, { ReactElement } from "react";
import FormInputToggle from "../FormInputToggle/FormInputToggle";

interface ICFConfigWorkspaces {
  formik: any;
  isImportRobot?: boolean;
}

export default function CFConfigWorkspaces({
  formik,
  isImportRobot,
}: ICFConfigWorkspaces): ReactElement {
  return (
    <FormInputToggle
      labelName="Configure Workspaces:"
      labelInfoTip="Configure Workspaces"
      dataTut="create-robot-step1-ros2-bridge"
      disabled={isImportRobot}
      checked={formik?.values?.configureWorkspace}
      onChange={(e: boolean) => {
        formik.setFieldValue("configureWorkspace", e);
      }}
    />
  );
}
