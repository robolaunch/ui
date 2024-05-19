import { ReactElement } from "react";
import Card from "../Card/Card";
import { IWaypoint } from "../../interfaces/task-management.interface";
import TableActionButton from "../TableActionButton/TableActionButton";

interface IRMTaskWaypointCardV2 {
  waypoint: IWaypoint;
  index: number;
  handleRemoveButton?: () => void;
}

export default function RMTaskWaypointCardV2({
  waypoint,
  index,
  handleRemoveButton,
}: IRMTaskWaypointCardV2): ReactElement {
  return (
    <Card className="!h-24 p-4 text-xs shadow-sm">
      <div className="flex h-full items-center justify-between">
        <div className="wh-full flex flex-col justify-between gap-2">
          {[
            {
              name: "Waypoint Index",
              value: index + 1,
            },
            {
              name: "Position",
              value: `x: ${waypoint?.position.x?.toFixed(2)} y: ${waypoint?.position.y?.toFixed(2)} z: ${waypoint?.position.z?.toFixed(2)}`,
            },
            {
              name: "Orientation",
              value: `w: ${waypoint?.orientation.w?.toFixed(2)} x: ${waypoint?.orientation.x?.toFixed(2)} y: ${waypoint?.orientation.y?.toFixed(2)} z: ${waypoint?.orientation.z?.toFixed(2)}`,
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

        <TableActionButton onClick={handleRemoveButton} type="delete" />
      </div>
    </Card>
  );
}
