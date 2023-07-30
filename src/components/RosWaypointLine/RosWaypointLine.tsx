import React, {
  Fragment,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import handleRostoDomMouseCoordinatesConverter from "../../functions/handleRostoDomMouseCoordinatesConverter";
import ROSLIB from "roslib";
import { MissionContext } from "../../contexts/MissionContext";

interface IRosWaypointLine {
  ros: any;
}

export default function RosWaypointLine({
  ros,
}: IRosWaypointLine): ReactElement {
  const [rosRobotPosition, setRosRobotPosition] = useState<any>();

  const { activeMission, missions, rosMapDetails }: any =
    useContext(MissionContext);

  const robotPosition = new ROSLIB.Topic({
    ros: ros,
    name: "/robot_position",
    messageType: "geometry_msgs/msg/PoseStamped",
  });

  useEffect(() => {
    robotPosition?.subscribe(function (message: any) {
      setRosRobotPosition({
        x: message?.pose?.position?.x,
        y: message?.pose?.position?.y,
        z: message?.pose?.position?.z,
      });
    });

    return () => {
      robotPosition?.unsubscribe();
    };
  });

  return (
    <Fragment>
      {rosRobotPosition?.x &&
        activeMission !== -1 &&
        missions[activeMission]?.waypoints[0] && (
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
                    waypointX: rosRobotPosition?.x,
                    waypointY: rosRobotPosition?.y,
                  }).x - 6
                }
                y1={
                  handleRostoDomMouseCoordinatesConverter({
                    rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                    rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                    rosMapWidth: rosMapDetails?.x,
                    rosMapHeight: rosMapDetails?.y,
                    waypointX: rosRobotPosition?.x,
                    waypointY: rosRobotPosition?.y,
                  }).y - 6
                }
                x2={
                  handleRostoDomMouseCoordinatesConverter({
                    rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                    rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                    rosMapWidth: rosMapDetails?.x,
                    rosMapHeight: rosMapDetails?.y,
                    waypointX:
                      missions[activeMission]?.waypoints[0]?.coordinates?.x,
                    waypointY:
                      missions[activeMission]?.waypoints[0]?.coordinates?.y,
                  }).x
                }
                y2={
                  handleRostoDomMouseCoordinatesConverter({
                    rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
                    rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
                    rosMapWidth: rosMapDetails?.x,
                    rosMapHeight: rosMapDetails?.y,
                    waypointX:
                      missions[activeMission]?.waypoints[0]?.coordinates?.x,
                    waypointY:
                      missions[activeMission]?.waypoints[0]?.coordinates?.y,
                  }).y
                }
                stroke="red"
                strokeWidth="1"
              />
            </svg>
          </div>
        )}

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
