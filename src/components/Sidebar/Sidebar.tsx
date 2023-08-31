import React, { Fragment, ReactElement } from "react";
import SidebarContentLayout from "../../layouts/SidebarContentLayout";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import useMain from "../../hooks/useMain";
import { Link } from "react-router-dom";

export default function Sidebar(): ReactElement {
  const { sidebarState } = useMain();

  return (
    <Fragment>
      <div className="fixed flex flex-col items-center gap-4 h-screen w-16 lg:w-20 py-2 bg-layer-light-50 shadow-2xl z-40 border-r border-layer-light-200 select-none animate__animated animate__fadeInLeft ">
        <Link to={`/`}>
          <img
            draggable="false"
            className="w-12 lg:w-14 cursor-pointer hover:scale-90 transition-all duration-500"
            src="/svg/general/rocket.svg"
            alt="robolaunch"
          />
        </Link>
        <SidebarMenu />
      </div>
      {sidebarState?.isOpen && <SidebarContentLayout />}
    </Fragment>
  );
}
