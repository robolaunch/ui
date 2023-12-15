import RobotHeaderTabs from "../RobotHeaderTabs/RobotHeaderTabs";
import RobotResource from "../RobotResource/RobotResource";
import { ReactElement } from "react";
import Connections from "../Connections/Connections";
import Card from "../Card/Card";
import EnvironmentLabels from "../EnvironmentLabels/EnvironmentLabels";

export default function EnvironmentHeader(): ReactElement {
  return (
    <Card dataTut="robot-header" className="!h-32 flex-none">
      <div className="flex h-full flex-col justify-between px-9 py-6 !pb-0">
        <div className="flex items-center justify-between">
          <EnvironmentLabels />
          <Connections />
        </div>
        <div className="flex items-center justify-between">
          <RobotHeaderTabs />
          <RobotResource />
        </div>
      </div>
    </Card>
  );
}
