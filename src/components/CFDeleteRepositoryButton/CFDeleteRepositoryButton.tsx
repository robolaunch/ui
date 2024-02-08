import { ReactElement } from "react";
import CreateRobotFormDeleteButton from "../CreateRobotFormDeleteButton/CreateRobotFormDeleteButton";
import { FormikProps } from "formik/dist/types";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import { handleRemoveRepository } from "../../functions/form.repository.function";

interface ICFDeleteRepositoryButton {
  formik: FormikProps<IWorkspaces>;
  workspaceIndex: number;
  repositoryIndex: number;
  disabled?: boolean;
}

export default function CFDeleteRepositoryButton({
  formik,
  workspaceIndex,
  repositoryIndex,
  disabled,
}: ICFDeleteRepositoryButton): ReactElement {
  return (
    <div
      data-tut="create-robot-step2-workspace-repository-delete-button"
      className="flex items-center"
    >
      <CreateRobotFormDeleteButton
        disabled={
          disabled ||
          formik.values?.workspaces?.[workspaceIndex]?.robotRepositories
            ?.length > 1
            ? false
            : true
        }
        onClick={() => {
          handleRemoveRepository(formik, workspaceIndex, repositoryIndex);
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
