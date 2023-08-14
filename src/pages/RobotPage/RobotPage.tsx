import React, { ReactElement } from "react";
import TaskManagementLayout from "../../layouts/TaskManagementLayout";
import RosConnector from "../../components/RosConnector/RosConnector";
import RobotHeader from "../../components/RobotHeader/RobotHeader";
import DevelopmentSuite from "./DevelopmentSuite/DevelopmentSuite";
import TaskManagementContext from "../../contexts/MissionContext";
import { IrobotPages } from "../../interfaces/generalInterfaces";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import BarcodeContext from "../../contexts/BarcodeContext";
import RemoteDesktop from "./RemoteDesktop/RemoteDesktop";
import Visualization from "./Visualization/Visualization";
import Teleoperation from "./Teleoperation/Teleoperation";
import { envOnPremise } from "../../helpers/envProvider";
import { useAppSelector } from "../../hooks/redux";
import useRobot from "../../hooks/useRobot";
import Overview from "./Overview/Overview";

export default function RobotPage(): ReactElement {
  const { activeTab, setActiveTab, responseRobot } = useRobot();

  const { urls } = useAppSelector((state) => state.robot);

  function handleChangeActiveTab(tab: IrobotPages["activeTab"]) {
    setActiveTab(tab);
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="col-span-full">
        <RobotHeader handleChangeActiveTab={handleChangeActiveTab} />
      </div>

      <div className="col-span-full">
        {(() => {
          switch (activeTab) {
            case "Overview":
              return (
                <Overview
                  informationWidgetAction={() => {
                    setActiveTab(
                      envOnPremise ? "Development Suite" : "Teleoperation"
                    );
                  }}
                />
              );
            case "Task Management":
              return (
                <TaskManagementContext>
                  <BarcodeContext>
                    <TaskManagementLayout />
                  </BarcodeContext>
                </TaskManagementContext>
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
              return (
                <RemoteDesktop
                  vdiIngressEndpoint={
                    urls?.vdi || responseRobot?.vdiIngressEndpoint
                  }
                />
              );
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
      <RosConnector />
      {/* <HiddenVDIFrame /> */}
    </div>
  );
}
