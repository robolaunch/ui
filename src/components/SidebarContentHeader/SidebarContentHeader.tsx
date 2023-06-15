import React, { Fragment, ReactElement } from "react";
import useSidebar from "../../hooks/useSidebar";
import { useParams } from "react-router-dom";
import stringCapitalization from "../../helpers/stringCapitalization";

interface ISidebarContentHeader {
  itemCount?: number;
  handleReload?: () => void;
  loading?: boolean;
  handleShowDetails: () => boolean;
}

export default function SidebarContentLayout({
  itemCount,
  handleReload,
  loading,
  handleShowDetails,
}: ISidebarContentHeader): ReactElement {
  const { sidebarState } = useSidebar();
  const url = useParams();

  function titleGenerator() {
    if (sidebarState?.page === "roboticscloud") {
      return "Robotics Clouds";
    }
    if (sidebarState?.page === "instance") {
      if (sidebarState?.instanceTab === "Cloud Instances") {
        return "Cloud Instances";
      }
      return "Physical Instances";
    }
    switch (sidebarState?.page) {
      case "robot":
        if (url?.robotName) {
          return `${url.robotName} Robot Details`;
        }
        return sidebarState?.isCreateMode ? "Robot Details" : "Robots";
      case "workspacesmanager":
        return "Robot Workspace Configuration";
      case "buildsmanager":
        return "Robot Build Configuration";
      case "launchsmanager":
        return "Robot Launch Configuration";
    }

    return stringCapitalization({
      str: sidebarState?.page + "s",
    });
  }

  return (
    <div
      className={`flex gap-4 items-center ${
        sidebarState?.isCreateMode ? "pb-8" : " pb-4"
      }`}
    >
      <h2 className="text-[1.75rem] font-semibold">{titleGenerator()}</h2>
      {handleShowDetails() && (
        <Fragment>
          <span className="bg-layer-primary-300 px-2.5 py-0.5 rounded-lg">
            {itemCount}
          </span>
          <i
            onClick={handleReload}
            className={`pi pi-refresh text-lightLayer-700 hover:scale-90 active:scale-75 cursor-pointer transition-all duration-500 ${
              loading && "animate-spin"
            }`}
            style={{ fontSize: "1rem" }}
          />
        </Fragment>
      )}
    </div>
  );
}
