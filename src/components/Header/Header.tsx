import React, { ReactElement } from "react";
import HeaderDropdownMenu from "../HeaderDropdownMenu/HeaderDropdownMenu";
import Breadcrumb from "../Breadcrumb/Breadcrumb";

export default function Header(): ReactElement {
  return (
    <div className="w-full h-16 px-4 flex justify-between items-center bg-layer-light-50 text-layer-dark-200 shadow-md animate__animated animate__fadeInDown z-30">
      <Breadcrumb />
      <div className="flex items-center gap-6">
        {/* <NotificationDropdownMenu /> */}
        {/* <ThemeToggle /> */}
        <HeaderDropdownMenu />
      </div>
    </div>
  );
}
