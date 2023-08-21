import React, { ReactElement } from "react";
import DevelopmentSuite from "../pages/RobotPage/DevelopmentSuite/DevelopmentSuite";
import Teleoperation from "../pages/RobotPage/Teleoperation/Teleoperation";
import Visualization from "../pages/RobotPage/Visualization/Visualization";
import RemoteDesktop from "../pages/RobotPage/RemoteDesktop/RemoteDesktop";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import Overview from "../pages/RobotPage/Overview/Overview";
import { envOnPremiseRobot } from "../helpers/envProvider";
import TaskManagementLayout from "./TaskManagementLayout";
import BarcodeContext from "../contexts/BarcodeContext";
import MissionContext from "../contexts/MissionContext";
import { useAppSelector } from "../hooks/redux";
import useRobot from "../hooks/useRobot";

export default function RobotSubPageLayout(): ReactElement {
  const { activeTab, setActiveTab, responseRobot, isSettedCookie } = useRobot();
  const { urls } = useAppSelector((state) => state.robot);
  return (
    <div className="col-span-full">
      {(() => {
        switch (activeTab) {
          case "Overview":
            return (
              <Overview
                informationWidgetAction={() => {
                  isSettedCookie &&
                    setActiveTab(
                      envOnPremiseRobot ? "Development Suite" : "Teleoperation"
                    );
                }}
              />
            );
          case "Task Management":
            return (
              <MissionContext>
                <BarcodeContext>
                  <TaskManagementLayout />
                </BarcodeContext>
              </MissionContext>
            );
          case "Visualization":
            return <Visualization />;
          case "Teleoperation":
            return (
              <Teleoperation
                vdiIngressEndpoint={
                  urls?.vdi || responseRobot?.vdiIngressEndpoint
                }
              />
            );
          case "Development Suite":
            return (
              <DevelopmentSuite
                ideURL={urls?.ide || responseRobot?.ideIngressEndpoint}
                vdiURL={urls?.vdi || responseRobot?.vdiIngressEndpoint}
              />
            );
          case "Remote Desktop":
            return <RemoteDesktop />;
          case "Settings":
            return <div>Settings</div>;
          case "Loading":
            return (
              <div>
                <img
                  className="mx-auto scale-75"
                  src="/svg/general/loading.svg"
                  alt="loading"
                />
              </div>
            );
        }
      })()}
      <CodeEditor />
    </div>
  );
}
