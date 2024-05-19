import { ReactElement } from "react";
import { IWaypoint } from "../../interfaces/task-management.interface";
import { MdMyLocation } from "react-icons/md";
import { Tooltip } from "@nextui-org/tooltip";
import BoardPointToolTipContent from "../BoardPointToolTipContent/BoardPointToolTipContent";

interface IBoardWaypointPoint {
  waypoint: IWaypoint;
  index: number;
}

export default function BoardWaypointPoint({
  waypoint,
  index,
}: IBoardWaypointPoint): ReactElement {
  return (
    <Tooltip
      content={
        <BoardPointToolTipContent
          type="waypoint"
          waypoint={waypoint}
          waypointIndex={index}
        />
      }
    >
      <div
        className="absolute "
        style={{
          position: "absolute",
          left: waypoint?.position?.x * 100,
          bottom: waypoint?.position?.y * 100,
          zIndex: 100,
        }}
      >
        <MdMyLocation className="text-primary-600" />
      </div>
    </Tooltip>
  );
}
