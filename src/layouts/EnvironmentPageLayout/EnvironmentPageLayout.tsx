import { Fragment, ReactElement } from "react";
import EnvironmentHeader from "../../components/EnvironmentHeader/EnvironmentHeader";
import HiddenFrame from "../../components/HiddenFrame/HiddenFrame";
import { envApplication } from "../../helpers/envProvider";
import RosConnector from "../../components/RosConnector/RosConnector";
import Overview from "../../pages/EnvironmentPage/Overview/Overview";
import MissionContext from "../../contexts/MissionContext";
import BarcodeContext from "../../contexts/BarcodeContext";
import TaskManagementLayout from "../TaskManagementLayout";
import Visualization from "../../pages/EnvironmentPage/Visualization/Visualization";
import Teleoperation from "../../pages/EnvironmentPage/Teleoperation/Teleoperation";
import DevelopmentSuite from "../../pages/EnvironmentPage/DevelopmentSuite/DevelopmentSuite";
import RemoteDesktop from "../../pages/EnvironmentPage/RemoteDesktop/RemoteDesktop";
import FileManager from "../../components/FileManager/FileManager";
import CodeEditor from "../../pages/EnvironmentPage/CodeEditor/CodeEditor";
import { useAppSelector } from "../../hooks/redux";
import useRobot from "../../hooks/useRobot";

export default function EnvironmentPageLayout(): ReactElement {
  const { activeTab, setActiveTab, responseRobot, isSettedCookie } = useRobot();
  const { urls } = useAppSelector((state) => state.robot);

  return (
    <Fragment>
      <div className="flex h-full flex-col gap-6">
        <EnvironmentHeader />
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
      <HiddenFrame />
    </Fragment>
  );
}
