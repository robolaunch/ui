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
    <ul className="flex w-full items-center justify-center gap-6 p-2.5">
      {["Chat", "Viewers", "Readme"].map((tab: any, index: number) => {
        return (
          <li
            className="flex cursor-pointer flex-col gap-3"
            onClick={() => handleChangeActiveTab(tab)}
            key={index}
          >
            <div
              className={`px-2 text-xs font-medium transition-all duration-500 ${
                tab === activeTab ? "text-primary-500" : "text-light-500"
              } `}
            >
              {tab}
            </div>
            <div
              className={`h-[2px] w-full transition-all duration-500 ${
                tab === activeTab ? "bg-primary-500" : "bg-transparent"
              } `}
            />
          </li>
        );
      })}
    </ul>
  );
}
