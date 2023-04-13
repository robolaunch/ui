import React from "react";
import getWaypointIcon from "../../helpers/GetWaypointIcon";

interface IWaypointList {
  waypoint: {
    name: string;
    taskType: string;
    coordinates: {
      x: number;
      y: number;
    };
  };
  waypointIndex: number;
}

export default function RosWaypointListItem({
  waypoint,
  waypointIndex,
}: IWaypointList) {
  return (
    <div
      key={waypointIndex}
      className="flex items-center p-1 gap-2 shadow-md rounded border border-layer-light-100 h-12 bg-layer-light-50"
    >
      {getWaypointIcon({
        type: waypoint?.taskType,
      })}

      <div className="flex flex-col gap-1 text-xs">
        <div>{waypoint?.name}</div>
        <div>
          {String(waypoint?.coordinates?.x).slice(0, 5)} x{" "}
          {String(waypoint?.coordinates?.y).slice(0, 5)}
        </div>
      </div>
    </div>
  );
}
