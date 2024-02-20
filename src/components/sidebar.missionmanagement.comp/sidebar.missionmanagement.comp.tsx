import { ReactElement, useState } from "react";

export default function SidebarMissionManagement(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Waypoints");

  return (
    <div className="flex w-full gap-4">
      {["Waypoints", "Jobs"].map((tab, index) => (
        <div
          key={index}
          onClick={() => setActiveTab(tab)}
          className={`flex w-full cursor-pointer flex-col items-center justify-center gap-1 text-sm ${activeTab === tab ? "text-primary-500" : "text-light-500"}`}
        >
          <span>{tab}</span>
          <div
            className={`h-[2px] w-full ${activeTab === tab ? "bg-primary-500" : "bg-light-300"}`}
          />
        </div>
      ))}
    </div>
  );
}
