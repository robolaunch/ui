import { ReactElement, useState } from "react";
import SidebarMenuItemToolTip from "../SidebarMenuItemToolTip/SidebarMenuItemToolTip";
import { useLocation, useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();

  return (
    <div
      className={`animate__animated animate__fadeInLeft relative cursor-pointer select-none rounded-md p-2 transition-all duration-500 hover:scale-90 ${
        location?.pathname?.includes(to) &&
        "bg-light-100 transition-all duration-500"
      }`}
      onClick={() => navigate(to)}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      data-tut={
        to === "/marketplace"
          ? "marketplace-sidebar-menu-item"
          : to === "/billing"
            ? "billing-sidebar-menu-item"
            : "item"
      }
    >
      <img
        draggable="false"
        className="w-9 lg:w-10"
        src={imgSrc}
        alt="Robolaunch"
      />
      {isHover && (
        <SidebarMenuItemToolTip
          title={
            to === "/marketplace"
              ? "Marketplace"
              : to === "/billing"
                ? "Billing"
                : "Applications"
          }
          description={
            to === "/marketplace"
              ? "You can access all your marketplace here."
              : to === "/billing"
                ? "You can access all your bills here"
                : to === "/data-science"
                  ? "You can access all your data science apps here."
                  : ""
          }
        />
      )}
    </div>
  );
}
