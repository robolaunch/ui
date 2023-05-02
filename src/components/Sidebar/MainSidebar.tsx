import React, { Fragment, ReactElement, useContext } from "react";
import { SideBarMenuItem } from "./SideBarMenuItem";
import { Link } from "react-router-dom";
import { SidebarContext } from "../../contexts/SidebarContext";

export default function MainSidebar(): ReactElement {
  const { sidebarState }: any = useContext(SidebarContext);

  return (
    <Fragment>
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-4 ">
          {sidebarState?.isCreateMode &&
          ["robot", "workspacesmanager", "buildsmanager"].includes(
            sidebarState?.page
          ) ? (
            <Fragment>
              <SideBarMenuItem type="robot" />
              <SideBarMenuItem type="workspacesmanager" />
              <SideBarMenuItem type="buildsmanager" />
            </Fragment>
          ) : (
            <Fragment>
              <SideBarMenuItem type="organization" />
              <SideBarMenuItem type="roboticscloud" />
              <SideBarMenuItem type="fleet" />
              <SideBarMenuItem type="robot" />
            </Fragment>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <Link
          to="/marketplace"
          className="transition-all duration-500 p-2 rounded-md cursor-pointer hover:scale-90"
        >
          <img
            className="w-10"
            src={`/svg/sidebar/marketplace/marketplace-gray.svg`}
            alt="Robolaunch"
          />
        </Link>
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
    </Fragment>
  );
}
