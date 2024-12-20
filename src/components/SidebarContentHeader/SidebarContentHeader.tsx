import { stringCapitalization } from "../../functions/general.function";
import { Fragment, ReactElement } from "react";
import { useParams } from "react-router-dom";
import useMain from "../../hooks/useMain";

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
  const { sidebarState, applicationMode } = useMain();
  const url = useParams();

  function titleGenerator() {
    if (sidebarState?.page === "roboticscloud") {
      return "Regions";
    }

    if (sidebarState?.page === "instance") {
      if (sidebarState?.instanceTab === "Cloud Instances") {
        return "Cloud Instances";
      }
      return "Physical Instances";
    }

    if (sidebarState?.page === "fleet" && applicationMode) {
      return "Namespaces";
    }

    switch (sidebarState?.page) {
      case "importmanager":
        return "Import Manager";
      case "robot":
        if (url?.robotName) {
          return `${url.robotName} ${
            applicationMode ? "Application" : "Robot"
          } Details`;
        }
        return sidebarState?.isCreateMode
          ? applicationMode
            ? "Application Details"
            : "Robot Details"
          : applicationMode
            ? "Applications"
            : "Robots";
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
      className={`flex items-center gap-4 ${
        sidebarState?.isCreateMode ? "pb-8" : " pb-4"
      }`}
    >
      <h2 className="text-[1.75rem] font-semibold">{titleGenerator()}</h2>
      {handleShowDetails() && (
        <Fragment>
          <span className="rounded-lg bg-primary-300 px-2.5 py-0.5">
            {itemCount}
          </span>
          <i
            onClick={handleReload}
            className={`pi pi-refresh text-lightLayer-700 cursor-pointer transition-all duration-500 hover:scale-90 active:scale-75 ${
              loading && "animate-spin"
            }`}
            style={{ fontSize: "1rem" }}
          />
        </Fragment>
      )}
    </div>
  );
}
