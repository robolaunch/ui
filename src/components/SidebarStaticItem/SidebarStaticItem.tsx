import React, { ReactElement, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import SidebarMenuItemToolTip from "../SidebarMenuItemToolTip/SidebarMenuItemToolTip";

interface ISidebarStaticItem {
  to: string;
  imgSrc: string;
}

export default function SidebarStaticItem({
  to,
  imgSrc,
}: ISidebarStaticItem): ReactElement {
  const [isHover, setIsHover] = useState<boolean>(false);

  const location = useLocation();

  return (
    <Link
      to={to}
      className={`transition-all duration-500 p-2 rounded-md cursor-pointer hover:scale-90 animate__animated animate__fadeInLeft relative ${
        location?.pathname?.includes(to) &&
        "bg-layer-light-100 transition-all duration-500"
      }`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <img draggable="false" className="w-10" src={imgSrc} alt="Robolaunch" />
      {isHover && (
        <SidebarMenuItemToolTip
          title={
            to === "/marketplace"
              ? "Marketplace"
              : to === "/billing"
              ? "Billing"
              : to === "/user-role-management"
              ? "User Role Management"
              : to === "/trial"
              ? "Trial"
              : to
          }
          description={
            to === "/marketplace"
              ? "You can access all your marketplace here."
              : to === "/billing"
              ? "You can access all your bills here"
              : to === "/user-role-management"
              ? "You can access all users here."
              : to === "/trial"
              ? "You can access all your demo applications here."
              : to
          }
        />
      )}
    </Link>
  );
}
