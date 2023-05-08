import React, { ReactElement, useContext } from "react";
import MainSidebar from "./MainSidebar";
import { SidebarContext } from "../../contexts/SidebarContext";
import { ContentLayout } from "./Content/ContentLayout";
import { Link } from "react-router-dom";

export default function Sidebar(): ReactElement {
  const { sidebarState }: any = useContext(SidebarContext);

  return (
    <>
      <div className="fixed flex flex-col items-center gap-4 h-screen w-20 py-2 bg-layer-light-50 shadow-2xl z-40 animate__animated animate__fadeInLeft">
        <Link to={`/`}>
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
}
