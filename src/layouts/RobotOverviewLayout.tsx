import React, { Fragment, ReactElement } from "react";
import useWindow from "../hooks/useWindow";
import useRobot from "../hooks/useRobot";
import BuildManagerStepsTable from "../components/BuildManagerStepsTable/BuildManagerStepsTable";
import WorkspacesTable from "../components/WorkspacesTable/WorkspacesTable";
import { envOnPremiseRobot } from "../helpers/envProvider";
import LaunchManagerStepsTable from "../components/LaunchManagerStepsTable/LaunchManagerStepsTable";

interface IRobotOverviewLayout {
  widget1?: ReactElement;
  widget2?: ReactElement;
  widget3?: ReactElement;
}

export default function RobotOverviewLayout({
  widget1,
  widget2,
  widget3,
}: IRobotOverviewLayout): ReactElement {
  const { responseRobot, responseBuildManager, responseLaunchManagers } =
    useRobot();
  const { width } = useWindow();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate__animated animate__fadeIn">
      <div className="col-span-full lg:col-span-4">{widget1}</div>
      <div className="col-span-full lg:col-span-5">{widget2}</div>
      {width && width > 1024 && (
        <div className="col-span-full lg:col-span-3">{widget3}</div>
      )}
      <div className="col-span-full">
        <WorkspacesTable responseRobot={responseRobot} />
      </div>
      {!envOnPremiseRobot && (
        <Fragment>
          <div className="col-span-full">
            <BuildManagerStepsTable
              responseBuildManager={responseBuildManager}
            />
          </div>
          <div className="col-span-full">
            <LaunchManagerStepsTable
              responseLaunchManagers={responseLaunchManagers}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}
