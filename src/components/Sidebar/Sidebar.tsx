import React, { FC, useContext } from "react";
import { MainSidebar } from "./MainSidebar";
import { SidebarContext } from "../../context/SidebarContext";
import { ContentLayout } from "./Content/ContentLayout";

export const Sidebar: FC = () => {
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);
  return (
    <>
      <div className="fixed flex flex-col items-center gap-4 h-screen w-24 py-2 bg-layer-light-50 shadow-2xl z-10">
        <img className="w-14" src="/svg/general/rocket.svg" alt="Robolaunch" />
        <MainSidebar />
      </div>
      {sidebarState?.isOpen && <ContentLayout />}
    </>
  );
};
