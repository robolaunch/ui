import React, { ReactElement } from "react";
import handleRostoDomMouseCoordinatesConverter from "../../functions/handleRostoDomMouseCoordinatesConverter";
import handleDomRosMouseCoordinatesConverter from "../../functions/handleDomtoRosMouseCoordinatesConverter";
import { TbArrowBigUpLinesFilled, TbMapPinFilled } from "react-icons/tb";
import { FaFlagCheckered } from "react-icons/fa";
import { CgFlagAlt } from "react-icons/cg";
import Draggable from "react-draggable";

interface IRosDraggableWaypoint {
  waypoint: any;
  waypointIndex: number;
  activeMission: number;
  setMissions: any;
  missions: any;
  rosMapDetails: any;
  sceneScale: number;
  isDragging: boolean;
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
  isDragging,
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
            z: temp[activeMission].waypoints[waypointIndex].coordinates.z,
          };
          return temp;
        });
      }}
      onStop={() => setIsDragging(false)}
      axis="both"
      bounds="parent"
      defaultClassNameDragging="cursor-move"
      defaultClassName="animate-fadeIn cursor-move"
    >
      <div className="absolute">
        {missions[activeMission]?.waypoints?.length > 1 &&
        missions[activeMission]?.waypoints?.length === waypointIndex + 1 ? (
          <FaFlagCheckered
            className={`${
              waypointIndex === hoverWaypoint
                ? "scale-150 text-primary-900"
                : "text-secondary-500"
            } ml-2 mt-1 transition-all duration-300`}
            size={20}
          />
        ) : missions[activeMission]?.waypoints?.length > 1 &&
          waypointIndex === 0 ? (
          <CgFlagAlt
            className={`${
              waypointIndex === hoverWaypoint
                ? "scale-150 text-primary-500"
                : "text-primary-700"
            } ml-1.5 transition-all duration-300 `}
            size={26}
          />
        ) : (
          <TbMapPinFilled
            className={`${
              waypointIndex === hoverWaypoint
                ? "scale-150 text-primary-500"
                : "text-secondary-500"
            } transition-all duration-300`}
            size={24}
          />
        )}
        <div
          style={{
            transform: `rotate(${waypoint?.coordinates?.z}deg)`,
          }}
          className="absolute left-1 top-3"
        >
          <TbArrowBigUpLinesFilled className="mb-2 text-secondary-800 " />
          {/* <img
            src="/images/rosMapRotate.png"
            className="scale-150"
            alt="rosMapRotate"
          /> */}
        </div>
      </div>
    </Draggable>
  );
}
