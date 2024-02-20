import { Fragment, ReactElement, useState } from "react";
import CardLayout from "../../layouts/CardLayout";
import WaypointsMapper from "../waypointsmapper.sidebar.mission/waypointsmapper.sidebar.mission.comp";
import JobsMapper from "../jobsmapper.sidebar.mission/jobsmapper.sidebar.mission.comp";

interface ISidebarMissionManagement {
  ros: any;
}

export default function SidebarMissionManagement({
  ros,
}: ISidebarMissionManagement): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Waypoints");

  return (
    <CardLayout className="flex h-full  w-full flex-col gap-6 px-8 py-4">
      <div className="flex w-full gap-4">
        {["Waypoints", "Jobs"].map((tab, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(tab)}
            className={`flex w-full cursor-pointer flex-col items-center justify-center gap-1 text-xs ${activeTab === tab ? "text-primary-500" : "text-light-500"}`}
          >
            <span>{tab}</span>
            <div
              className={`h-[2px] w-full ${activeTab === tab ? "bg-primary-500" : "bg-light-300"}`}
            />
          </div>
        ))}
      </div>
      <Fragment>
        {(() => {
          switch (activeTab) {
            case "Waypoints":
              return <WaypointsMapper ros={ros} />;
            case "Jobs":
              return <JobsMapper />;
          }
        })()}
      </Fragment>
    </CardLayout>
  );
}
