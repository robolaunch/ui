import { useEffect, useState } from "react";
import SidebarMenuItemToolTip from "../SidebarMenuItemToolTip/SidebarMenuItemToolTip";
import { envApplication } from "../../helpers/envProvider";
import { useNavigate, useParams } from "react-router-dom";
import { isDesktop } from "react-device-detect";
import useTheme from "../../hooks/useTheme";
import useMain from "../../hooks/useMain";

interface ISideBarMenuItem {
  type: string;
  description?: string;
  loading?: boolean;
  disabled?: boolean;
}

export default function SideBarMenuItem({
  type,
  description,
  loading,
  disabled,
}: ISideBarMenuItem) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { theme } = useTheme();
  const { sidebarState, setSidebarState, selectedState } = useMain();
  const navigate = useNavigate();
  const url = useParams();

  useEffect(() => {
    activeSwitcher();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarState.page]);

  function colorSwitcher() {
    if (theme === "light") {
      switch (type) {
        case "organization":
          if (selectedState?.organization) {
            return "blue";
          }
          break;
        case "roboticscloud":
          if (selectedState?.roboticsCloud) {
            return "blue";
          }
          break;
        case "instance":
          if (selectedState?.instance) {
            return "blue";
          }
          break;
        case "fleet":
          if (selectedState?.fleet) {
            return "blue";
          }
          break;
      }
      return "gray";
    } else {
      return "white";
    }
  }

  function activeSwitcher() {
    if (sidebarState?.page === type) {
      return "bg-light-100 ring-1 ring-light-200 shadow";
    }
  }

  function handleClick() {
    if (type === "back") {
      return navigate(
        `/${url?.organizationName}/${url?.roboticsCloudName}/${url?.instanceName}/${url?.fleetName}`.trim(),
      );
    }

    if (sidebarState?.page !== type) {
      setSidebarState((prevState: any) => {
        return { ...prevState, page: type, isOpen: true, isCreateMode: false };
      });
    } else {
      setSidebarState((prevState: any) => {
        return {
          ...prevState,
          page: undefined,
          isOpen: false,
          isCreateMode: false,
          instanceTab: "Cloud Instances",
        };
      });
    }
  }

  return (
    <div
      data-tut={type + "-sidebar-menu-item"}
      onClick={() => !loading && !disabled && handleClick()}
      className={`${activeSwitcher()} transition-500 animate__animated animate__fadeInLeft relative cursor-pointer select-none rounded-md p-2 hover:scale-90 ${
        (loading || disabled) && "!cursor-not-allowed"
      }`}
      onMouseEnter={() => !loading && !disabled && setIsHover(true)}
      onMouseLeave={() => !loading && !disabled && setIsHover(false)}
    >
      {loading ? (
        <img
          draggable="false"
          className={`animate__animated animate__fadeInLeft w-9 lg:w-10`}
          src={`/svg/general/loading.svg`}
          alt="robolaunch"
        />
      ) : (
        <img
          draggable="false"
          className={`animate__animated animate__fadeInLeft w-9 lg:w-10`}
          src={`/svg/general/${(() => {
            switch (type) {
              case "robot":
                return envApplication ? "application" : "robot";
              case "back":
                return envApplication ? "back-application" : "back";
              default:
                return type;
            }
          })()}/${
            envApplication && type === "robot" ? "application" : type
          }-${colorSwitcher()}.svg`}
          alt="robolaunch"
          style={{ filter: "drop-shadow(0 0 0.5px #00000035" }}
        />
      )}
      {isHover && isDesktop && !loading && (
        <SidebarMenuItemToolTip
          title={
            type === "organization"
              ? "Organizations"
              : type === "roboticscloud"
              ? "Regions"
              : type === "instance"
              ? "Instances"
              : type === "fleet"
              ? envApplication
                ? "Namespaces"
                : "Fleets"
              : type === "robot"
              ? envApplication
                ? "Applications"
                : "Robots"
              : type === "workspacesmanager"
              ? "Robot Workspace Managers"
              : type === "buildsmanager"
              ? "Robot Build Managers"
              : type === "launchsmanager"
              ? "Robot Launch Managers"
              : type === "back"
              ? "Back"
              : type
          }
          description={description}
        />
      )}
    </div>
  );
}
