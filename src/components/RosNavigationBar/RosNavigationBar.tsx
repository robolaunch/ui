import React, { Fragment, ReactElement, useContext } from "react";
import { BsArrowRight } from "react-icons/bs";
import { FaFlagCheckered, FaLocationArrow } from "react-icons/fa";
import getWaypointIcon from "../../helpers/GetWaypointIcon";
import { CgFlagAlt } from "react-icons/cg";
import { MissionContext } from "../../contexts/MissionContext";

export default function RosNavigationBar(): ReactElement {
  const { activeMission, missions, setHoverWaypoint }: any =
    useContext(MissionContext);

  return (
    <Fragment>
      {activeMission !== -1 && missions[activeMission]?.waypoints.length ? (
        <div className="absolute top-4 w-full flex items-center justify-center animate__animated animate__fadeIn overflow-auto">
          <div className="w-[96%] flex p-1 justify-around rounded-lg border border-layer-light-200 bg-layer-light-50">
            <div className="flex items-center justify-center">
              <FaLocationArrow className="text-layer-secondary-500" size={12} />
            </div>
            <div className="flex items-center justify-center animate__animated animate__fadeIn">
              <BsArrowRight />
            </div>
            {missions[activeMission]?.waypoints?.map(
              (waypoint: any, waypointIndex: number) => {
                return (
                  <Fragment key={waypointIndex}>
                    <div
                      key={waypointIndex}
                      onMouseEnter={() => setHoverWaypoint(waypointIndex)}
                      onMouseLeave={() => setHoverWaypoint(-1)}
                      className="flex gap-2 px-3 py-1 rounded-md items-center justify-center hover:bg-layer-light-100 transition-all duration-300 animate__animated animate__fadeIn cursor-pointer"
                    >
                      <span className="text-xs text-layer-light-50 flex items-center justify-center w-7 h-7 rounded-full bg-layer-secondary-500 ">
                        {waypointIndex === 0 ? (
                          <CgFlagAlt
                            className="text-layer-light-50"
                            size={17}
                          />
                        ) : waypointIndex + 1 ===
                          missions[activeMission]?.waypoints.length ? (
                          <FaFlagCheckered
                            className="text-layer-light-50"
                            size={14}
                          />
                        ) : (
                          waypointIndex + 1
                        )}
                      </span>

                      {getWaypointIcon({
                        type: waypoint?.taskType,
                      })}

                      <div className="flex flex-col items-center text-xs">
                        <span>{waypoint?.name}</span>
                        <span>
                          {String(waypoint?.coordinates?.x).slice(0, 5)} x{" "}
                          {String(waypoint?.coordinates?.y).slice(0, 5)}x{" "}
                          {String(waypoint?.coordinates?.z).slice(0, 5)}
                        </span>
                      </div>
                    </div>
                    {waypointIndex !==
                      missions[activeMission]?.waypoints.length - 1 && (
                      <div className="flex items-center justify-center animate__animated animate__fadeIn">
                        <BsArrowRight />
                      </div>
                    )}
                  </Fragment>
                );
              }
            )}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
