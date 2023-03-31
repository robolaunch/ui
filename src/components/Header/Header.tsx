import React, { ReactElement } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import HeaderDropdownMenu from "../HeaderDropdownMenu/HeaderDropdownMenu";
import { FiHome } from "react-icons/fi";
import stringCapitalization from "../../helpers/stringCapitalization";
import { Link } from "react-router-dom";

export default function Header(): ReactElement {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="w-full h-16 px-4 flex justify-between items-center bg-layer-light-50 text-layer-dark-200 shadow-md animate__animated animate__fadeInDown z-30">
      <ul className="flex gap-4 text-xs font-medium">
        {breadcrumbs?.map((item: any, index: number) => {
          return (
            <li className="flex gap-1" key={index}>
              {(() => {
                switch (item?.breadcrumb?.props?.children) {
                  case "Home":
                    return <FiHome size={14} />;
                }
              })()}
              <Link to={item?.key}>
                {stringCapitalization(item?.breadcrumb?.props?.children)}
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-6">
        {/* <ThemeToggle /> */}
        <HeaderDropdownMenu />
      </div>
    </div>
  );
}
