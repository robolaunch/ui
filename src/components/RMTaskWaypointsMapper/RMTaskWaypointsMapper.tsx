import { Fragment, ReactElement } from "react";
import useTask from "../../hooks/useTask";
import RMTaskWaypointCard from "../RMTaskWaypointCard/RMTaskWaypointCard";
import RMTaskWaypointAdd from "../RMTaskWaypointAdd/RMTaskWaypointAdd";

export default function RMTaskWaypointsMapper(): ReactElement {
  const { missionReducer } = useTask();

  return (
    <Fragment>
      {missionReducer.waypoints?.map((waypoint, index) => {
        return (
          <RMTaskWaypointCard
            type="waypoints"
            key={index}
            waypoint={waypoint}
          />
        );
      })}
      <RMTaskWaypointAdd type="waypoints" />
    </Fragment>
  );
}
