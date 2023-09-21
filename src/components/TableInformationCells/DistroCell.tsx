import React, { ReactElement } from "react";

interface IDistroCell {
  distro: string;
}

export default function DistroCell({ distro }: IDistroCell): ReactElement {
  return (
    <div className="flex flex-col items-center gap-2 text-xs">
      <span>
        ROS2 {distro.charAt(0).toUpperCase() + distro.slice(1).toLowerCase()}
      </span>
    </div>
  );
}
