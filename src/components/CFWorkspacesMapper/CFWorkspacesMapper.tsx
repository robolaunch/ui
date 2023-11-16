import { ReactElement } from "react";
import { FormikProps } from "formik";
import useCreateRobot from "../../hooks/useCreateRobot";
import CFWorkspaceItem from "../CFWorkspaceItem/CFWorkspaceItem";
import { IWorkspace, IWorkspaces } from "../../interfaces/robotInterfaces";

interface ICFWorkspacesMapper {
  formik: FormikProps<IWorkspaces>;
  responseRobot: any;
  isImportRobot?: boolean;
}

export default function CFWorkspacesMapper({
  formik,
  responseRobot,
  isImportRobot,
}: ICFWorkspacesMapper): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <div
      data-tut="create-robot-step2-workspaces"
      className="flex flex-col gap-2"
    >
      {robotData?.step2?.workspaces?.map(
        (workspace: IWorkspace, workspaceIndex: number) => {
          return (
            <CFWorkspaceItem
              key={workspaceIndex}
              formik={formik}
              workspace={workspace}
              workspaceIndex={workspaceIndex}
              workspaceState={responseRobot?.robotClusters?.map(
                (cluster: any) => cluster.robotStatus,
              )}
              disabled={formik.isSubmitting || isImportRobot}
              isImportRobot={isImportRobot}
            />
          );
        },
      )}
    </div>
  );
}
