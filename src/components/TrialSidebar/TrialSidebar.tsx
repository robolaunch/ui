import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarStaticItem from "../SidebarStaticItem/SidebarStaticItem";
import SideBarMenuItem from "../SidebarMenuItem/SideBarMenuItem";
import useSidebar from "../../hooks/useSidebar";
import { useParams } from "react-router-dom";
import { organizationNameViewer } from "../../functions/GeneralFunctions";

export default function TrialSidebar(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { sidebarState, selectedState } = useSidebar();
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
                to="/trial"
                imgSrc={`/svg/general/marketplace/marketplace-gray.svg`}
              />
              <SidebarStaticItem
                to={`/trial/${organizationNameViewer({
                  organizationName:
                    selectedState?.organization?.organizationName,
                  capitalization: false,
                })}/${selectedState?.roboticsCloud?.name}/${
                  selectedState?.instance?.name
                }/${selectedState?.fleet?.name}`}
                imgSrc={`/svg/general/templates/templates-gray.svg`}
              />
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}
