import { Fragment, ReactElement } from "react";
import useTask from "../../hooks/useTask";
import RMTaskWaypointCard from "../RMTaskWaypointCard/RMTaskWaypointCard";
import RMTaskWaypointAdd from "../RMTaskWaypointAdd/RMTaskWaypointAdd";

export default function RMTaskWaypointsMapper(): ReactElement {
  const { missionReducer } = useTask();

  return (
    <Fragment>
      {missionReducer.waypoints?.map((waypoint, index) => {
        return <RMTaskWaypointCard key={index} waypoint={waypoint} />;
      })}
      <RMTaskWaypointAdd />
    </Fragment>
  );
}
