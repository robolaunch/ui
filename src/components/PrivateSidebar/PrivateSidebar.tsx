import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarStaticItem from "../SidebarStaticItem/SidebarStaticItem";
import SideBarMenuItem from "../SidebarMenuItem/SideBarMenuItem";
import useSidebar from "../../hooks/useSidebar";
import { useParams } from "react-router-dom";

export default function PrivateSidebar(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { sidebarState } = useSidebar();
  const url = useParams();

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 10000);
  }, [url]);

  return (
    <Fragment>
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
              <SidebarStaticItem
                to="/marketplace"
                imgSrc={`/svg/general/marketplace/marketplace-blue.svg`}
              />
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
        {/* <SidebarStaticItem
            to="/billing"
            imgSrc={`/svg/general/billing/billing-gray.svg`}
          /> */}

        <SidebarStaticItem
          to="/user-role-management"
          imgSrc={`/svg/general/users/users-gray.svg`}
        />
      </div>
    </Fragment>
  );
}
