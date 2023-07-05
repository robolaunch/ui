import { useEffect, useState } from "react";
import useSidebar from "../../hooks/useSidebar";
import useTheme from "../../hooks/useTheme";
import { useNavigate, useParams } from "react-router-dom";
import SidebarMenuItemToolTip from "../SidebarMenuItemToolTip/SidebarMenuItemToolTip";

interface ISideBarMenuItem {
  type: string;
  description?: string;
}

export default function SideBarMenuItem({
  type,
  description,
}: ISideBarMenuItem) {
  const [isHover, setIsHover] = useState<boolean>(false);
  const { theme } = useTheme();
  const { sidebarState, setSidebarState, selectedState } = useSidebar();
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
      return "bg-layer-light-100 shadow";
    }
  }

  function handleClick() {
    if (type === "back") {
      return navigate(
        `/${url?.organizationName}/${url?.roboticsCloudName}/${url?.instanceName}/${url?.fleetName}`.trim()
      );
    }

    if (sidebarState?.page !== type) {
      setSidebarState((prevState: any) => {
        return { ...prevState, page: type, isOpen: true };
      });
    } else {
      setSidebarState((prevState: any) => {
        return { ...prevState, page: undefined, isOpen: false };
      });
    }
  }

  return (
    <div
      onClick={() => handleClick()}
      className={`${activeSwitcher()} relative transition-500 p-2 rounded-md cursor-pointer hover:scale-90 animate__animated animate__fadeInLeft`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img
        draggable="false"
        className="w-10 animate__animated animate__fadeInLeft"
        src={`/svg/general/${type}/${type}-${colorSwitcher()}.svg`}
        alt="Robolaunch"
      />
      {isHover && (
        <SidebarMenuItemToolTip
          title={
            type === "organization"
              ? "Organizations"
              : type === "roboticscloud"
              ? "Robotics Clouds"
              : type === "instance"
              ? "Instances"
              : type === "fleet"
              ? "Fleets"
              : type === "robot"
              ? "Robots"
              : type === "workspacesmanager"
              ? "Robot Workspace Managers"
              : type === "buildsmanager"
              ? "Robot Build Managers"
              : type === "launchsmanager"
              ? "Robot Launch Managers"
              : type
          }
          description={description}
        />
      )}
    </div>
  );
}
