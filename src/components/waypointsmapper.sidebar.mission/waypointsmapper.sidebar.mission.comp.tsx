import { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import AddWaypoint from "../addwaypoint.sidebar.mission/addwaypoint.sidebar.mission";
import useTask from "../../hooks/useTask";

interface IWaypointMapper {
  ros: any;
}

export default function WaypointsMapper({
  ros,
}: IWaypointMapper): ReactElement {
  const { missionReducer } = useTask();

  return (
    <div className="flex w-full flex-col gap-2">
      {missionReducer.waypoints?.map((location, index) => (
        <CardLayout
          key={index}
          className="flex items-center justify-between p-4 !shadow-sm"
        >
          <div className="flex flex-col gap-2 text-xs">
            <p>
              <span className="font-medium">Location ID: </span>
              {location.locationID}
            </p>
            <p>
              <span className="font-medium">Position: </span>
              {location.position.x}, {location.position.y},{" "}
              {location.position.z}
            </p>
            <p>
              <span className="font-medium">Orientation: </span>
              {location.orientation.x}, {location.orientation.y},{" "}
              {location.orientation.z}, {location.orientation.w}
            </p>
          </div>
          <AddWaypoint ros={ros} initialValues={location} />
        </CardLayout>
      ))}
      <AddWaypoint ros={ros} />
    </div>
  );
}
