import { ReactElement } from "react";
import { FormikProps } from "formik/dist/types";
import { IWorkspaces } from "../../interfaces/robotInterfaces";
import CFRepositoryItem from "../CFRepositoryItem/CFRepositoryItem";
import CFWorkspaceHeader from "../CFWorkspaceHeader/CFWorkspaceHeader";
import CFAddRepositoryButton from "../CFAddRepositoryButton/CFAddRepositoryButton";

interface ICFRepositoryMapper {
  formik: FormikProps<IWorkspaces>;
  workspaceIndex: number;
}

export default function CFRepositoryMapper({
  formik,
  workspaceIndex,
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
          />
        ),
      )}
      <CFAddRepositoryButton formik={formik} workspaceIndex={workspaceIndex} />
    </div>
  );
}
