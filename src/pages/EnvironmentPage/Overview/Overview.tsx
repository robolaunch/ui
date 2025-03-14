import RobotStatusWidget from "../../../components/RobotStatusWidget/RobotStatusWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import ActivitiesWidget from "../../../components/ActivitiesWidget/ActivitiesWidget";
import RobotOverviewLayout from "../../../layouts/RobotOverviewLayout";
import TourGuide from "../../../components/TourGuide/TourGuide";
import { getGuideItem } from "../../../functions/handleGuide";
import useRobot from "../../../hooks/useRobot";
import { useParams } from "react-router-dom";
import { ReactElement } from "react";
import { useAppSelector } from "../../../hooks/redux";

export default function Overview(): ReactElement {
  const url = useParams();
  const { responseBuildManager, responseLaunchManagers } = useRobot();

  const { applicationMode } = useAppSelector((state) => state.user);

  return (
    <RobotOverviewLayout
      widget1={
        <InformationWidget
          title={url?.robotName || ""}
          subtitle={
            applicationMode
              ? "From this page, you can see all the details of the application, control the application, control the environments running on the application or develop the application's software."
              : "From this page, you can see all the details of the robot, control the robot, assign tasks, control the environments running on the robot or develop the robot's software."
          }
          component={
            <TourGuide
              type="robot"
              tourConfig={
                applicationMode
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
        <RobotStatusWidget
          responseBuildManager={responseBuildManager}
          responseLaunchManagers={responseLaunchManagers}
        />
      }
      widget3={<ActivitiesWidget />}
    />
  );
}
