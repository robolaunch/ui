import React, { ReactElement } from "react";

interface ISidebarSelectInfo {
  type:
    | "Organization"
    | "Robotics Cloud"
    | "Instance"
    | "Fleet"
    | "Robot"
    | undefined;
}

export default function SidebarSelectInfo({
  type,
}: ISidebarSelectInfo): ReactElement {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div className="text-lg font-bold text-layer-dark-100">
        Please select an {type} first.
      </div>
    </div>
  );
}
