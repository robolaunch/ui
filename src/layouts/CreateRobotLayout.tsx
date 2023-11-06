import React, { Fragment, ReactElement } from "react";
import CreateEnvironmentFormStep1 from "../components/CreateForms/CFAppStep1";
import CreateRobotFormStep1 from "../components/CreateForms/CFStep1";
import CreateRobotFormStep2 from "../components/CreateForms/CFStep2";
import CreateRobotFormStep3 from "../components/CreateForms/CFStep3";
import CreateRobotFormStep4 from "../components/CreateForms/CFStep4";
import useMain from "../hooks/useMain";
import { envOnPremiseRobot } from "../helpers/envProvider";

export default function CreateRobotLayout(): ReactElement {
  const { sidebarState } = useMain();

  return (
    <Fragment>
      {(() => {
        switch (sidebarState?.page) {
          case "robot":
            return envOnPremiseRobot ? (
              <CreateEnvironmentFormStep1 />
            ) : (
              <CreateRobotFormStep1 />
            );
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
