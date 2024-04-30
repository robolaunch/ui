import { Fragment, ReactElement } from "react";
import useTask from "../../hooks/useTask";
import RMTaskWaypointCard from "../RMTaskWaypointCard/RMTaskWaypointCard";
import RMTaskWaypointAdd from "../RMTaskWaypointAdd/RMTaskWaypointAdd";

export default function RMTaskWaitingPointsMapper(): ReactElement {
  const { missionReducer } = useTask();

  return (
    <Fragment>
      {missionReducer.waitingPoints?.map((waypoint, index) => {
        return (
          <RMTaskWaypointCard
            type="waitingPoints"
            key={index}
            waypoint={waypoint}
          />
        );
      })}
      <RMTaskWaypointAdd type="waitingPoints" />
    </Fragment>
  );
}
