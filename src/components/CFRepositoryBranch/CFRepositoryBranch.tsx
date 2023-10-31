import React, { ReactElement } from "react";
import CreateFormBrachInput from "../CreateFormBranchInput/CreateFormBranchInput";

interface ICFRepositoryBranch {
  formik: any;
  workspaceIndex: number;
  repositoryIndex: number;
  disabled?: boolean;
}

export default function CFRepositoryBranch({
  formik,
  workspaceIndex,
  repositoryIndex,
  disabled,
}: ICFRepositoryBranch): ReactElement {
  return (
    <CreateFormBrachInput
      formik={formik}
      repositoryIndex={repositoryIndex}
      workspaceIndex={workspaceIndex}
      disabled={disabled}
    />
  );
}
