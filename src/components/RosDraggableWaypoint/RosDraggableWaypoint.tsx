import React, { ReactElement } from "react";
import Draggable from "react-draggable";
import handleRostoDomMouseCoordinatesConverter from "../../helpers/handleRostoDomMouseCoordinatesConverter";
import { TbMapPinFilled } from "react-icons/tb";
import handleDomRosMouseCoordinatesConverter from "../../helpers/handleDomtoRosMouseCoordinatesConverter";
import { FaFlagCheckered } from "react-icons/fa";
import { CgFlagAlt } from "react-icons/cg";

interface IRosDraggableWaypoint {
  waypoint: any;
  waypointIndex: number;
  activeMission: number;
  setMissions: any;
  missions: any;
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
  missions,
  rosMapDetails,
  sceneScale,
  setIsDragging,
  hoverWaypoint,
}: IRosDraggableWaypoint): ReactElement {
  return (
    <Draggable
      key={waypointIndex}
      scale={sceneScale}
      defaultPosition={{
        x:
          handleRostoDomMouseCoordinatesConverter({
            rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
            rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
            rosMapWidth: rosMapDetails?.x,
            rosMapHeight: rosMapDetails?.y,
            waypointX: waypoint?.coordinates?.x,
            waypointY: waypoint?.coordinates?.y,
          }).x - 12,
        y:
          handleRostoDomMouseCoordinatesConverter({
            rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
            rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
            rosMapWidth: rosMapDetails?.x,
            rosMapHeight: rosMapDetails?.y,
            waypointX: waypoint?.coordinates?.x,
            waypointY: waypoint?.coordinates?.y,
          }).y - 24,
      }}
      position={{
        x:
          handleRostoDomMouseCoordinatesConverter({
            rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
            rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
            rosMapWidth: rosMapDetails?.x,
            rosMapHeight: rosMapDetails?.y,
            waypointX: waypoint?.coordinates?.x,
            waypointY: waypoint?.coordinates?.y,
          }).x - 12,

        y:
          handleRostoDomMouseCoordinatesConverter({
            rosMapWebsocketWidth: rosMapDetails?.resolution?.x,
            rosMapWebsocketHeight: rosMapDetails?.resolution?.y,
            rosMapWidth: rosMapDetails?.x,
            rosMapHeight: rosMapDetails?.y,
            waypointX: waypoint?.coordinates?.x,
            waypointY: waypoint?.coordinates?.y,
          }).y - 24,
      }}
      onStart={() => setIsDragging(true)}
      onDrag={(e, data) => {
        const waypointCoordinates = handleDomRosMouseCoordinatesConverter({
          domMapMouseY: (data.y + 24) * sceneScale,
          domMapMouseX: (data.x + 12) * sceneScale,
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
      onStop={(e, data) => setIsDragging(false)}
      axis="both"
      disabled={activeMission === -1 ? true : false}
      bounds="parent"
      defaultClassNameDragging="cursor-move"
      defaultClassName="animate__animated animate__fadeIn"
    >
      <div className="absolute">
        {missions[activeMission]?.waypoints?.length > 1 &&
        missions[activeMission]?.waypoints?.length === waypointIndex + 1 ? (
          <FaFlagCheckered
            className={`${
              waypointIndex === hoverWaypoint
                ? "text-layer-primary-900 scale-150"
                : "text-layer-secondary-900"
            } transition-all duration-300 ml-2 mt-1`}
            size={20}
          />
        ) : missions[activeMission]?.waypoints?.length > 1 &&
          waypointIndex === 0 ? (
          <CgFlagAlt
            className={`${
              waypointIndex === hoverWaypoint
                ? "text-layer-primary-500 scale-150"
                : "text-layer-primary-700"
            } transition-all duration-300 ml-1.5 `}
            size={26}
          />
        ) : (
          <TbMapPinFilled
            className={`${
              waypointIndex === hoverWaypoint
                ? "text-layer-primary-500 scale-150"
                : "text-layer-secondary-500"
            } transition-all duration-300`}
            size={24}
          />
        )}
      </div>
    </Draggable>
  );
}
