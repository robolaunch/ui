import React, { ReactElement } from "react";
import useMain from "../../hooks/useMain";

export default function SidebarInstancesTabs(): ReactElement {
  const { sidebarState, setSidebarState } = useMain();

  return (
    <ul className="flex h-10 w-full items-center">
      {["Cloud Instances", "Physical Instances"].map(
        (item: any, index: number) => {
          return (
            <li
              key={index}
              className={`flex w-full min-w-max cursor-pointer flex-col items-center justify-center gap-3 px-1 text-xs font-medium text-layer-light-300 transition-all duration-500 hover:scale-95 ${
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
                className={`h-[2px] w-full bg-layer-light-300 ${
                  sidebarState?.instanceTab === item && "!bg-primary"
                } `}
              />
            </li>
          );
        },
      )}
    </ul>
  );
}
