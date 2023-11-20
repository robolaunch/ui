import React, { ReactElement, useEffect, useState } from "react";
import RobotStatusWidgetItem from "../RobotStatusWidgetItem/RobotStatusWidgetItem";
import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";
import { envApplication } from "../../helpers/envProvider";

interface IRobotStatusWidget {
  responseRobot: any;
  responseBuildManager: any;
  responseLaunchManagers: any;
}

export default function RobotStatusWidget({
  responseRobot,
  responseBuildManager,
  responseLaunchManagers,
}: IRobotStatusWidget): ReactElement {
  const [responseLaunchManagersFiltered, setResponseLaunchManagersFiltered] =
    useState<any>(undefined);

  useEffect(() => {
    setResponseLaunchManagersFiltered(
      responseLaunchManagers
        ?.map((launchStep: any) => {
          return launchStep?.robotClusters;
        })
        .flat()
        ?.map((cluster: any) => {
          return cluster?.launchManagerStatus;
        }) || undefined,
    );
  }, [responseLaunchManagers]);

  return (
    <WidgetLayout
      dataTut="robot-status-widget"
      title={`${envApplication ? "Application" : "Robot"} Status`}
      subtitle={`${envApplication ? "Application" : "Robot"} Status`}
      icon={<VscHistory size={20} className="text-layer-light-700" />}
    >
      <div className="flex h-full w-full items-center justify-around">
        {/* Workspace */}
        <RobotStatusWidgetItem
          title="Workspace Manager"
          loading={!responseRobot}
          state={
            responseRobot?.robotClusters?.filter(
              (robot: any) => robot?.robotStatus !== "EnvironmentReady",
            )?.length
              ? "warning"
              : responseRobot?.robotClusters?.filter(
                  (robot: any) => robot?.robotStatus === "Error",
                )?.length
              ? "error"
              : "success"
          }
          stateText={
            !responseRobot
              ? "Loading..."
              : responseRobot?.robotClusters?.filter(
                  (robot: any) => robot?.robotStatus !== "EnvironmentReady",
                )?.length
              ? responseRobot?.robotClusters?.filter(
                  (robot: any) => robot?.robotStatus !== "EnvironmentReady",
                )[0]?.robotStatus
              : "Ready"
          }
        />
        {/* Workspace */}

        {/* Build */}
        {!envApplication && (
          <RobotStatusWidgetItem
            title="Build Manager"
            loading={!responseBuildManager}
            state={
              responseBuildManager?.robotClusters?.length
                ? responseBuildManager?.robotClusters?.filter(
                    (robot: any) => robot?.buildManagerStatus !== "Ready",
                  )?.length
                  ? "warning"
                  : responseBuildManager?.robotClusters?.filter(
                      (robot: any) => robot?.buildManagerStatus === "Error",
                    )?.length
                  ? "error"
                  : "success"
                : "none"
            }
            stateText={
              !responseBuildManager
                ? "Loading..."
                : responseBuildManager?.robotClusters?.length
                ? responseBuildManager?.robotClusters?.filter(
                    (robot: any) => robot?.buildManagerStatus !== "Ready",
                  )?.length
                  ? responseBuildManager?.robotClusters?.filter(
                      (robot: any) => robot?.buildManagerStatus !== "Ready",
                    )[0]?.buildManagerStatus
                  : "Ready"
                : "None"
            }
          />
        )}
        {/* Build */}

        {/* Launch */}
        {!envApplication && (
          <RobotStatusWidgetItem
            title="Launch Manager"
            loading={!responseLaunchManagersFiltered}
            state={
              responseLaunchManagersFiltered?.length
                ? responseLaunchManagersFiltered?.filter(
                    (status: any) => status !== "Running",
                  )?.length
                  ? "warning"
                  : responseLaunchManagersFiltered?.filter(
                      (status: any) => status === "Error",
                    )?.length
                  ? "error"
                  : "success"
                : "none"
            }
            stateText={
              !responseLaunchManagersFiltered
                ? "Loading..."
                : responseLaunchManagersFiltered?.length
                ? responseLaunchManagersFiltered?.filter(
                    (status: any) => status !== "Running",
                  )?.length
                  ? responseLaunchManagersFiltered?.filter(
                      (status: any) => status !== "Running",
                    )[0]
                  : "Ready"
                : "None"
            }
          />
        )}
        {/* Launch */}
      </div>
    </WidgetLayout>
  );
}
