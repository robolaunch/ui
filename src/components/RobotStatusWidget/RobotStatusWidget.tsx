import React, { ReactElement, useEffect, useState } from "react";
import RobotStatusWidgetItem from "../RobotStatusWidgetItem/RobotStatusWidgetItem";
import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";

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
    setResponseLaunchManagersFiltered(() => {
      try {
        return responseLaunchManagers
          .map((launchManager: any, index: number) => {
            return launchManager?.robotLaunchSteps?.map(
              (robotLaunchStep: any) => {
                return robotLaunchStep?.robotClusters;
              }
            );
          })
          ?.flat()
          ?.flat();
      } catch (error) {
        return undefined;
      }
    });
  }, [responseLaunchManagers]);

  return (
    <WidgetLayout
      title={`Robot Status`}
      subtitle={`Robot Status`}
      icon={<VscHistory size={20} className="text-layer-light-700" />}
    >
      <div className="flex items-center justify-around w-full h-full">
        {/* Workspace */}
        <RobotStatusWidgetItem
          title="Workspace Manager"
          loading={!responseRobot}
          state={
            responseRobot?.robotCluster?.filter(
              (robot: any) => robot?.robotStatus !== "EnvironmentReady"
            )?.length
              ? "warning"
              : responseRobot?.robotCluster?.filter(
                  (robot: any) => robot?.robotStatus === "Error"
                )?.length
              ? "error"
              : "success"
          }
          stateTextLoading={
            responseRobot?.robotCluster?.filter(
              (robot: any) => robot?.robotStatus !== "EnvironmentReady"
            )?.length
          }
          stateText={
            responseRobot?.robotCluster?.filter(
              (robot: any) => robot?.robotStatus !== "EnvironmentReady"
            )?.length
              ? responseRobot?.robotCluster?.filter(
                  (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                )[0]
              : "Ready"
          }
        />
        {/* Workspace */}

        {/* Build */}
        <RobotStatusWidgetItem
          title="Build Manager"
          loading={!responseBuildManager}
          state={
            responseBuildManager?.robotClusters?.filter(
              (robot: any) => robot?.buildManagerStatus !== "Ready"
            )?.length
              ? "warning"
              : responseBuildManager?.robotClusters?.filter(
                  (robot: any) => robot?.buildManagerStatus === "Error"
                )?.length
              ? "error"
              : "success"
          }
          stateTextLoading={
            responseBuildManager?.robotClusters?.filter(
              (robot: any) => robot?.buildManagerStatus !== "Ready"
            )?.length
              ? true
              : false
          }
          stateText={
            responseBuildManager?.robotClusters?.filter(
              (robot: any) => robot?.buildManagerStatus !== "Ready"
            )?.length
              ? responseBuildManager?.robotClusters?.filter(
                  (robot: any) => robot?.buildManagerStatus !== "Ready"
                )[0]?.buildManagerStatus
              : "Ready"
          }
        />
        {/* Build */}

        {/* Launch */}
        <RobotStatusWidgetItem
          title="Launch Manager"
          loading={!responseLaunchManagersFiltered}
          state={
            responseLaunchManagersFiltered?.filter(
              (robot: any) => robot?.launchManagerStatus !== "Ready"
            )?.length
              ? "warning"
              : responseLaunchManagersFiltered?.filter(
                  (robot: any) => robot?.launchManagerStatus === "Error"
                )?.length
              ? "error"
              : "success"
          }
          stateTextLoading={
            responseLaunchManagersFiltered?.filter(
              (robot: any) => robot?.launchManagerStatus !== "Ready"
            )?.length
              ? true
              : false
          }
          stateText={
            responseLaunchManagersFiltered?.filter(
              (robot: any) => robot?.launchManagerStatus !== "Ready"
            )?.length
              ? responseLaunchManagersFiltered?.filter(
                  (robot: any) => robot?.launchManagerStatus !== "Ready"
                )[0]?.launchManagerStatus
              : "Ready"
          }
        />
        {/* Launch */}
      </div>
    </WidgetLayout>
  );
}
