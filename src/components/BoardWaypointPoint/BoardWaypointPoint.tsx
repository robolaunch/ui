import { ReactElement } from "react";
import { IWaypoint } from "../../interfaces/task-management.interface";
import { MdMyLocation } from "react-icons/md";
import { Tooltip } from "@nextui-org/tooltip";
import BoardPointToolTipContent from "../BoardPointToolTipContent/BoardPointToolTipContent";

interface IBoardWaypointPoint {
  waypoint: IWaypoint;
}

export default function BoardWaypointPoint({
  waypoint,
}: IBoardWaypointPoint): ReactElement {
  return (
    <Tooltip
      content={<BoardPointToolTipContent type="waypoint" waypoint={waypoint} />}
    >
      <div
        className="absolute "
        style={{
          position: "absolute",
          left: waypoint.position_x * 100,
          bottom: waypoint.position_y * 100,
          zIndex: 100,
        }}
      >
        <MdMyLocation className="text-primary-600" />
      </div>
    </Tooltip>
  );
}
