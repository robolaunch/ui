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
              className={`text-light-300 flex w-full min-w-max cursor-pointer flex-col items-center justify-center gap-3 px-1 text-xs font-medium transition-all duration-500 hover:scale-95 ${
                sidebarState?.instanceTab === item && "!text-primary-500"
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
                className={`bg-light-300 h-[2px] w-full ${
                  sidebarState?.instanceTab === item && "!bg-primary-500"
                } `}
              />
            </li>
          );
        },
      )}
    </ul>
  );
}
