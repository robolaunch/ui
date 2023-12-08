import React, { useContext, useEffect, useRef, useState } from "react";
import { MissionContext } from "../../contexts/MissionContext";
import getWaypointIcon from "../../helpers/GetWaypointIcon";
import { Joystick } from "react-joystick-component";
import { CgPlayButtonR } from "react-icons/cg";
import { EditText } from "react-edit-text";

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
  const { setMissions, activeMission, handleStartMission }: any =
    useContext(MissionContext);
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
      className="border-light-100 bg-light-50 flex flex-col items-center gap-4 rounded border px-4 pb-2 pt-3 shadow-md"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-light-50 bg-secondary-500 flex h-6 w-6 items-center justify-center rounded-full text-xs ">
            {waypointIndex + 1}
          </span>
          <div className="flex flex-col gap-1 !text-xs">
            <div className="flex items-center gap-1">
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
                            },
                          ),
                        };
                      }
                      return mission;
                    }),
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
        <CgPlayButtonR
          size={20}
          className="cursor-pointer"
          onClick={() => {
            handleStartMission({
              id: missionIndex,
              name: waypointIndex,
              waypoints: [
                {
                  coordinates: {
                    x: waypoint?.coordinates?.x,
                    y: waypoint?.coordinates?.y,
                    z: waypoint?.coordinates?.z,
                  },
                  id: waypoint.id,
                  name: waypoint.name,
                  taskType: waypoint.taskType,
                },
              ],
            });
          }}
        />
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
                    },
                  ),
                };
              }
              return mission;
            }),
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
