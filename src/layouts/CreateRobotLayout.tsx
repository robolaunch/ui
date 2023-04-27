import React, { Fragment, ReactElement, useContext } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import CreateRobotFormStep1 from "../components/Sidebar/CreateForms/CreateRobotFormStep1";
import CreateRobotFormStep2 from "../components/Sidebar/CreateForms/CreateRobotFormStep2";
import CreateRobotFormStep3 from "../components/Sidebar/CreateForms/CreateRobotFormStep3";

export default function CreateRobotLayout(): ReactElement {
  const { sidebarState }: any = useContext(SidebarContext);

  return (
    <Fragment>
      {(() => {
        switch (sidebarState?.currentCreateRobotStep) {
          case 1:
            return <CreateRobotFormStep1 />;
          case 2:
            return <CreateRobotFormStep2 />;
          case 3:
            return <CreateRobotFormStep3 />;
        }
      })()}
    </Fragment>
  );
}
