import React, { Fragment, ReactElement } from "react";
import RosDraggableWaypoint from "../RosDraggableWaypoint/RosDraggableWaypoint";

interface IRosMapWaypointLayout {
  activeMission: number;
  missions: any;
  setMissions: any;
  rosMapDetails: any;
  sceneScale: number;
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
  isRotating: boolean;
  setIsRotating: (value: boolean) => void;
  hoverWaypoint?: number;
}

export default function RosMapWaypointLayout({
  activeMission,
  missions,
  setMissions,
  rosMapDetails,
  sceneScale,
  isDragging,
  setIsDragging,
  hoverWaypoint,
}: IRosMapWaypointLayout): ReactElement {
  return (
    <Fragment>
      {activeMission !== -1 &&
        missions[activeMission]?.waypoints?.map(
          (waypoint: any, waypointIndex: number) => {
            return (
              <RosDraggableWaypoint
                key={waypointIndex}
                waypoint={waypoint}
                waypointIndex={waypointIndex}
                setMissions={setMissions}
                missions={missions}
                rosMapDetails={rosMapDetails}
                sceneScale={sceneScale}
                activeMission={activeMission}
                isDragging={isDragging}
                setIsDragging={setIsDragging}
                hoverWaypoint={hoverWaypoint}
              />
            );
          }
        )}
    </Fragment>
  );
}
