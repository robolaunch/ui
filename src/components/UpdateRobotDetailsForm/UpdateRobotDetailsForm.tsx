import React, { Fragment, ReactElement } from "react";
import CreateRobotFormStep1 from "../CreateForms/CFStep1";

interface IUpdateRobotDetailsForm {
  reload: boolean;
  setItemCount: any;
}

export default function UpdateRobotDetailsForm({
  reload,
  setItemCount,
}: IUpdateRobotDetailsForm): ReactElement {
  return (
    <Fragment>
      <CreateRobotFormStep1 isImportRobot />
    </Fragment>
  );
}
