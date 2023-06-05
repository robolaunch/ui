import { useEffect } from "react";
import useSidebar from "../../hooks/useSidebar";
import useTheme from "../../hooks/useTheme";
import { useNavigate, useParams } from "react-router-dom";

interface ISideBarMenuItem {
  type: string;
}

export default function SideBarMenuItem({ type }: ISideBarMenuItem) {
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
      return "bg-layer-light-100";
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
      className={`${activeSwitcher()} transition-all duration-500 p-2 rounded-md cursor-pointer hover:scale-90 animate__animated animate__fadeInLeft`}
    >
      <img
        className="w-10"
        src={`/svg/general/${type}/${type}-${colorSwitcher()}.svg`}
        alt="Robolaunch"
      />
    </div>
  );
}
