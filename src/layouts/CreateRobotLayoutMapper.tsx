import { Fragment, ReactElement } from "react";
//import CFStep0 from "../components/CFStep0/CFStep0";
import CFAppStep1 from "../components/CreateForms/CFAppStep1";
import CFStep1 from "../components/CreateForms/CFStep1";
import CFStep2 from "../components/CreateForms/CFStep2";
import CFStep3 from "../components/CreateForms/CFStep3";
import CFStep4 from "../components/CreateForms/CFStep4";
import useMain from "../hooks/useMain";

export default function CreateRobotLayoutMapper(): ReactElement {
  const { sidebarState, applicationMode } = useMain();

  return (
    <Fragment>
      {(() => {
        switch (sidebarState?.page) {
//          case "importmanager":
//            return <CFStep0 />;
          case "robot":
            return applicationMode ? <CFAppStep1 /> : <CFStep1 />;
          case "workspacesmanager":
            return <CFStep2 />;
          case "buildsmanager":
            return <CFStep3 />;
          case "launchsmanager":
            return <CFStep4 />;
        }
      })()}
    </Fragment>
  );
}
