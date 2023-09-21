import React, { ReactElement } from "react";
// import NotificationDropdownMenu from "../NotificationDropdownMenu/NotificationDropdownMenu";
import HeaderDropdownMenu from "../HeaderDropdownMenu/HeaderDropdownMenu";
// import TimerDropdownMenu from "../TimerDropdownMenu/TimerDropdownMenu";
// import ThemeToggle from "../ThemeToggle/ThemeToggle";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import BugFeedbackButton from "../BugFeedbackButton/BugFeedbackButton";
import InstallAppButton from "../InstallAppButton/InstallAppButton";

export default function Header(): ReactElement {
  return (
    <div className="w-full h-16 px-4 flex justify-between items-center bg-layer-light-50 text-layer-dark-200 shadow-md animate__animated animate__fadeInDown z-30 border-b border-layer-light-200">
      <Breadcrumb />
      <div className="flex items-center gap-3">
        {/* <TimerDropdownMenu /> */}
        {/* {<ThemeToggle />} */}
        {/* <NotificationDropdownMenu /> */}
        <BugFeedbackButton />
        <InstallAppButton />

        <HeaderDropdownMenu />
      </div>
    </div>
  );
}
