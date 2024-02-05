import { ICloudInstance } from "../../interfaces/cloudInstance.interface";
import StateCell from "../TableInformationCells/StateCell";
import { ReactElement } from "react";

interface ICloudInstancesListItemDesc {
  instance: ICloudInstance;
}

export default function CloudInstancesListItemDesc({
  instance,
}: ICloudInstancesListItemDesc): ReactElement {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div className="flex gap-1.5">
          <span className="font-medium">RS:</span>
          <StateCell state={instance?.rlState} isRobolaunchState />
        </div>
        <div className="flex gap-1.5">
          <span className="font-medium">PS:</span>
          <StateCell state={instance?.providerState} />
        </div>
      </div>
    </div>
  );
}
