import CFWorkspaceDistro from "../CFWorkspaceDistro/CFWorkspaceDistro";
import CFWorkspaceName from "../CFWorkspaceName/CFWorkspaceName";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import { ReactElement } from "react";
import useMain from "../../hooks/useMain";

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
  const { applicationMode } = useMain();

  return (
    <div className="flex gap-2">
      <CFWorkspaceName
        formik={formik}
        workspaceIndex={workspaceIndex}
        disabled={disabled}
      />

      {!applicationMode && (
        <CFWorkspaceDistro
          formik={formik}
          workspaceIndex={workspaceIndex}
          disabled={disabled}
        />
      )}
    </div>
  );
}
