import React, { Fragment, ReactElement, useContext } from "react";
import { SidebarContext } from "../../contexts/SidebarContext";
import { ContentLayout } from "../../layouts/ContentLayout";
import { Link } from "react-router-dom";
import SidebarStaticItem from "../SidebarStaticItem/SidebarStaticItem";
import { SideBarMenuItem } from "../SidebarMenuItem/SideBarMenuItem";

export default function Sidebar(): ReactElement {
  const { sidebarState }: any = useContext(SidebarContext);

  return (
    <>
      <div className="fixed flex flex-col items-center gap-4 h-screen w-20 py-2 bg-layer-light-50 shadow-2xl z-40 animate__animated animate__fadeInLeft">
        <Link to={`/`}>
          <img
            className="w-14 cursor-pointer hover:scale-90 transition-all duration-500"
            src="/svg/general/rocket.svg"
            alt="Robolaunch"
          />
        </Link>
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
      </div>
      {sidebarState?.isOpen && <ContentLayout />}
    </>
  );
}
