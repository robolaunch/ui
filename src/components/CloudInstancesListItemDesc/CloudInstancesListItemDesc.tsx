import React, { ReactElement } from "react";
import StateCell from "../Cells/StateCell";

interface ICloudInstancesListItemDesc {
  instance: any;
}

export default function CloudInstancesListItemDesc({
  instance,
}: ICloudInstancesListItemDesc): ReactElement {
  return (
    <div className="flex gap-2">
      <div className="flex gap-1.5">
        <span className="font-medium">RS:</span>
        <StateCell state={instance?.instanceCloudState} isRobolaunchState />
      </div>
      <div className="flex gap-1.5">
        <span className="font-medium">PS:</span>
        <StateCell state={instance?.instanceState} />
      </div>
    </div>
  );
}
