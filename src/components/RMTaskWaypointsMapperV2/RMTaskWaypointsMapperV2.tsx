import { Fragment, ReactElement } from "react";
import useTaskManagement from "../../hooks/useTaskManagement";
import RMTaskWaypointCardV2 from "../RMTaskWaypointCardV2/RMTaskWaypointCardV2";
import RMTaskWaypointAddV2 from "../RMTaskWaypointAddV2/RMTaskWaypointAddV2";

export default function RMTaskWaypointsMapperV2(): ReactElement {
  const { waypoints } = useTaskManagement();

  return (
    <Fragment>
      {waypoints?.map((waypoint, index) => {
        return <RMTaskWaypointCardV2 key={index} waypoint={waypoint} />;
      })}
      <RMTaskWaypointAddV2 />
    </Fragment>
  );
}
