import React, { ReactElement } from "react";
import HeaderDropdownMenu from "../HeaderDropdownMenu/HeaderDropdownMenu";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
// import TimerDropdownMenu from "../TimerDropdownMenu/TimerDropdownMenu";
import NotificationDropdownMenu from "../NotificationDropdownMenu/NotificationDropdownMenu";

export default function Header(): ReactElement {
  return (
    <div className="w-full h-16 px-4 flex justify-between items-center bg-layer-light-50 text-layer-dark-200 shadow-md animate__animated animate__fadeInDown z-30 border-b border-layer-light-200">
      <Breadcrumb />
      <div className="flex items-center gap-4">
        {/* <TimerDropdownMenu /> */}
        <NotificationDropdownMenu />
        <HeaderDropdownMenu />
      </div>
    </div>
  );
}
