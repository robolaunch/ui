import DevelopmentSuite from "../pages/RobotPage/DevelopmentSuite/DevelopmentSuite";
import Teleoperation from "../pages/RobotPage/Teleoperation/Teleoperation";
import Visualization from "../pages/RobotPage/Visualization/Visualization";
import RemoteDesktop from "../pages/RobotPage/RemoteDesktop/RemoteDesktop";
import RosConnector from "../components/RosConnector/RosConnector";
import CodeEditor from "../components/CodeEditor/CodeEditor";
import Overview from "../pages/RobotPage/Overview/Overview";
import TaskManagementLayout from "./TaskManagementLayout";
import BarcodeContext from "../contexts/BarcodeContext";
import MissionContext from "../contexts/MissionContext";
import { envApplication } from "../helpers/envProvider";
import { useAppSelector } from "../hooks/redux";
import useRobot from "../hooks/useRobot";
import { ReactElement } from "react";
import FileManager from "../components/FileManager/FileManager";

export default function RobotSubPageLayout(): ReactElement {
  const { activeTab, setActiveTab, responseRobot, isSettedCookie } = useRobot();
  const { urls } = useAppSelector((state) => state.robot);

  return (
    <div className="col-span-full h-full">
      {!envApplication && <RosConnector />}

      {(() => {
        switch (activeTab) {
          case "Overview":
            return (
              <Overview
                informationWidgetAction={() => {
                  isSettedCookie &&
                    setActiveTab(
                      envApplication ? "Development Suite" : "Teleoperation",
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
          case "File Manager":
            return <FileManager />;
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
