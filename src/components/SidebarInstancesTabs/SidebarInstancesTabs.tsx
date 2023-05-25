import React, { ReactElement } from "react";
import useSidebar from "../../hooks/useSidebar";

export default function SidebarInstancesTabs(): ReactElement {
  const { sidebarState, setSidebarState } = useSidebar();

  return (
    <ul className="h-10 w-full flex items-center">
      {["Cloud Instances", "Physical Instances"].map(
        (item: any, index: number) => {
          return (
            <li
              key={index}
              className={`w-full flex flex-col gap-3 items-center justify-center text-xs font-medium px-1 transition-all duration-500 min-w-max hover:scale-95 text-layer-light-300 cursor-pointer ${
                sidebarState?.instanceTab === item && "!text-layer-primary-500"
              }`}
              onClick={() =>
                setSidebarState({
                  ...sidebarState,
                  instanceTab: item,
                })
              }
            >
              <p>{item}</p>
              <span
                className={`w-full bg-layer-light-300 h-[2px] ${
                  sidebarState?.instanceTab === item && "!bg-primary"
                } `}
              />
            </li>
          );
        }
      )}
    </ul>
  );
}
