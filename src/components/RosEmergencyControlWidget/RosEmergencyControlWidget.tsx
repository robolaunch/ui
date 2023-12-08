import React, { ReactElement } from "react";
import { BiErrorCircle } from "react-icons/bi";
import Button from "../Button/Button";
import RosWidgetLayout from "../../layouts/RosWidgetLayout";

interface IRosEmergencyControlWidget {
  ros: any;
  id: number;
  handleRemoveWidget: (id: number) => void;
}

export default function RosEmergencyControlWidget({
  ros,
  id,
  handleRemoveWidget,
}: IRosEmergencyControlWidget): ReactElement {
  return (
    <RosWidgetLayout
      id={id}
      type="RosEmergencyControlWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<BiErrorCircle size={22} className="text-light-400" />}
      title="Emergency Control"
    >
      <div className="flex h-full flex-col items-center justify-center gap-6">
        <div className="flex gap-2">
          <Button className="!w-24" text="Start" disabled />
          <Button className="!w-24" text="Stop" />
        </div>
        <div className="bg-light-100 flex items-center justify-center gap-2 rounded-lg p-2 text-sm">
          <span>State:</span>
          <span className="h-3 w-3 rounded-full bg-secondary" />
          <span>Robot is running</span>
        </div>
      </div>
    </RosWidgetLayout>
  );
}
