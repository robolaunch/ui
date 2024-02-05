import EnvironmentSidebarMenuItems from "../EnvironmentSidebarMenuItems/EnvironmentSidebarMenuItems";
import MainSidebarStaticMenuItems from "../MainSidebarStaticMenuItems/MainSidebarStaticMenuItems";
import MainSidebarMenuItems from "../MainSidebarMenuItems/MainSidebarMenuItems";
import { Fragment, ReactElement } from "react";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";

export default function PrivateSidebar(): ReactElement {
  const { sidebarState } = useMain();
  const url = useParams();

  return (
    <Fragment>
      <div className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          {url?.robotName ||
          (sidebarState?.isCreateMode &&
            [
              "importmanager",
              "robot",
              "workspacesmanager",
              "buildsmanager",
              "launchsmanager",
            ].includes(sidebarState?.page as string)) ? (
            <EnvironmentSidebarMenuItems />
          ) : (
            <MainSidebarMenuItems />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <MainSidebarStaticMenuItems />
      </div>
    </Fragment>
  );
}
