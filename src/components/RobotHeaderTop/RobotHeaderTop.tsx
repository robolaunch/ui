import RobotHeaderLabels from "../RobotHeaderLabels/RobotHeaderLabels";
import RobotNameLabel from "../RobotNameLabel/RobotNameLabel";
import Connections from "../Connections/Connections";
import { ReactElement } from "react";

export default function RobotHeaderTop(): ReactElement {
  return (
    <div
      data-tut="robot-information"
      className="flex h-full items-center justify-between gap-8 text-layer-dark-600"
    >
      <div className="flex items-center gap-8">
        <RobotNameLabel />
        <RobotHeaderLabels />
      </div>
      <Connections />
    </div>
  );
}
