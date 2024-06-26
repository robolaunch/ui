import { ReactElement } from "react";
import { FormikProps } from "formik";
import CFWorkspaceItem from "../CFWorkspaceItem/CFWorkspaceItem";
import {
  IEnvironmentStep2,
  IEnvironmentStep2Workspace,
} from "../../interfaces/environment/environment.step2.interface";
import useMain from "../../hooks/useMain";

interface ICFWorkspacesMapper {
  formik: FormikProps<IEnvironmentStep2>;
  responseRobot: any;
  isImportRobot?: boolean;
}

export default function CFWorkspacesMapper({
  formik,
  responseRobot,
  isImportRobot,
}: ICFWorkspacesMapper): ReactElement {
  const { robotData } = useMain();

  return (
    <div
      data-tut="create-robot-step2-workspaces"
      className="flex flex-col gap-2"
    >
      {robotData?.step2?.workspaces?.map(
        (workspace: IEnvironmentStep2Workspace, workspaceIndex: number) => {
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
