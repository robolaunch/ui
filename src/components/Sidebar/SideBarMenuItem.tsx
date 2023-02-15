import React, { FC, useContext, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { SidebarContext } from "../../context/SidebarContext";

interface SideBarMenuItemProps {
  type: string;
}

export const SideBarMenuItem = ({ type }: SideBarMenuItemProps) => {
  const { theme }: any = useContext(ThemeContext);
  const { sidebarState, setSidebarState }: any = useContext(SidebarContext);

  const colorSwitcher = () => {
    if (theme === "light") {
      return "gray";
    } else {
      return "white";
    }
  };

  const activeSwitcher = () => {
    if (sidebarState?.page === type) {
      return "bg-lightLayer-300";
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
      className={`${activeSwitcher()} transition-all duration-500 p-2  rounded-md`}
    >
      <img
        className="w-11"
        src={`/svg/sidebar/${type}/${type}-${colorSwitcher()}.svg`}
        alt="Robolaunch"
      />
    </div>
  );
};
