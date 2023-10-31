import React, { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import useCreateRobot from "../../hooks/useCreateRobot";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFAddWorkspaceButton {
  formik: FormikProps<IRobotWorkspaces>;
}

export default function CFAddWorkspaceButton({
  formik,
}: ICFAddWorkspaceButton): ReactElement {
  const { handleAddWorkspaceStep } = useCreateRobot();

  return (
    <div data-tut="create-robot-step2-workspace-add-button">
      <CreateRobotFormAddButton
        onClick={() => handleAddWorkspaceStep(formik)}
      />
    </div>
  );
}
