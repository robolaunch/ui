import EnvironmentLabels from "../EnvironmentLabels/EnvironmentLabels";
import RobotHeaderTabs from "../RobotHeaderTabs/RobotHeaderTabs";
import RobotResource from "../RobotResource/RobotResource";
import Connections from "../Connections/Connections";
import { ReactElement } from "react";
import Card from "../Card/Card";

export default function EnvironmentHeader(): ReactElement {
  return (
    <Card dataTut="robot-header" className="!h-28 flex-none !p-0">
      <div className="flex h-full flex-col justify-between px-9 py-5 !pb-0">
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
