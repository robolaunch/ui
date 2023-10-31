import React, { ReactElement } from "react";
import CFWorkspaceName from "../CFWorkspaceName/CFWorkspaceName";
import CFWorkspaceDistro from "../CFWorkspaceDistro/CFWorkspaceDistro";
import { envOnPremiseRobot } from "../../helpers/envProvider";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFWorkspaceNameDistro {
  formik: FormikProps<IRobotWorkspaces>;
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

      {!envOnPremiseRobot && (
        <CFWorkspaceDistro
          formik={formik}
          workspaceIndex={workspaceIndex}
          disabled={disabled}
        />
      )}
    </div>
  );
}
