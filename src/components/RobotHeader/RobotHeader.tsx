import React, { ReactElement } from "react";

interface IRobotHeader {
  handleChangeActiveTab: any;
  activeTab: string;
}

export default function RobotHeader({
  handleChangeActiveTab,
  activeTab,
}: IRobotHeader): ReactElement {
  const tabs = [
    {
      name: "Overview",
    },
    {
      name: "Task Management",
    },
    {
      name: "Robot Workspaces",
    },
    {
      name: "Kubernetes Resources",
    },
    {
      name: "Code Editor",
    },
    {
      name: "Visualization",
    },
    {
      name: "Teleoperation",
    },
    {
      name: "Remote Desktop",
    },
    {
      name: "Settings",
    },
    {
      name: "Development Suite",
    },
  ];

  return (
    <div className="flex flex-col justify-between bg-layer-light-50 rounded-lg shadow">
      <div className="h-[5rem]">robot header</div>
      <ul className="flex gap-8 px-6 overflow-x-auto">
        {tabs.map((tab: any, index: number) => {
          return (
            <div
              className="flex flex-col gap-3 cursor-pointer"
              onClick={() => handleChangeActiveTab(tab.name)}
              key={index}
            >
              <li
                className={`text-xs font-medium px-2 transition-all duration-500 min-w-max ${
                  tab.name === activeTab
                    ? "text-layer-primary-500"
                    : "text-layer-light-500"
                } `}
              >
                {tab.name}
              </li>
              <div
                className={`w-full h-[2px] transition-all duration-500 ${
                  tab.name === activeTab
                    ? "bg-layer-primary-500"
                    : "bg-transparent"
                } `}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
}
