import { Fragment, ReactElement } from "react";
import useTask from "../../hooks/useTask";
import RMTaskWaypointCard from "../RMTaskWaypointCard/RMTaskWaypointCard";

export default function RMTaskWaitingPointsMapper(): ReactElement {
  const { missionReducer } = useTask();

  return (
    <Fragment>
      {missionReducer.waitingPoints?.map((waypoint, index) => {
        return <RMTaskWaypointCard key={index} waypoint={waypoint} />;
      })}
    </Fragment>
  );
}
