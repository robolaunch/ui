import LaunchManagerStepsTable from "../components/LaunchManagerStepsTable/LaunchManagerStepsTable";
import BuildManagerStepsTable from "../components/BuildManagerStepsTable/BuildManagerStepsTable";
import WorkspacesTable from "../components/WorkspacesTable/WorkspacesTable";
import { envApplication } from "../helpers/envProvider";
import { Fragment, ReactElement } from "react";
import useWindow from "../hooks/useWindow";
import useRobot from "../hooks/useRobot";

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
    <div className="animate-fadeIn grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="col-span-full lg:col-span-4">{widget1}</div>
      <div className="col-span-full lg:col-span-5">{widget2}</div>
      {width && width > 1024 && (
        <div className="col-span-full lg:col-span-3">{widget3}</div>
      )}

      {!envApplication && (
        <Fragment>
          <div data-tut="robot-workspaces-table" className="col-span-full">
            <WorkspacesTable responseRobot={responseRobot} />
          </div>
          <div data-tut="robot-build-managers-table" className="col-span-full">
            <BuildManagerStepsTable
              responseBuildManager={responseBuildManager}
            />
          </div>
          <div data-tut="robot-launch-managers-table" className="col-span-full">
            <LaunchManagerStepsTable
              responseLaunchManagers={responseLaunchManagers}
            />
          </div>
        </Fragment>
      )}
    </div>
  );
}
