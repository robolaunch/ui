import React, { ReactElement } from "react";
import FormInputText from "../FormInputText/FormInputText";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFRepositoryName {
  formik: FormikProps<IRobotWorkspaces>;
  workspaceIndex: number;
  repositoryIndex: number;
  disabled?: boolean;
}

export default function CFRepositoryName({
  formik,
  workspaceIndex,
  repositoryIndex,
  disabled,
}: ICFRepositoryName): ReactElement {
  return (
    <FormInputText
      dataTut="create-robot-step2-workspace-repository-name"
      labelName="Repository Name:"
      labelInfoTip="Type a repository name."
      inputProps={formik.getFieldProps(
        `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.name`,
      )}
      disabled={disabled}
      inputError={
        // @ts-ignore
        formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[
          repositoryIndex
        ]?.name
      }
      inputTouched={
        formik?.touched?.workspaces?.[workspaceIndex]?.robotRepositories?.[
          repositoryIndex
        ]?.name
      }
    />
  );
}
