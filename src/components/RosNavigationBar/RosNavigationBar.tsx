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
        <div className="animate__animated animate__fadeIn absolute top-4 flex w-full items-center justify-center overflow-auto">
          <div className="border-light-200 bg-light-50 flex w-[96%] justify-around rounded-lg border p-1">
            <div className="flex items-center justify-center">
              <FaLocationArrow className="text-secondary-500" size={12} />
            </div>
            <div className="animate__animated animate__fadeIn flex items-center justify-center">
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
                      className="animate__animated animate__fadeIn hover:bg-light-100 flex cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-1 transition-all duration-300"
                    >
                      <span className="text-light-50 bg-secondary-500 flex h-7 w-7 items-center justify-center rounded-full text-xs ">
                        {waypointIndex === 0 ? (
                          <CgFlagAlt className="text-light-50" size={17} />
                        ) : waypointIndex + 1 ===
                          missions[activeMission]?.waypoints.length ? (
                          <FaFlagCheckered
                            className="text-light-50"
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
                      <div className="animate__animated animate__fadeIn flex items-center justify-center">
                        <BsArrowRight />
                      </div>
                    )}
                  </Fragment>
                );
              },
            )}
          </div>
        </div>
      ) : null}
    </Fragment>
  );
}
