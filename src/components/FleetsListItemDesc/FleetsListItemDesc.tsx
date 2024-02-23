import { ReactElement } from "react";
import StateCell from "../TableInformationCells/StateCell";
import { IFleet } from "../../interfaces/global/fleet.interface";

interface IFleetsListItemDesc {
  fleet: IFleet;
}

export default function FleetsListItemDesc({
  fleet,
}: IFleetsListItemDesc): ReactElement {
  return (
    <div className="flex gap-2">
      <div className="flex gap-1.5">
        <StateCell state={fleet?.status} />
      </div>
    </div>
  );
}
