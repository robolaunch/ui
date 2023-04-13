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
  hoverWaypoint?: number;
}

export default function RosDraggableWaypoint({
  waypoint,
  waypointIndex,
  activeMission,
  setMissions,
  rosMapDetails,
  sceneScale,
  setIsDragging,
  hoverWaypoint,
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
      defaultClassName="animate__animated animate__fadeIn"
    >
      <div className="absolute !-top-5">
        <span
          className={`flex items-center justify-center text-xs rounded-full transition-all duration-300 `}
        >
          {waypoint?.id}
        </span>
        <TbMapPinFilled
          className={`${
            waypointIndex === hoverWaypoint
              ? "text-layer-primary-500 scale-150"
              : "text-layer-secondary-500"
          } transition-all duration-300`}
          size={24}
        />
      </div>
    </Draggable>
  );
}
