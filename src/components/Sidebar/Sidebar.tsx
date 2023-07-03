import React, { Fragment, ReactElement } from "react";
import SidebarStaticItem from "../SidebarStaticItem/SidebarStaticItem";
import SidebarContentLayout from "../../layouts/SidebarContentLayout";
import SideBarMenuItem from "../SidebarMenuItem/SideBarMenuItem";
import { Link, useParams } from "react-router-dom";
import useSidebar from "../../hooks/useSidebar";

export default function Sidebar(): ReactElement {
  const { sidebarState } = useSidebar();
  const url = useParams();
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
            {url?.robotName ||
            (sidebarState?.isCreateMode &&
              [
                "robot",
                "workspacesmanager",
                "buildsmanager",
                "launchsmanager",
              ].includes(sidebarState?.page as string)) ? (
              <Fragment>
                {url?.robotName && <SideBarMenuItem type="back" />}
                <SideBarMenuItem type="robot" />
                <SideBarMenuItem type="workspacesmanager" />
                <SideBarMenuItem type="buildsmanager" />
                <SideBarMenuItem type="launchsmanager" />
              </Fragment>
            ) : (
              <Fragment>
                <SideBarMenuItem type="organization" />
                <SideBarMenuItem type="roboticscloud" />
                <SideBarMenuItem type="instance" />
                <SideBarMenuItem type="fleet" />
                <SideBarMenuItem type="robot" />
              </Fragment>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <SidebarStaticItem
            to="/billing"
            imgSrc={`/svg/general/billing/billing-gray.svg`}
          />
          <SidebarStaticItem
            to="/marketplace"
            imgSrc={`/svg/general/marketplace/marketplace-gray.svg`}
          />
          <SidebarStaticItem
            to="/user-role-management"
            imgSrc={`/svg/general/users/users-gray.svg`}
          />
        </div>
      </div>
      {sidebarState?.isOpen && <SidebarContentLayout />}
    </>
  );
}
