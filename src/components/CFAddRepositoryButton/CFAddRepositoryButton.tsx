import React, { ReactElement } from "react";
import CreateRobotFormAddButton from "../CreateRobotFormAddButton/CreateRobotFormAddButton";
import useCreateRobot from "../../hooks/useCreateRobot";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFAddRepositoryButton {
  formik: FormikProps<IWorkspaces>;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFAddRepositoryButton({
  formik,
  workspaceIndex,
  disabled,
}: ICFAddRepositoryButton): ReactElement {
  const { handleAddRepositoryToWorkspaceStep } = useCreateRobot();

  return (
    <div data-tut="create-robot-step2-repository-add-button">
      <CreateRobotFormAddButton
        onClick={() =>
          handleAddRepositoryToWorkspaceStep(formik, workspaceIndex)
        }
        disabled={formik.isSubmitting || disabled}
      />
    </div>
  );
}
