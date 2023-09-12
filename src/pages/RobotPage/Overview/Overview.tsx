import React, { ReactElement } from "react";
import {
  envAdrinIntegration,
  envOnPremiseRobot,
} from "../../../helpers/envProvider";
import AdrinNetworkStatusWidget from "../../../components/AdrinNetworkStatusWidget/AdrinNetworkStatusWidget";
import AdrinActivitiesWidget from "../../../components/AdrinActivitiesWidget/AdrinActivitiesWidget";
// import RobotStatusWidget from "../../../components/RobotStatusWidget/RobotStatusWidget";
import RobotStatusWidget from "../../../components/RobotStatusWidget/RobotStatusWidget";
// import ActivitiesWidget from "../../../components/ActivitiesWidget/ActivitiesWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import ActivitiesWidget from "../../../components/ActivitiesWidget/ActivitiesWidget";
import RobotOverviewLayout from "../../../layouts/RobotOverviewLayout";
import Button from "../../../components/Button/Button";
import useRobot from "../../../hooks/useRobot";
import { useParams } from "react-router-dom";

interface IOverview {
  informationWidgetAction: () => void;
}

export default function Overview({
  informationWidgetAction,
}: IOverview): ReactElement {
  const url = useParams();
  const {
    responseRobot,
    responseBuildManager,
    responseLaunchManagers,
    adrinState,
  } = useRobot();

  return (
    <RobotOverviewLayout
      widget1={
        <InformationWidget
          title={url?.robotName || ""}
          subtitle={
            envOnPremiseRobot
              ? "From this page, you can see all the details of the application, control the application, control the environments running on the application or develop the application's software."
              : "From this page, you can see all the details of the robot, control the robot, assign tasks, control the environments running on the robot or develop the robot's software."
          }
          component={
            envOnPremiseRobot ? (
              <Button
                disabled={
                  responseRobot?.robotClusters?.filter(
                    (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                  )?.length
                }
                loading={
                  responseRobot?.robotClusters?.filter(
                    (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                  )?.length
                }
                text="Development Suite"
                className="!w-44 !h-10 !text-xs"
                onClick={informationWidgetAction}
              />
            ) : (
              <Button
                disabled={
                  responseRobot?.robotClusters?.filter(
                    (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                  )?.length
                }
                loading={
                  responseRobot?.robotClusters?.filter(
                    (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                  )?.length
                }
                text="Teleoperation of Robot"
                className="!w-44 !h-10 !text-xs"
                onClick={informationWidgetAction}
              />
            )
          }
        />
      }
      widget2={
        envAdrinIntegration ? (
          <AdrinNetworkStatusWidget
            data={adrinState?.[adrinState?.length - 1]}
          />
        ) : (
          <RobotStatusWidget
            responseRobot={responseRobot}
            responseBuildManager={responseBuildManager}
            responseLaunchManagers={responseLaunchManagers}
          />
        )
      }
      widget3={
        envAdrinIntegration ? (
          <AdrinActivitiesWidget />
        ) : (
          <ActivitiesWidget responseRobot={responseRobot} />
        )
      }
    />
  );
}
