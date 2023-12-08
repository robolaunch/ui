import React, { ReactElement, useContext } from "react";
import { MissionContext } from "../../contexts/MissionContext";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";
import { RiArrowGoBackFill } from "react-icons/ri";

export default function RosControlBar(): ReactElement {
  const { handleStartMission }: any = useContext(MissionContext);

  return (
    <div className="absolute bottom-4 flex w-full cursor-pointer items-center justify-center">
      <div className="border-light-200 bg-light-50 flex rounded-lg border text-xs">
        <div className="hover:bg-light-100 flex gap-2 px-4 py-2 transition-all duration-300">
          <FaPlayCircle size={16} />
          <span>Start Mission</span>
        </div>
        <div
          onClick={() => {
            handleStartMission({
              id: "missionIndex",
              name: "waypointIndex",
              waypoints: [
                {
                  coordinates: {
                    x: 0,
                    y: 0,
                    z: 0,
                  },
                  id: "waypoint.id",
                  name: "waypoint.name",
                  taskType: "waypoint.taskType",
                },
              ],
            });
          }}
          className="hover:bg-light-100 flex gap-2 px-4 py-2 transition-all duration-300"
        >
          <RiArrowGoBackFill size={16} />
          <span>Return a Starting Point</span>
        </div>{" "}
        <div className="hover:bg-light-100 flex gap-2 px-4 py-2 transition-all duration-300">
          <FaStopCircle size={16} />
          <span>Emergency Stop</span>
        </div>
      </div>
    </div>
  );
}
