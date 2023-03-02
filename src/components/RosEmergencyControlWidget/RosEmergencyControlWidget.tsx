import React, { ReactElement } from "react";
import { BiErrorCircle } from "react-icons/bi";
import Button from "../Button/Button";
import WidgetLayout from "../../layouts/WidgetLayout";

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
    <WidgetLayout
      id={id}
      type="RosEmergencyControlWidget"
      handleRemoveWidget={handleRemoveWidget}
      icon={<BiErrorCircle size={22} className="text-layer-light-400" />}
      title="Emergency Control"
    >
      <div className="flex flex-col items-center justify-center gap-6 h-full p-2">
        <div className="flex gap-2">
          <Button className="w-28" text="Start" disabled />
          <Button className="w-28" text="Stop" />
        </div>
        <div className="flex items-center justify-center bg-layer-light-100 p-2 rounded-lg gap-2 text-sm">
          <span>State:</span>
          <span className="h-3 w-3 bg-secondary rounded-full" />
          <span>Robot is running</span>
        </div>
      </div>
    </WidgetLayout>
  );
}
