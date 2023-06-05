import React, { Fragment, ReactElement } from "react";
import CreateRobotFormStep1 from "../components/CreateForms/CreateRobotFormStep1";
import CreateRobotFormStep2 from "../components/CreateForms/CreateRobotFormStep2";
import CreateRobotFormStep3 from "../components/CreateForms/CreateRobotFormStep3";
import CreateRobotFormStep4 from "../components/CreateForms/CreateRobotFormStep4";
import useSidebar from "../hooks/useSidebar";

export default function CreateRobotLayout(): ReactElement {
  const { sidebarState } = useSidebar();

  return (
    <Fragment>
      {(() => {
        switch (sidebarState?.page) {
          case "robot":
            return <CreateRobotFormStep1 />;
          case "workspacesmanager":
            return <CreateRobotFormStep2 />;
          case "buildsmanager":
            return <CreateRobotFormStep3 />;
          case "launchsmanager":
            return <CreateRobotFormStep4 />;
        }
      })()}
    </Fragment>
  );
}
