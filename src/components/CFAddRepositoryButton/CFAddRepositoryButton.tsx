import React, { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import useCreateRobot from "../../hooks/useCreateRobot";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFAddRepositoryButton {
  formik: FormikProps<IRobotWorkspaces>;
  workspaceIndex: number;
}

export default function CFAddRepositoryButton({
  formik,
  workspaceIndex,
}: ICFAddRepositoryButton): ReactElement {
  const { handleAddRepositoryToWorkspaceStep } = useCreateRobot();

  return (
    <div data-tut="create-robot-step2-repository-add-button">
      <CreateRobotFormAddButton
        onClick={() =>
          handleAddRepositoryToWorkspaceStep(formik, workspaceIndex)
        }
        disabled={formik.isSubmitting}
      />
    </div>
  );
}
