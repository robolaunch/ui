import { ReactElement, useEffect, useState } from "react";
import RobotStatusWidgetItem from "../RobotStatusWidgetItem/RobotStatusWidgetItem";
import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";
import { useAppSelector } from "../../hooks/redux";
import useCreateRobot from "../../hooks/useCreateRobot";

interface IRobotStatusWidget {
  responseBuildManager: any;
  responseLaunchManagers: any;
}

export default function RobotStatusWidget({
  responseBuildManager,
  responseLaunchManagers,
}: IRobotStatusWidget): ReactElement {
  const [responseLaunchManagersFiltered, setResponseLaunchManagersFiltered] =
    useState<any>(undefined);

  const { applicationMode } = useAppSelector((state) => state.user);

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

  const { robotData } = useCreateRobot();

  return (
    <WidgetLayout
      dataTut="robot-status-widget"
      title={`${applicationMode ? "Application" : "Robot"} Status`}
      subtitle={`${applicationMode ? "Application" : "Robot"} Status`}
      icon={<VscHistory size={20} className="text-light-700" />}
    >
      <div className="flex h-full w-full items-center justify-around">
        {/* Workspace */}
        <RobotStatusWidgetItem
          title="Workspace Manager"
          loading={!Array.isArray(robotData.step1.clusters?.environment)}
          state={
            robotData.step1.clusters?.environment?.filter(
              (env: { name: string; status: string }) =>
                env.status !== "EnvironmentReady",
            )?.length
              ? "warning"
              : robotData.step1.clusters?.environment?.filter(
                    (env: { name: string; status: string }) =>
                      env.status === "Error",
                  )?.length
                ? "error"
                : "success"
          }
          stateText={
            !Array.isArray(robotData.step1.clusters?.environment)
              ? "Loading..."
              : robotData.step1.clusters?.environment?.filter(
                    (env: { name: string; status: string }) =>
                      env.status !== "EnvironmentReady",
                  )?.length
                ? robotData.step1.clusters?.environment?.filter(
                    (env: { name: string; status: string }) =>
                      env.status !== "EnvironmentReady",
                  )?.[0]?.status
                : "Ready"
          }
        />
        {/* Workspace */}

        {/* Build */}
        {!applicationMode && (
          <RobotStatusWidgetItem
            title="Build Manager"
            loading={!Array.isArray(robotData.step1.clusters?.build)}
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
        {!applicationMode && (
          <RobotStatusWidgetItem
            title="Launch Manager"
            loading={!Array.isArray(robotData.step1.clusters?.launch)}
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
