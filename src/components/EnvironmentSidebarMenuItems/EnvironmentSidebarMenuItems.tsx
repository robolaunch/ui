import { Fragment, ReactElement, useEffect, useState } from "react";
import SideBarMenuItem from "../SidebarMenuItem/SideBarMenuItem";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";

export default function EnvironmentSidebarMenuItems(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { applicationMode, sidebarState } = useMain();
  const url = useParams();

  useEffect(() => {
    if (url.robotName) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    }
  }, [url]);

  return (
    <Fragment>
      {url?.robotName && (
        <SideBarMenuItem
          type="back"
          description="You can go back to the previous page here."
        />
      )}
      <SideBarMenuItem
        type="robot"
        description={
          url?.robotName
            ? `You can update your ${applicationMode ? "application" : "robot"} from here.`
            : `You can access all your ${applicationMode ? "applications" : "robots"} here.`
        }
        loading={isLoading}
        disabled={
          sidebarState?.isCreateMode &&
          (sidebarState?.page === "robot" ||
            sidebarState?.page === "workspacesmanager" ||
            sidebarState?.page === "buildsmanager" ||
            sidebarState?.page === "launchsmanager")
        }
      />

      {!applicationMode && (
        <Fragment>
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
      )}
    </Fragment>
  );
}
