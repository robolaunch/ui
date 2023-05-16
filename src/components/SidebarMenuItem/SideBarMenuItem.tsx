import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { SidebarContext } from "../../contexts/SidebarContext";

interface ISideBarMenuItem {
  type: string;
}

export const SideBarMenuItem = ({ type }: ISideBarMenuItem) => {
  const { theme }: any = useContext(ThemeContext);
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  function colorSwitcher() {
    if (theme === "light") {
      return "gray";
    } else {
      return "white";
    }
  }

  const activeSwitcher = () => {
    if (sidebarState?.page === type) {
      return "bg-layer-light-100";
    }
  };

  const handleClick = () => {
    if (sidebarState?.page !== type) {
      setSidebarState((prevState: any) => {
        return { ...prevState, page: type, isOpen: true };
      });
    } else {
      setSidebarState((prevState: any) => {
        return { ...prevState, page: undefined, isOpen: false };
      });
    }
  };

  return (
    <div
      onClick={() => handleClick()}
      className={`${activeSwitcher()} transition-all duration-500 p-2 rounded-md cursor-pointer hover:scale-90 animate__animated animate__fadeInLeft`}
    >
      <img
        className="w-10"
        src={`/svg/sidebar/${type}/${type}-${colorSwitcher()}.svg`}
        alt="Robolaunch"
      />
    </div>
  );
};
