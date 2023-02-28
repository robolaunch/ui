import React, { Fragment, ReactElement, useState } from "react";
import RobotHeader from "../../../components/RobotHeader/RobotHeader";
import RemoteDesktop from "../RemoteDesktop/RemoteDesktop";

export default function RobotPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Remote Desktop");

  function handleChangeActiveTab(tab: string) {
    setActiveTab(tab);
  }

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-6">
        <div className="col-span-1">
          <RobotHeader
            activeTab={activeTab}
            handleChangeActiveTab={handleChangeActiveTab}
          />
        </div>
        <div className="col-span-1">
          {(() => {
            switch (activeTab) {
              case "Overview":
                return <div>Overview</div>;
              case "Task Management":
                return <div>Task Management</div>;
              case "Robot Workspaces":
                return <div>Robot Workspaces</div>;
              case "Kubernetes Resources":
                return <div>Kubernetes Resources</div>;
              case "Visualization":
                return <div>Visualization</div>;
              case "Teleoperation":
                return <div>Teleoperation</div>;
              case "Remote Desktop":
                return <RemoteDesktop />;
              case "Settings":
                return <div>Settings</div>;
            }
          })()}
        </div>
      </div>
    </Fragment>
  );
}
