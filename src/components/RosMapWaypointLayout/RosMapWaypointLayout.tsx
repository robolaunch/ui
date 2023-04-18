import React, { Fragment, ReactElement, useContext } from "react";
import RosDraggableWaypoint from "../RosDraggableWaypoint/RosDraggableWaypoint";
import { TaskManagementContext } from "../../contexts/TaskManagementContext";

export default function RosMapWaypointLayout(): ReactElement {
  const {
    activeMission,
    missions,
    setMissions,
    rosMapDetails,
    sceneScale,
    isDragging,
    setIsDragging,
    hoverWaypoint,
  }: any = useContext(TaskManagementContext);

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
