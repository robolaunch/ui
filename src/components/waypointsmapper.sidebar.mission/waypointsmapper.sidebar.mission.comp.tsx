import { ReactElement } from "react";
import useMission from "../../hooks/useMission";
import CardLayout from "../../layouts/CardLayout";
import AddWaypoint from "../addwaypoint.sidebar.mission/addwaypoint.sidebar.mission";

interface IWaypointMapper {
  ros: any;
}

export default function WaypointsMapper({
  ros,
}: IWaypointMapper): ReactElement {
  const { missionReducer } = useMission();

  return (
    <div className="flex w-full flex-col gap-2">
      {missionReducer.locations.map((location, index) => (
        <CardLayout
          key={index}
          className="flex items-center justify-between p-6 !shadow-sm"
        >
          <div className="flex flex-col gap-2 p-4 text-xs">
            <p>Location ID: {location.locationID}</p>
            <p>
              Position: {location.position.x}, {location.position.y},{" "}
              {location.position.z}
            </p>
            <p>
              Orientation: {location.orientation.x}, {location.orientation.y},{" "}
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
