import React, { ReactElement } from "react";
import useCreateRobot from "../../hooks/useCreateRobot";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { FormikProps } from "formik/dist/types";

interface ICFDeleteWorkspaceButton {
  formik: FormikProps<IWorkspaces>;
  workspaceIndex: number;
}

export default function CFDeleteWorkspaceButton({
  formik,
  workspaceIndex,
}: ICFDeleteWorkspaceButton): ReactElement {
  const { handleRemoveWorkspaceStep } = useCreateRobot();

  return (
    <div
      className="flex items-center"
      data-tut="create-robot-step2-workspace-delete-button"
    >
      <CreateRobotFormDeleteButton
        disabled={formik.values.workspaces.length > 1 ? false : true}
        onClick={() => {
          handleRemoveWorkspaceStep(formik, workspaceIndex);
        }}
        text={`Delete ${
          formik.values.workspaces[workspaceIndex]?.name || "this"
        } Workspace`}
      />
    </div>
  );
}
