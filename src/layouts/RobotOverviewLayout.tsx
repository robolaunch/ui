import LaunchManagerStepsTable from "../components/LaunchManagerStepsTable/LaunchManagerStepsTable";
import BuildManagerStepsTable from "../components/BuildManagerStepsTable/BuildManagerStepsTable";
import WorkspacesTable from "../components/WorkspacesTable/WorkspacesTable";
import ContainersTable from "../components/ContainersTable/ContainersTable";
import VolumesTable from "../components/VolumesTable/VolumesTable";
import { useAppSelector } from "../hooks/redux";
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
  const { responseBuildManager, responseLaunchManagers, isDeployMode } =
    useRobot();
  const { width } = useWindow();
  const { applicationMode } = useAppSelector((state) => state.user);

  return (
    <div className="animate-fadeIn grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="col-span-full lg:col-span-4">{widget1}</div>
      <div className="col-span-full lg:col-span-5">{widget2}</div>
      {width && width > 1024 && (
        <div className="col-span-full lg:col-span-3">{widget3}</div>
      )}

      {!applicationMode && !isDeployMode && (
        <Fragment>
          <div data-tut="robot-workspaces-table" className="col-span-full">
            <WorkspacesTable />
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
      {isDeployMode && (
        <Fragment>
          <div className="col-span-full">
            <VolumesTable />
          </div>
          <div className="col-span-full">
            <ContainersTable />
          </div>
        </Fragment>
      )}
    </div>
  );
}
