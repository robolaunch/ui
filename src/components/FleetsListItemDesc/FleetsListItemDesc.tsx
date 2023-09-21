import React, { ReactElement } from "react";
import StateCell from "../TableInformationCells/StateCell";

interface IFleetsListItemDesc {
  fleet: any;
  responseFleets: any;
}

export default function FleetsListItemDesc({
  fleet,
  responseFleets,
}: IFleetsListItemDesc): ReactElement {
  return (
    <div className="flex gap-2">
      <div className="flex gap-1.5">
        <span className="font-medium">VI:</span>
        <StateCell state={fleet?.fleetStatus} />
      </div>
      {responseFleets?.filter(
        (pFleet: any) => fleet?.name === pFleet?.fleetName,
      ).length > 0 && (
        <div className="flex gap-1.5">
          <span className="font-medium">PI:</span>
          <StateCell
            state={
              responseFleets?.filter(
                (pFleet: any) => fleet?.name === pFleet?.fleetName,
              )[0]?.fleetStatus
            }
          />
        </div>
      )}
    </div>
  );
}
