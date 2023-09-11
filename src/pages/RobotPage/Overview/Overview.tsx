import React, { ReactElement, useEffect, useState } from "react";
import AdrinNetworkStatusWidget from "../../../components/AdrinNetworkStatusWidget/AdrinNetworkStatusWidget";
import AdrinActivitiesWidget from "../../../components/AdrinActivitiesWidget/AdrinActivitiesWidget";
// import RobotStatusWidget from "../../../components/RobotStatusWidget/RobotStatusWidget";
// import ActivitiesWidget from "../../../components/ActivitiesWidget/ActivitiesWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import { handleRandomInteger } from "../../../functions/GeneralFunctions";
import RobotOverviewLayout from "../../../layouts/RobotOverviewLayout";
import { envOnPremiseRobot } from "../../../helpers/envProvider";
import Button from "../../../components/Button/Button";
import adrinData from "../../../mock/adrinData.json";
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
    //  responseBuildManager,
    //   responseLaunchManagers
  } = useRobot();

  const [adrinState, setAdrinState] = useState<any>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      adrinState?.length !== adrinData?.length &&
        setAdrinState((prevState: any) => {
          console.log("A", [...prevState, adrinData[prevState?.length]]);
          return [...prevState, adrinData[prevState?.length]];
        });
    }, handleRandomInteger(2, 5) * 1000);

    return () => clearInterval(timer);
  }, [adrinState]);

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
        // <RobotStatusWidget
        //   responseRobot={responseRobot}
        //   responseBuildManager={responseBuildManager}
        //   responseLaunchManagers={responseLaunchManagers}
        // />
        <AdrinNetworkStatusWidget data={adrinState?.[adrinState?.length - 1]} />
      }
      widget3={
        // <ActivitiesWidget responseRobot={responseRobot} />

        <AdrinActivitiesWidget data={adrinState} />
      }
    />
  );
}
