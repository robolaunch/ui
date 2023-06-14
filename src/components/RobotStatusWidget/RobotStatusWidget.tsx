import React, { ReactElement } from "react";
import WidgetLayout from "../../layouts/WidgetLayout";
import { VscHistory } from "react-icons/vsc";
import { FiAlertCircle, FiCheckCircle } from "react-icons/fi";

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
  console.log(responseLaunchManagers);

  return (
    <WidgetLayout
      title={`Robot Status`}
      subtitle={`Robot Status`}
      icon={<VscHistory size={20} className="text-layer-light-700" />}
    >
      <div className="flex items-center justify-around w-full h-full">
        {/* Workspace */}
        <div className="flex flex-col gap-6 items-center justify-center">
          <span>Workspace Manager</span>
          <div className="flex flex-col justify-center items-center gap-2">
            {!responseRobot ? (
              <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                <img
                  className="w-12 mx-auto pt-10"
                  src="/svg/general/loading.svg"
                  alt="Loading..."
                />
              </div>
            ) : responseRobot?.robotCluster?.filter(
                (robot: any) => robot?.robotStatus !== "EnvironmentReady"
              )?.length ? (
              <FiAlertCircle size={28} className="text-red-500" />
            ) : (
              <FiCheckCircle size={28} className="text-green-500" />
            )}
            <span className="text-sm">
              {!responseRobot
                ? "Loading..."
                : responseRobot?.robotCluster?.filter(
                    (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                  )?.length
                ? responseRobot?.robotCluster?.filter(
                    (robot: any) => robot?.robotStatus !== "EnvironmentReady"
                  )[0]?.robotStatus
                : "Ready"}
            </span>
          </div>
        </div>
        {/* Workspace */}

        {/* Build */}
        <div className="flex flex-col gap-6 items-center justify-center">
          <span>Build Manager</span>
          <div className="flex flex-col justify-center items-center gap-2">
            {!responseBuildManager ? (
              <div className="w-full h-full flex flex-col gap-2 items-center justify-center">
                <img
                  className="w-12 mx-auto pt-10"
                  src="/svg/general/loading.svg"
                  alt="Loading..."
                />
              </div>
            ) : responseBuildManager?.robotClusters?.filter(
                (robot: any) => robot?.buildManagerStatus !== "EnvironmentReady"
              )?.length ? (
              <FiAlertCircle size={28} className="text-red-500" />
            ) : (
              <FiCheckCircle size={28} className="text-green-500" />
            )}
            <span className="text-sm">
              {!responseBuildManager
                ? "Loading..."
                : responseBuildManager?.robotClusters?.filter(
                    (robot: any) =>
                      robot?.buildManagerStatus !== "EnvironmentReady"
                  )?.length
                ? responseBuildManager?.robotClusters?.filter(
                    (robot: any) =>
                      robot?.buildManagerStatus !== "EnvironmentReady"
                  )[0]?.buildManagerStatus
                : "Ready"}
            </span>
          </div>
        </div>
        {/* Build */}

        <div className="flex flex-col gap-4">
          <div>icon</div>
          <span>Launch Manager</span>
        </div>
      </div>
    </WidgetLayout>
  );
}
