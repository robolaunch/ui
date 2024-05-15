import { ReactElement } from "react";
import Card from "../Card/Card";
import { IWaypoint } from "../../interfaces/task-management.interface";
import RMTaskWaypointCardButtonsV2 from "../RMTaskWaypointCardButtonsV2/RMTaskWaypointCardButtonsV2";

interface IRMTaskWaypointCardV2 {
  waypoint: IWaypoint;
}

export default function RMTaskWaypointCardV2({
  waypoint,
}: IRMTaskWaypointCardV2): ReactElement {
  return (
    <Card className="!h-32 p-4 text-xs shadow-sm">
      <div className="flex h-full items-center justify-between">
        <div className="wh-full flex flex-col justify-between gap-2">
          {[
            {
              name: "Waypoint ID",
              value: waypoint.waypoint_id || waypoint.waypoint_id,
            },
            {
              name: "Waypoint Name",
              value: waypoint.waypoint_name,
            },
            {
              name: "Position",
              value: `x: ${waypoint.position_x} y: ${waypoint.position_y} z: ${waypoint.position_z}`,
            },
            {
              name: "Orientation",
              value: `w: ${waypoint.orientation_w} x: ${waypoint.orientation_x} y: ${waypoint.orientation_y} z: ${waypoint.orientation_z}`,
            },
          ].map((item, index) => {
            return (
              <label className="flex gap-1" key={index}>
                <span className="font-semibold text-dark-800">
                  {item.name}:
                </span>
                <span className="text-dark-700">{item.value}</span>
              </label>
            );
          })}
        </div>
        <RMTaskWaypointCardButtonsV2 waypoint={waypoint} />
      </div>
    </Card>
  );
}
