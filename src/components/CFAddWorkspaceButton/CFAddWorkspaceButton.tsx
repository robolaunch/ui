import { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";
import { handleAddWorkspace } from "../../functions/form.workspace.function";

interface ICFAddWorkspaceButton {
  formik: FormikProps<IWorkspaces>;
  disabled?: boolean;
}

export default function CFAddWorkspaceButton({
  formik,
  disabled,
}: ICFAddWorkspaceButton): ReactElement {
  return (
    <div data-tut="create-robot-step2-workspace-add-button">
      <CreateRobotFormAddButton
        onClick={() => handleAddWorkspace(formik)}
        disabled={formik.isSubmitting || disabled}
      />
    </div>
  );
}
