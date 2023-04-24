import React, { useContext, useEffect, useRef, useState } from "react";
import getWaypointIcon from "../../helpers/GetWaypointIcon";
import { EditText } from "react-edit-text";
import { TaskManagementContext } from "../../contexts/TaskManagementContext";
import { Joystick } from "react-joystick-component";

interface IWaypointListItem {
  waypoint: {
    id: string;
    name: string;
    taskType: string;
    coordinates: {
      x: number;
      y: number;
      z: number;
    };
  };
  waypointIndex: number;
  missionIndex: number;
}

export default function RosWaypointListItem({
  waypoint,
  waypointIndex,
  missionIndex,
}: IWaypointListItem) {
  const { setMissions, activeMission }: any = useContext(TaskManagementContext);
  const joystickRef = useRef(null);

  const [joystickPosition, setJoystickPosition] = useState<{
    x: number;
    y: number;
  }>({
    x: waypoint?.coordinates?.z
      ? 0
      : Math.sin((waypoint?.coordinates?.z * Math.PI) / 180),
    y:
      waypoint?.coordinates?.z === 0
        ? 1
        : Math.cos((waypoint?.coordinates?.z * Math.PI) / 180),
  });

  useEffect(() => {
    setJoystickPosition({
      x: Math.sin((waypoint?.coordinates?.z * Math.PI) / 180),
      y: Math.cos((waypoint?.coordinates?.z * Math.PI) / 180),
    });
  }, [waypoint]);

  return (
    <div
      key={waypoint?.id}
      className="flex flex-col items-center pt-3 px-4 pb-2 gap-4 shadow-md rounded border border-layer-light-100 bg-layer-light-50"
    >
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-2 items-center">
          <span className="text-xs text-layer-light-50 flex items-center justify-center w-6 h-6 rounded-full bg-layer-secondary-500 ">
            {waypointIndex + 1}
          </span>
          <div className="flex flex-col gap-1 !text-xs">
            <div className="flex gap-1 items-center">
              {getWaypointIcon({
                type: waypoint?.taskType,
                size: 20,
              })}
              <EditText
                style={{
                  maxWidth: "8rem",
                }}
                className="flex flex-col gap-1 !text-xs"
                type="text"
                value={waypoint?.name}
                onChange={(e: any) => {
                  setMissions((missions: any) =>
                    missions.map((mission: any, index: number) => {
                      if (index === missionIndex) {
                        return {
                          ...mission,
                          waypoints: mission.waypoints.map(
                            (waypoint: any, index: number) => {
                              if (index === waypointIndex) {
                                return {
                                  ...waypoint,
                                  name: e?.target?.value,
                                };
                              }
                              return waypoint;
                            }
                          ),
                        };
                      }
                      return mission;
                    })
                  );
                }}
              />
            </div>
            <div className="flex items-center gap-1">
              <span>x: {String(waypoint?.coordinates?.x).slice(0, 5)}</span>
              <span>y: {String(waypoint?.coordinates?.y).slice(0, 5)}</span>
              <span>z: {String(waypoint?.coordinates?.z).slice(0, 5)}</span>
            </div>
          </div>
        </div>
        <div
          style={
            activeMission !== missionIndex
              ? {
                  display: "none",
                }
              : {}
          }
          className="flex flex-col items-center justify-center"
        >
          <Joystick
            ref={joystickRef}
            size={32}
            key={waypoint?.id}
            sticky={true}
            move={(e: any) => {
              setJoystickPosition({
                x: e.x,
                y: e.y,
              });
              setMissions((prev: any) => {
                const temp = [...prev];
                temp[missionIndex].waypoints[waypointIndex].coordinates.z =
                  ((Math.atan2(e.x, e.y) * 180) / Math.PI + 360) % 360;

                return temp;
              });
            }}
            baseColor="#e0f1fe"
            stickColor="#0ca0eb"
            stickSize={14}
            minDistance={100}
            baseImage="/images/joystickbase.png"
            pos={joystickPosition}
          />
        </div>
      </div>
      <button
        onClick={() => {
          setMissions((missions: any) =>
            missions.map((mission: any, index: number) => {
              if (index === missionIndex) {
                return {
                  ...mission,
                  waypoints: mission.waypoints.filter(
                    (waypoint: any, index: number) => {
                      return index !== waypointIndex;
                    }
                  ),
                };
              }
              return mission;
            })
          );
        }}
        className="text-xs text-red-700"
        style={{
          fontSize: "0.65rem",
        }}
      >
        Delete Waypoint
      </button>
    </div>
  );
}
