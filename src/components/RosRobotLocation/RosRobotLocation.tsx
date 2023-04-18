import React, { Fragment, ReactElement, useEffect, useState } from "react";
import handleRostoDomMouseCoordinatesConverter from "../../helpers/handleRostoDomMouseCoordinatesConverter";
import ROSLIB from "roslib";
import { FaLocationArrow } from "react-icons/fa";

interface IRosRobotLocation {
  ros: any;
  rosMapWebsocketWidth: number;
  rosMapWebsocketHeight: number;
  rosMapWidth: number;
  rosMapHeight: number;
}

export default function RosRobotLocation({
  ros,
  rosMapWebsocketWidth,
  rosMapWebsocketHeight,
  rosMapWidth,
  rosMapHeight,
}: IRosRobotLocation): ReactElement {
  const [rosRobotPosition, setRosRobotPosition] = useState<any>();

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
      {rosMapWebsocketWidth &&
        rosMapWebsocketHeight &&
        rosMapWidth &&
        rosMapHeight &&
        rosRobotPosition?.x &&
        rosRobotPosition?.y && (
          <div
            className="absolute"
            style={{
              left:
                handleRostoDomMouseCoordinatesConverter({
                  rosMapWebsocketWidth,
                  rosMapWebsocketHeight,
                  rosMapWidth,
                  rosMapHeight,
                  waypointX: rosRobotPosition?.x,
                  waypointY: rosRobotPosition?.y,
                })?.x - 12,
              top:
                handleRostoDomMouseCoordinatesConverter({
                  rosMapWebsocketWidth,
                  rosMapWebsocketHeight,
                  rosMapWidth,
                  rosMapHeight,
                  waypointX: rosRobotPosition?.x,
                  waypointY: rosRobotPosition?.y,
                })?.y - 12,
            }}
          >
            <FaLocationArrow
              className={`text-layer-secondary-500 transition-all duration-300`}
              style={{
                rotate: `${rosRobotPosition?.z}deg`,
              }}
              size={12}
            />
          </div>
        )}
    </Fragment>
  );
}
