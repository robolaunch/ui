import React, { Fragment, ReactElement } from "react";
import useCreateRobot from "../../hooks/useCreateRobot";
import CreateRobotFormWorkspaceItem from "../CreateRobotFormWorkspaceItem/CreateRobotFormWorkspaceItem";
import { FormikProps } from "formik";
import {
  IRobotWorkspace,
  IRobotWorkspaces,
} from "../../interfaces/robotInterfaces";

interface ICreateFormWorkspaces {
  formik: FormikProps<IRobotWorkspaces>;
  responseRobot: any;
  isImportRobot?: boolean;
}

export default function CreateFormWorkspaces({
  formik,
  responseRobot,
  isImportRobot,
}: ICreateFormWorkspaces): ReactElement {
  const { robotData } = useCreateRobot();

  return (
    <Fragment>
      {robotData?.step2?.workspaces?.map(
        (workspace: IRobotWorkspace, workspaceIndex: number) => {
          return (
            <CreateRobotFormWorkspaceItem
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
    </Fragment>
  );
}
