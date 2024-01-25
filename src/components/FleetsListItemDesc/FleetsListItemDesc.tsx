import { ReactElement } from "react";
import StateCell from "../TableInformationCells/StateCell";
import { IFleet } from "../../interfaces/fleet.interface";

interface IFleetsListItemDesc {
  fleet: IFleet;
}

export default function FleetsListItemDesc({
  fleet,
}: IFleetsListItemDesc): ReactElement {
  return (
    <div className="flex gap-2">
      <div className="flex gap-1.5">
        <span className="font-medium">VI:</span>
        <StateCell state={fleet?.status} />
      </div>
      {fleet?.physicalStatus && (
        <div className="flex gap-1.5">
          <span className="font-medium">PI:</span>
          <StateCell state={fleet?.physicalStatus} />
        </div>
      )}
    </div>
  );
}
