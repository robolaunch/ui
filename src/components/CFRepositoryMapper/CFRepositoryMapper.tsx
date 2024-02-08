import { ReactElement } from "react";
import { FormikProps } from "formik/dist/types";
import CFRepositoryItem from "../CFRepositoryItem/CFRepositoryItem";
import CFWorkspaceHeader from "../CFWorkspaceHeader/CFWorkspaceHeader";
import CFAddRepositoryButton from "../CFAddRepositoryButton/CFAddRepositoryButton";
import { IEnvironmentStep2 } from "../../interfaces/environment/environment.step2.interface";

interface ICFRepositoryMapper {
  formik: FormikProps<IEnvironmentStep2>;
  workspaceIndex: number;
  disabled?: boolean;
}

export default function CFRepositoryMapper({
  formik,
  workspaceIndex,
  disabled,
}: ICFRepositoryMapper): ReactElement {
  return (
    <div
      className="flex flex-col gap-3 p-2"
      data-tut="create-robot-step2-workspace-repositories"
    >
      <CFWorkspaceHeader />
      {formik.values.workspaces[workspaceIndex]?.robotRepositories?.map(
        (repository: any, repositoryIndex: number) => (
          <CFRepositoryItem
            key={repositoryIndex}
            formik={formik}
            workspaceIndex={workspaceIndex}
            repositoryIndex={repositoryIndex}
            repository={repository}
            disabled={disabled}
          />
        ),
      )}
      <CFAddRepositoryButton
        formik={formik}
        workspaceIndex={workspaceIndex}
        disabled={disabled}
      />
    </div>
  );
}
