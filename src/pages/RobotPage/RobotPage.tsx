import React, { ReactElement } from "react";
import RosConnector from "../../components/RosConnector/RosConnector";
import RobotHeader from "../../components/RobotHeader/RobotHeader";
import HiddenFrame from "../../components/HiddenFrame/HiddenFrame";
import RobotSubPageLayout from "../../layouts/RobotSubPageLayout";
import { envOnPremiseRobot } from "../../helpers/envProvider";

export default function RobotPage(): ReactElement {
  return (
    <div className="grid grid-cols-1 gap-6">
      <RobotHeader />
      <RobotSubPageLayout />
      {!envOnPremiseRobot && <RosConnector />}
      <HiddenFrame />
    </div>
  );
}
