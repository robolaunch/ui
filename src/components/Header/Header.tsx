import React, { ReactElement } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import HeaderDropdownMenu from "../HeaderDropdownMenu/HeaderDropdownMenu";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export default function Header(): ReactElement {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div className="w-full h-16 px-4 flex justify-between items-center bg-layer-light-50 text-layer-dark-200 shadow-md animate__animated animate__fadeInDown">
      <ul className="flex gap-2 text-xs font-medium">
        {breadcrumbs?.map((item: any, index: number) => {
          return (
            <li key={index}>
              <a href={item?.key}>{item.breadcrumb.props?.children}</a>
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
