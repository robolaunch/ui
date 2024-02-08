import { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import { FormikProps } from "formik/dist/types";
import { handleAddWorkspace } from "../../functions/form.workspace.function";
import { IEnvironmentStep2 } from "../../interfaces/environment/environment.step2.interface";

interface ICFAddWorkspaceButton {
  formik: FormikProps<IEnvironmentStep2>;
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
