import { Fragment, ReactElement } from "react";
import SidebarContentLayout from "../../layouts/SidebarContentLayout";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import useMain from "../../hooks/useMain";
import { Link } from "react-router-dom";

export default function Sidebar(): ReactElement {
  const { sidebarState } = useMain();

  return (
    <Fragment>
      <div className="animate__animated animate__fadeInLeft fixed z-40 flex h-screen w-16 select-none flex-col items-center gap-4 border-r border-light-200 bg-light-50 py-2 shadow-2xl lg:w-20 ">
        <Link to={`/`}>
          <img
            draggable="false"
            className="w-12 cursor-pointer transition-all duration-500 hover:scale-90 lg:w-14"
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
