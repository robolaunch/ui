import { ICloudInstance } from "../../interfaces/global/cloudInstance.interface";
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
        <div className="flex items-center gap-1.5">
          <span className="font-medium">Type:</span>
          <p className="font-light">{instance?.providerModel}</p>
        </div>
      </div>
    </div>
  );
}
