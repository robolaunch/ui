import React, { Fragment, ReactElement, useContext } from "react";
import { SideBarMenuItem } from "./SideBarMenuItem";
import { SidebarContext } from "../../contexts/SidebarContext";
import SidebarStaticItem from "../SidebarStaticItem/SidebarStaticItem";

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
        <SidebarStaticItem
          to="/billing"
          imgSrc={`/svg/sidebar/marketplace/marketplace-gray.svg`}
        />
        <SidebarStaticItem
          to="/marketplace"
          imgSrc={`/svg/sidebar/marketplace/marketplace-gray.svg`}
        />
        <SidebarStaticItem
          to="/user-role-management"
          imgSrc={`/svg/sidebar/users/users-gray.svg`}
        />
      </div>
    </Fragment>
  );
}
