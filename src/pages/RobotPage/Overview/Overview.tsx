import React, { Fragment, ReactElement } from "react";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import ActivitiesWidget from "../../../components/ActivitiesWidget/ActivitiesWidget";
import Button from "../../../components/Button/Button";
import { useParams } from "react-router-dom";
import RobotStatusWidget from "../../../components/RobotStatusWidget/RobotStatusWidget";
import WorkspacesTable from "../../../components/WorkspacesTable/WorkspacesTable";
import BuildManagerStepsTable from "../../../components/BuildManagerStepsTable/BuildManagerStepsTable";
import LaunchManagerStepsTable from "../../../components/LaunchManagerStepsTable/LaunchManagerStepsTable";
import useWindow from "../../../hooks/useWindow";
import { envOnPremise } from "../../../helpers/envProvider";
interface IOverview {
  responseRobot: any;
  responseBuildManager: any;
  responseLaunchManagers: any;
  informationWidgetAction: () => void;
}

export default function Overview({
  responseRobot,
  responseBuildManager,
  responseLaunchManagers,
  informationWidgetAction,
}: IOverview): ReactElement {
  const url = useParams();
  const { width } = useWindow();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate__animated animate__fadeIn">
      <div className="col-span-full lg:col-span-4">
        <InformationWidget
          title={url?.robotName || ""}
          subtitle={
            envOnPremise
              ? "From this page, you can see all the details of the application, control the application, control the environments running on the application or develop the application's software."
              : "From this page, you can see all the details of the robot, control the robot, assign tasks, control the environments running on the robot or develop the robot's software."
          }
          component={
            envOnPremise ? (
              <Button
                text="Development Suite"
                className="!w-44 !h-10 !text-xs"
                onClick={informationWidgetAction}
              />
            ) : (
              <Button
                text="Teleoperation of Robot"
                className="!w-44 !h-10 !text-xs"
                onClick={informationWidgetAction}
              />
            )
          }
        />
      </div>
      <div className="col-span-full lg:col-span-5">
        <RobotStatusWidget
          responseRobot={responseRobot}
          responseBuildManager={responseBuildManager}
          responseLaunchManagers={responseLaunchManagers}
        />
      </div>
      {width && width > 1024 && (
        <div className="col-span-full lg:col-span-3">
          <ActivitiesWidget responseRobot={responseRobot} />
        </div>
      )}
      <div className="col-span-full">
        <WorkspacesTable responseRobot={responseRobot} />
      </div>
      {!envOnPremise && (
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
