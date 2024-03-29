import { Fragment, ReactElement } from "react";
import CreateEnvironmentFormStep1 from "../CreateForms/CFAppStep1";

interface IUpdateRobotDetailsForm {
  reload: boolean;
  setItemCount: any;
}

export default function UpdateEnvironmentDetailsForm({
  reload,
  setItemCount,
}: IUpdateRobotDetailsForm): ReactElement {
  return (
    <Fragment>
      <CreateEnvironmentFormStep1 isImportRobot />
    </Fragment>
  );
}
