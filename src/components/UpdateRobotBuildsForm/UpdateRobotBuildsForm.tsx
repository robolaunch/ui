import React, { Fragment, ReactElement } from "react";
import CreateRobotFormStep3 from "../CreateForms/CreateRobotFormStep3";

interface IUpdateRobotBuildsForm {
  reload: boolean;
  setItemCount: any;
}

export default function UpdateRobotBuildsForm({
  reload,
  setItemCount,
}: IUpdateRobotBuildsForm): ReactElement {
  return (
    <Fragment>
      <CreateRobotFormStep3 isImportRobot />
    </Fragment>
  );
}
