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
    <div className="animate__animated animate__fadeInDown border-light-200 bg-light-50 text-light-400 z-30 flex h-16 w-full items-center justify-between border-b px-4 shadow-md">
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
