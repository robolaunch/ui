import React, { ReactElement } from "react";
import useCreateRobot from "../../hooks/useCreateRobot";
import CFWorkspaceItem from "../CFWorkspaceItem/CFWorkspaceItem";
import { FormikProps } from "formik";
import {
  IRobotWorkspace,
  IRobotWorkspaces,
} from "../../interfaces/robotInterfaces";

interface ICFWorkspaces {
  formik: FormikProps<IRobotWorkspaces>;
  responseRobot: any;
  isImportRobot?: boolean;
}

export default function CFWorkspaces({
  formik,
  responseRobot,
  isImportRobot,
}: ICFWorkspaces): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <div
      data-tut="create-robot-step2-workspaces"
      className="flex flex-col gap-2"
    >
      {robotData?.step2?.workspaces?.map(
        (workspace: IRobotWorkspace, workspaceIndex: number) => {
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
