import React, { Fragment, ReactElement } from "react";
import CreateRobotFormStep2 from "../CreateForms/CreateRobotFormStep2";

interface IUpdateRobotWorkspacesForm {
  reload: boolean;
  setItemCount: any;
}

export default function UpdateRobotWorkspacesForm({
  reload,
  setItemCount,
}: IUpdateRobotWorkspacesForm): ReactElement {
  return (
    <Fragment>
      <CreateRobotFormStep2 isImportRobot />
    </Fragment>
  );
}
