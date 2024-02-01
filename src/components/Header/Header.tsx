import HeaderDropdownMenu from "../HeaderDropdownMenu/HeaderDropdownMenu";
import BugFeedbackButton from "../BugFeedbackButton/BugFeedbackButton";
import InstallAppButton from "../InstallAppButton/InstallAppButton";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { ReactElement } from "react";

export default function Header(): ReactElement {
  return (
    <div className="animate__animated animate__fadeInDown sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-light-200 bg-light-50 px-4 text-light-400 shadow-md">
      <Breadcrumb />
      <div className="flex items-center gap-3">
        <BugFeedbackButton />
        <InstallAppButton />
        <HeaderDropdownMenu />
      </div>
    </div>
  );
}
