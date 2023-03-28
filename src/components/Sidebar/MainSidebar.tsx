import React, { FC } from "react";
import { SideBarMenuItem } from "./SideBarMenuItem";
import { Link } from "react-router-dom";

export const MainSidebar: FC = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <SideBarMenuItem type="organization" />
      <SideBarMenuItem type="roboticscloud" />
      <SideBarMenuItem type="fleet" />
      <SideBarMenuItem type="robot" />
      <Link
        to="/user-role-management"
        className="transition-all duration-500 p-2 rounded-md cursor-pointer hover:scale-90"
      >
        <img
          className="w-10"
          src={`/svg/sidebar/docs/docs-gray.svg`}
          alt="Robolaunch"
        />
      </Link>
    </div>
  );
};
