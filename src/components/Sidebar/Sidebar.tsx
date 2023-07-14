import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarStaticItem from "../SidebarStaticItem/SidebarStaticItem";
import SidebarContentLayout from "../../layouts/SidebarContentLayout";
import SideBarMenuItem from "../SidebarMenuItem/SideBarMenuItem";
import { Link, useParams } from "react-router-dom";
import useSidebar from "../../hooks/useSidebar";

export default function Sidebar(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { sidebarState } = useSidebar();
  const url = useParams();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, [url?.robotName]);

  return (
    <Fragment>
      <div className="fixed flex flex-col items-center gap-4 h-screen w-20 py-2 bg-layer-light-50 shadow-2xl z-40 animate__animated animate__fadeInLeft">
        <Link to={`/`}>
          <img
            draggable="false"
            className="w-14 cursor-pointer hover:scale-90 transition-all duration-500"
            src="/svg/general/rocket.svg"
            alt="Robolaunch"
          />
        </Link>
        <div className="h-full flex flex-col justify-between">
          <div className="flex flex-col gap-4">
            {url?.robotName ||
            (sidebarState?.isCreateMode &&
              [
                "robot",
                "workspacesmanager",
                "buildsmanager",
                "launchsmanager",
              ].includes(sidebarState?.page as string)) ? (
              <Fragment>
                {url?.robotName && (
                  <SideBarMenuItem
                    type="back"
                    description="You can go back to the previous page here."
                  />
                )}
                <SideBarMenuItem
                  type="robot"
                  description="You can access all your robots here."
                  loading={isLoading}
                  disabled={
                    sidebarState?.isCreateMode &&
                    (sidebarState?.page === "robot" ||
                      sidebarState?.page === "workspacesmanager" ||
                      sidebarState?.page === "buildsmanager" ||
                      sidebarState?.page === "launchsmanager")
                  }
                />
                <SideBarMenuItem
                  type="workspacesmanager"
                  description="You can access all your workspaces here."
                  loading={isLoading}
                  disabled={
                    sidebarState?.isCreateMode &&
                    (sidebarState?.page === "robot" ||
                      sidebarState?.page === "workspacesmanager" ||
                      sidebarState?.page === "buildsmanager" ||
                      sidebarState?.page === "launchsmanager")
                  }
                />

                <SideBarMenuItem
                  type="buildsmanager"
                  description="You can access all your builds here."
                  loading={isLoading}
                  disabled={
                    sidebarState?.isCreateMode &&
                    (sidebarState?.page === "robot" ||
                      sidebarState?.page === "workspacesmanager" ||
                      sidebarState?.page === "buildsmanager" ||
                      sidebarState?.page === "launchsmanager")
                  }
                />
                <SideBarMenuItem
                  type="launchsmanager"
                  description="You can access all your launches here."
                  loading={isLoading}
                  disabled={
                    sidebarState?.isCreateMode &&
                    (sidebarState?.page === "robot" ||
                      sidebarState?.page === "workspacesmanager" ||
                      sidebarState?.page === "buildsmanager" ||
                      sidebarState?.page === "launchsmanager")
                  }
                />
              </Fragment>
            ) : (
              <Fragment>
                <SideBarMenuItem
                  type="organization"
                  description="You can access all your organizations here."
                />
                <SideBarMenuItem
                  type="roboticscloud"
                  description="You can access all your robotics clouds here."
                />
                <SideBarMenuItem
                  type="instance"
                  description="You can access all your instances here."
                />
                <SideBarMenuItem
                  type="fleet"
                  description="You can access all your fleets here."
                />
                <SideBarMenuItem
                  type="robot"
                  description="You can access all your robots here."
                />
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
    </Fragment>
  );
}
