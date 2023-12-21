import DevelopmentSuite from "../../pages/EnvironmentPage/DevelopmentSuite/DevelopmentSuite";
import EnvironmentHeader from "../../components/EnvironmentHeader/EnvironmentHeader";
import Visualization from "../../pages/EnvironmentPage/Visualization/Visualization";
import Teleoperation from "../../pages/EnvironmentPage/Teleoperation/Teleoperation";
import RemoteDesktop from "../../pages/EnvironmentPage/RemoteDesktop/RemoteDesktop";
import CodeEditor from "../../pages/EnvironmentPage/CodeEditor/CodeEditor";
import Overview from "../../pages/EnvironmentPage/Overview/Overview";
import HiddenFrame from "../../components/HiddenFrame/HiddenFrame";
import FileManager from "../../components/FileManager/FileManager";
import { envApplication } from "../../helpers/envProvider";
import MissionContext from "../../contexts/MissionContext";
import BarcodeContext from "../../contexts/BarcodeContext";
import TaskManagementLayout from "../TaskManagementLayout";
import { useAppSelector } from "../../hooks/redux";
import { Fragment, ReactElement } from "react";
import useRobot from "../../hooks/useRobot";

export default function EnvironmentPageLayout(): ReactElement {
  const { activeTab, setActiveTab, responseRobot, isSettedCookie } = useRobot();
  const { urls } = useAppSelector((state) => state.robot);

  return (
    <Fragment>
      <div className="flex h-full flex-col gap-6">
        <EnvironmentHeader />

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
