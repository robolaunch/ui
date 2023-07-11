import React, { ReactElement } from "react";
import WorkspacesTable from "../../../components/WorkspacesTable/WorkspacesTable";
import BuildManagerStepsTable from "../../../components/BuildManagerStepsTable/BuildManagerStepsTable";
import LaunchManagerStepsTable from "../../../components/LaunchManagerStepsTable/LaunchManagerStepsTable";
interface IK8SResources {
  responseRobot: any;
  responseBuildManager: any;
  responseLaunchManagers: any;
}

export default function K8SResources({
  responseRobot,
  responseBuildManager,
  responseLaunchManagers,
}: IK8SResources): ReactElement {
  return (
    <div className="flex flex-col gap-8">
      <WorkspacesTable responseRobot={responseRobot} />
      <BuildManagerStepsTable responseBuildManager={responseBuildManager} />
      <LaunchManagerStepsTable
        responseLaunchManagers={responseLaunchManagers}
      />
    </div>
  );
}
