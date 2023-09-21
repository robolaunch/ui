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
import useRobot from "../../../hooks/useRobot";
import { useParams } from "react-router-dom";
import TourGuide from "../../../components/TourGuide/TourGuide";
import { getGuideItem } from "../../../functions/handleGuide";

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
            <TourGuide
              type="robot"
              tourConfig={
                envOnPremiseRobot
                  ? [
                      getGuideItem('[data-tut="robot-header"]'),
                      getGuideItem('[data-tut="robot-information"]'),
                      getGuideItem('[data-tut="robot-service-buttons"]'),
                      getGuideItem('[data-tut="robot-connections"]'),
                      getGuideItem('[data-tut="robot-resources"]'),
                      getGuideItem('[data-tut="robot-header-tabs"]'),
                      getGuideItem('[data-tut="robot-header-tab-overview"]'),

                      getGuideItem('[data-tut="robot-header-tab-code-editor"]'),
                      getGuideItem(
                        '[data-tut="robot-header-tab-development-suite"]',
                      ),
                      getGuideItem(
                        '[data-tut="robot-header-tab-remote-desktop"]',
                      ),
                      getGuideItem('[data-tut="information-widget"]'),
                      getGuideItem('[data-tut="robot-status-widget"]'),
                      getGuideItem('[data-tut="robot-activities-widget"]'),
                      getGuideItem('[data-tut="robot-workspaces-table"]'),
                    ]
                  : [
                      getGuideItem('[data-tut="robot-header"]'),
                      getGuideItem('[data-tut="robot-information"]'),
                      getGuideItem('[data-tut="robot-service-buttons"]'),
                      getGuideItem('[data-tut="robot-connections"]'),
                      getGuideItem('[data-tut="robot-resources"]'),
                      getGuideItem('[data-tut="robot-header-tabs"]'),
                      getGuideItem('[data-tut="robot-header-tab-overview"]'),
                      getGuideItem(
                        '[data-tut="robot-header-tab-teleoperation"]',
                      ),
                      getGuideItem(
                        '[data-tut="robot-header-tab-visualization"]',
                      ),
                      getGuideItem('[data-tut="robot-header-tab-code-editor"]'),
                      getGuideItem(
                        '[data-tut="robot-header-tab-development-suite"]',
                      ),
                      getGuideItem(
                        '[data-tut="robot-header-tab-remote-desktop"]',
                      ),
                      getGuideItem('[data-tut="information-widget"]'),
                      getGuideItem('[data-tut="robot-status-widget"]'),
                      getGuideItem('[data-tut="robot-activities-widget"]'),
                      getGuideItem('[data-tut="robot-workspaces-table"]'),
                      getGuideItem('[data-tut="robot-build-managers-table"]'),
                      getGuideItem('[data-tut="robot-launch-managers-table"]'),
                    ]
              }
            />
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
