import React, { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFWorkspaceName {
  formik: FormikProps<IWorkspaces>;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFWorkspaceName({
  formik,
  workspaceIndex,
  disabled,
}: ICFWorkspaceName): ReactElement {
  return (
    <FormInputText
      dataTut="create-robot-step2-workspace-name"
      labelName="Workspace Name:"
      labelInfoTip="You can specify the name of your workspace here.

"
      inputProps={formik.getFieldProps(`workspaces.${workspaceIndex}.name`)}
      classNameContainer="w-full"
      disabled={disabled}
      inputError={
        // @ts-ignore
        formik?.errors?.workspaces?.[workspaceIndex]?.name
      }
      inputTouched={formik?.touched?.workspaces?.[workspaceIndex]?.name}
      inputHoverText="You can specify the name of your workspace here.

"
    />
  );
}
