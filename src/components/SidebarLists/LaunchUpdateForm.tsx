import React, { Fragment, ReactElement, useState } from "react";
import CreateRobotFormStep4 from "../CreateForms/CreateRobotFormStep4";

interface ILaunchUpdateForm {
  reload: boolean;
  setItemCount: any;
}

export default function LaunchUpdateForm({
  reload,
  setItemCount,
}: ILaunchUpdateForm): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseRobotLaunchManagers, setResponseRobotLaunchManagers] =
    useState<any>(undefined);

  return (
    <Fragment>
      {!responseRobotLaunchManagers ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <CreateRobotFormStep4 isImportRobot />
      )}
    </Fragment>
  );
}
