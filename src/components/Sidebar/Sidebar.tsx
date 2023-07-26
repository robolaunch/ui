import React, { Fragment, ReactElement } from "react";
import SidebarContentLayout from "../../layouts/SidebarContentLayout";
import { Link } from "react-router-dom";
import useSidebar from "../../hooks/useSidebar";
import PrivateSidebar from "../PrivateSidebar/PrivateSidebar";

export default function Sidebar(): ReactElement {
  const { sidebarState } = useSidebar();

  return (
    <Fragment>
      <div className="fixed flex flex-col items-center gap-4 h-screen w-20 py-2 bg-layer-light-50 shadow-2xl z-40 animate__animated animate__fadeInLeft">
        <Link to={`/`}>
          <img
            draggable="false"
            className="w-14 cursor-pointer hover:scale-90 transition-all duration-500"
            src="/svg/general/rocket.svg"
            alt="robolaunch"
          />
        </Link>
        <PrivateSidebar />
      </div>
      {sidebarState?.isOpen && <SidebarContentLayout />}
    </Fragment>
  );
}
