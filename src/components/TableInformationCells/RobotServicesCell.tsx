import React, { ReactElement } from "react";
import InputToggle from "../InputToggle/InputToggle";

interface IRobotServicesCell {
  data: any;
  states: any;
}

export default function RobotServicesCell({
  data,
  states,
}: IRobotServicesCell): ReactElement {
  return (
    <div className="flex gap-4">
      <div className="flex items-center">
        <span className="text-xs font-medium">ROS Bridge:</span>
        <InputToggle checked={states?.isEnabledRosBridge} onChange={() => {}} />
      </div>
      {/* <div className="flex items-center">
        <span className="text-xs font-medium">IDE:</span>
        <InputToggle checked={states?.isEnabledRosBridge} onChange={() => {}} />
      </div> */}
      {/* <div className="flex items-center">
        <span className="text-xs font-medium">VDI:</span>
        <InputToggle checked={states?.isEnabledRosBridge} onChange={() => {}} />
      </div> */}
    </div>
  );
}
