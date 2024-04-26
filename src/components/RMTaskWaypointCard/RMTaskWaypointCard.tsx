import { ReactElement } from "react";
import Card from "../Card/Card";
import { IWaypoint } from "../../interfaces/context/misssion.context.interface";
import StateCell from "../TableInformationCells/StateCell";

interface IRMTaskWaypointCard {
  waypoint: IWaypoint;
}

export default function RMTaskWaypointCard({
  waypoint,
}: IRMTaskWaypointCard): ReactElement {
  return (
    <Card className="!h-32 p-4 text-xs shadow-sm">
      <div className="flex h-full items-center justify-between">
        <div className="wh-full flex flex-col justify-between gap-2">
          {[
            {
              name: "Waypoint ID",
              value: waypoint.locationID,
            },
            {
              name: "Orientation",
              value: `w: ${waypoint.orientation.w} x: ${waypoint.orientation.x} y: ${waypoint.orientation.y} z: ${waypoint.orientation.z}`,
            },
            {
              name: "Position",
              value: `x: ${waypoint.position.x} y: ${waypoint.position.y} z: ${waypoint.position.z}`,
            },
            {
              name: "Status",
              value: (
                <StateCell state={waypoint.locationStatus?.toLowerCase()} />
              ),
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
        <div>Buttons</div>
      </div>
    </Card>
  );
}
