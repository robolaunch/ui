import React, { ReactElement } from "react";

interface IRemoteDesktopHeader {
  handleChangeActiveTab: (tab: "Chat" | "Viewers" | "Readme") => void;
  activeTab: "Chat" | "Viewers" | "Readme";
}

export default function RemoteDesktopHeader({
  handleChangeActiveTab,
  activeTab,
}: IRemoteDesktopHeader): ReactElement {
  return (
    <ul className="w-full flex items-center justify-center gap-6 p-2.5">
      {["Chat", "Viewers", "Readme"].map((tab: any, index: number) => {
        return (
          <li
            className="flex flex-col gap-3 cursor-pointer"
            onClick={() => handleChangeActiveTab(tab)}
            key={index}
          >
            <div
              className={`text-xs font-medium px-2 transition-all duration-500 ${
                tab === activeTab
                  ? "text-layer-primary-500"
                  : "text-layer-light-500"
              } `}
            >
              {tab}
            </div>
            <div
              className={`w-full h-[2px] transition-all duration-500 ${
                tab === activeTab ? "bg-layer-primary-500" : "bg-transparent"
              } `}
            />
          </li>
        );
      })}
    </ul>
  );
}
