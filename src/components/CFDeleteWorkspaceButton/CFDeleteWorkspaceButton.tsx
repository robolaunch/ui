import { ReactElement } from "react";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import { handleRemoveWorkspace } from "../../functions/form.workspace.function";

interface ICFDeleteWorkspaceButton {
  formik: FormikProps<IWorkspaces>;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFDeleteWorkspaceButton({
  formik,
  workspaceIndex,
  disabled,
}: ICFDeleteWorkspaceButton): ReactElement {
  return (
    <div
      className="flex items-center"
      data-tut="create-robot-step2-workspace-delete-button"
    >
      <CreateRobotFormDeleteButton
        disabled={formik.values.workspaces.length > 1 ? false : true}
        onClick={() => {
          handleRemoveWorkspace(formik, workspaceIndex);
        }}
        text={`Delete ${
          formik.values.workspaces[workspaceIndex]?.name || "this"
        } Workspace`}
      />
    </div>
  );
}
