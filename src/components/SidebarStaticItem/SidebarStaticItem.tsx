import React, { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";

interface ISidebarStaticItem {
  to: string;
  imgSrc: string;
}

export default function SidebarStaticItem({
  to,
  imgSrc,
}: ISidebarStaticItem): ReactElement {
  const location = useLocation();

  return (
    <Link
      to={to}
      className={`transition-all duration-500 p-2 rounded-md cursor-pointer hover:scale-90 ${
        location?.pathname?.includes(to) &&
        "bg-layer-light-100 transition-all duration-500"
      }`}
    >
      <img className="w-10" src={imgSrc} alt="Robolaunch" />
    </Link>
  );
}
