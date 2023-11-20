import CFWorkspaceDistro from "../CFWorkspaceDistro/CFWorkspaceDistro";
import CFWorkspaceName from "../CFWorkspaceName/CFWorkspaceName";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { envApplication } from "../../helpers/envProvider";
import { FormikProps } from "formik/dist/types";
import { ReactElement } from "react";

interface ICFWorkspaceNameDistro {
  formik: FormikProps<IWorkspaces>;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFWorkspaceNameDistro({
  formik,
  workspaceIndex,
  disabled,
}: ICFWorkspaceNameDistro): ReactElement {
  return (
    <div className="flex gap-2">
      <CFWorkspaceName
        formik={formik}
        workspaceIndex={workspaceIndex}
        disabled={disabled}
      />

      {!envApplication && (
        <CFWorkspaceDistro
          formik={formik}
          workspaceIndex={workspaceIndex}
          disabled={disabled}
        />
      )}
    </div>
  );
}
