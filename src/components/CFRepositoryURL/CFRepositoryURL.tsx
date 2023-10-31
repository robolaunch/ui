import React from "react";
import FormInputText from "../FormInputText/FormInputText";

interface ICFRepositoryURL {
  formik: any;
  workspaceIndex: number;
  repositoryIndex: number;
  disabled?: boolean;
}

export default function CFRepositoryURL({
  formik,
  workspaceIndex,
  repositoryIndex,
  disabled,
}: ICFRepositoryURL): React.ReactElement {
  return (
    <FormInputText
      dataTut="create-robot-step2-workspace-repository-url"
      labelName="Repository URL:"
      labelInfoTip="Type a repository URL."
      inputProps={formik.getFieldProps(
        `workspaces.${workspaceIndex}.robotRepositories.${repositoryIndex}.url`,
      )}
      disabled={disabled}
      inputError={
        //prettier-ignore
        // @ts-ignore
        formik?.errors?.workspaces?.[workspaceIndex]?.robotRepositories?.[repositoryIndex]?.url
      }
      inputTouched={
        formik?.touched?.workspaces?.[workspaceIndex]?.robotRepositories?.[
          repositoryIndex
        ]?.url
      }
    />
  );
}
