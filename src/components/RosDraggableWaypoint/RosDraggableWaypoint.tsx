import React, { ReactElement } from "react";
import Draggable from "react-draggable";
import handleRostoDomMouseCoordinatesConverter from "../../helpers/handleRostoDomMouseCoordinatesConverter";
import { TbMapPinFilled } from "react-icons/tb";
import handleDomRosMouseCoordinatesConverter from "../../helpers/handleDomtoRosMouseCoordinatesConverter";

interface IRosDraggableWaypoint {
  waypoint: any;
  waypointIndex: number;
  activeMission: number;
  setMissions: any;
  rosMapDetails: any;
  sceneScale: number;
  setIsDragging: (value: boolean) => void;
}

export default function RosDraggableWaypoint({
  waypoint,
  waypointIndex,
  activeMission,
  setMissions,
  rosMapDetails,
  sceneScale,
  setIsDragging,
}: IRosDraggableWaypoint): ReactElement {
  return (
    <Draggable
      scale={sceneScale}
      defaultPosition={handleRostoDomMouseCoordinatesConverter({
        rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
        rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
        rosMapWidth: rosMapDetails?.x,
        rosMapHeight: rosMapDetails?.y,
        waypointX: waypoint?.coordinates?.x,
        waypointY: waypoint?.coordinates?.y,
      })}
      onStart={() => setIsDragging(true)}
      onStop={(e, data) => {
        setIsDragging(false);
        console.log(e, data);

        const waypointCoordinates = handleDomRosMouseCoordinatesConverter({
          domMapMouseX: data.x,
          domMapMouseY: data.y,
          sceneScale: sceneScale,
          rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
          rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
          rosMapWidth: rosMapDetails?.x,
          rosMapHeight: rosMapDetails?.y,
        });

        setMissions((prev: any) => {
          let temp = [...prev];

          temp[activeMission].waypoints[waypointIndex].coordinates = {
            x: waypointCoordinates?.x,
            y: waypointCoordinates?.y,
          };
          return temp;
        });
      }}
      axis="both"
      disabled={activeMission === -1 ? true : false}
      bounds="parent"
      defaultClassNameDragging="cursor-move"
    >
      <div className="absolute !-top-5 ">
        <TbMapPinFilled className="text-layer-secondary-500" size={24} />
      </div>
    </Draggable>
  );
}
