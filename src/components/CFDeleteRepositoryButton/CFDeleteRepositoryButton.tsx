import React, { ReactElement } from "react";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import { FormikProps } from "formik/dist/types";
import { IRobotWorkspaces } from "../../interfaces/robotInterfaces";
import useCreateRobot from "../../hooks/useCreateRobot";

interface ICFDeleteRepositoryButton {
  formik: FormikProps<IRobotWorkspaces>;
  workspaceIndex: number;
  repositoryIndex: number;
}

export default function CFDeleteRepositoryButton({
  formik,
  workspaceIndex,
  repositoryIndex,
}: ICFDeleteRepositoryButton): ReactElement {
  const { handleRemoveRepositoryFromWorkspaceStep } = useCreateRobot();

  return (
    <div
      data-tut="create-robot-step2-workspace-repository-delete-button"
      className="flex items-center"
    >
      <CreateRobotFormDeleteButton
        disabled={
          formik.values?.workspaces?.[workspaceIndex]?.robotRepositories
            ?.length > 1
            ? false
            : true
        }
        onClick={() => {
          handleRemoveRepositoryFromWorkspaceStep(
            formik,
            workspaceIndex,
            repositoryIndex,
          );
        }}
        text={`Delete ${
          formik.values?.workspaces?.[workspaceIndex]?.robotRepositories[
            repositoryIndex
          ].name || "this"
        } Repository`}
      />
    </div>
  );
}
