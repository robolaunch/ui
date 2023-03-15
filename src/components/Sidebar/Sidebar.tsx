import React, { FC, useContext } from "react";
import { MainSidebar } from "./MainSidebar";
import { SidebarContext } from "../../contexts/SidebarContext";
import { ContentLayout } from "./Content/ContentLayout";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { RootState } from "../../app/store";

export const Sidebar: FC = () => {
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );
  return (
    <>
      <div className="fixed flex flex-col items-center gap-4 h-screen w-20 py-2 bg-layer-light-50 shadow-2xl z-40 animate__animated animate__fadeInLeft">
        <Link to={`${currentOrganization.name}/`}>
          <img
            className="w-14 cursor-pointer hover:scale-90 transition-all duration-500"
            src="/svg/general/rocket.svg"
            alt="Robolaunch"
          />
        </Link>
        <MainSidebar />
      </div>
      {sidebarState?.isOpen && <ContentLayout />}
    </>
  );
};
