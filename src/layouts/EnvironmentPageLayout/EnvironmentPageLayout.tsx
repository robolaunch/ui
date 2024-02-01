import DevelopmentSuite from "../../pages/EnvironmentPage/DevelopmentSuite/DevelopmentSuite";
import JupyterNotebook from "../../pages/EnvironmentPage/JupyterNotebook/JupyterNotebook";
import EnvironmentHeader from "../../components/EnvironmentHeader/EnvironmentHeader";
import Visualization from "../../pages/EnvironmentPage/Visualization/Visualization";
import Teleoperation from "../../pages/EnvironmentPage/Teleoperation/Teleoperation";
import RemoteDesktop from "../../pages/EnvironmentPage/RemoteDesktop/RemoteDesktop";
import CodeEditor from "../../pages/EnvironmentPage/CodeEditor/CodeEditor";
import Overview from "../../pages/EnvironmentPage/Overview/Overview";
import HiddenFrame from "../../components/HiddenFrame/HiddenFrame";
import FileManager from "../../components/FileManager/FileManager";
import useRobot from "../../hooks/useRobot";
import { ReactElement } from "react";
import TaskManagement from "../../pages/EnvironmentPage/TaskManagement/TaskManagement";

export default function EnvironmentPageLayout(): ReactElement {
  const { activeTab } = useRobot();

  return (
    <div className="flex h-full flex-col gap-6">
      <EnvironmentHeader />
      {(() => {
        switch (activeTab) {
          case "Overview":
            return <Overview />;
          case "Task Management":
            return <TaskManagement />;
          case "Visualization":
            return <Visualization />;
          case "Teleoperation":
            return <Teleoperation />;
          case "Development Suite":
            return <DevelopmentSuite />;
          case "Remote Desktop":
            return <RemoteDesktop />;
          case "File Manager":
            return <FileManager />;
          case "Jupyter Notebook":
            return <JupyterNotebook />;
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
      <HiddenFrame />
    </div>
  );
}
