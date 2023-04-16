import React, { Fragment, ReactElement } from "react";
import handleRostoDomMouseCoordinatesConverter from "../../helpers/handleRostoDomMouseCoordinatesConverter";

interface IRosWaypointLine {
  activeMission: number;
  missions: any;
  rosMapDetails: any;
}

export default function RosWaypointLine({
  activeMission,
  missions,
  rosMapDetails,
}: IRosWaypointLine): ReactElement {
  return (
    <Fragment>
      {activeMission !== -1 &&
        missions[activeMission]?.waypoints?.map(
          (waypoint: any, waypointIndex: number) => {
            return (
              <Fragment key={waypointIndex}>
                {missions[activeMission]?.waypoints[waypointIndex + 1] && (
                  <div className="absolute inset-0">
                    <svg
                      style={{
                        height: "100%",
                      }}
                    >
                      <line
                        x1={
                          handleRostoDomMouseCoordinatesConverter({
                            rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                            rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                            rosMapWidth: rosMapDetails?.x,
                            rosMapHeight: rosMapDetails?.y,
                            waypointX: waypoint?.coordinates?.x,
                            waypointY: waypoint?.coordinates?.y,
                          }).x
                        }
                        y1={
                          handleRostoDomMouseCoordinatesConverter({
                            rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                            rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                            rosMapWidth: rosMapDetails?.x,
                            rosMapHeight: rosMapDetails?.y,
                            waypointX: waypoint?.coordinates?.x,
                            waypointY: waypoint?.coordinates?.y,
                          }).y
                        }
                        x2={
                          handleRostoDomMouseCoordinatesConverter({
                            rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                            rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                            rosMapWidth: rosMapDetails?.x,
                            rosMapHeight: rosMapDetails?.y,
                            waypointX:
                              missions[activeMission]?.waypoints[
                                waypointIndex + 1
                              ]?.coordinates?.x,
                            waypointY:
                              missions[activeMission]?.waypoints[
                                waypointIndex + 1
                              ]?.coordinates?.y,
                          }).x
                        }
                        y2={
                          handleRostoDomMouseCoordinatesConverter({
                            rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                            rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                            rosMapWidth: rosMapDetails?.x,
                            rosMapHeight: rosMapDetails?.y,
                            waypointX:
                              missions[activeMission]?.waypoints[
                                waypointIndex + 1
                              ]?.coordinates?.x,
                            waypointY:
                              missions[activeMission]?.waypoints[
                                waypointIndex + 1
                              ]?.coordinates?.y,
                          }).y
                        }
                        stroke="red"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                )}
              </Fragment>
            );
          }
        )}
    </Fragment>
  );
}
