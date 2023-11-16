import React, { ReactElement } from "react";
import CFRepositoryURL from "../CFRepositoryURL/CFRepositoryURL";
import CFRepositoryBranch from "../CFRepositoryBranch/CFRepositoryBranch";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFRepositoryURLBranch {
  formik: FormikProps<IWorkspaces>;
  workspaceIndex: number;
  repositoryIndex: number;
  disabled?: boolean;
}

export default function CFRepositoryURLBranch({
  formik,
  workspaceIndex,
  repositoryIndex,
  disabled,
}: ICFRepositoryURLBranch): ReactElement {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-3">
        <CFRepositoryURL
          formik={formik}
          repositoryIndex={repositoryIndex}
          workspaceIndex={workspaceIndex}
          disabled={disabled}
        />
      </div>
      <div className="col-span-1">
        <CFRepositoryBranch
          formik={formik}
          repositoryIndex={repositoryIndex}
          workspaceIndex={workspaceIndex}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
