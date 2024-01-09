import { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import useCreateRobot from "../../hooks/useCreateRobot";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFAddWorkspaceButton {
  formik: FormikProps<IWorkspaces>;
  disabled?: boolean;
}

export default function CFAddWorkspaceButton({
  formik,
  disabled,
}: ICFAddWorkspaceButton): ReactElement {
  const { handleAddWorkspaceStep } = useCreateRobot();

  return (
    <div data-tut="create-robot-step2-workspace-add-button">
      <CreateRobotFormAddButton
        onClick={() => handleAddWorkspaceStep(formik)}
        disabled={formik.isSubmitting}
      />
    </div>
  );
}
