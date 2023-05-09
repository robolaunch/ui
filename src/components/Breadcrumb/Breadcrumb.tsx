import React, { ReactElement } from "react";
import stringCapitalization from "../../helpers/stringCapitalization";
import { Link } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {
  RiDashboardFill,
  RiStore2Fill,
  RiUser3Fill,
  RiUserSettingsFill,
} from "react-icons/ri";

export default function Breadcrumb(): ReactElement {
  const breadcrumbs = useBreadcrumbs();

  return (
    <ul className="flex gap-2 text-xs font-medium">
      {breadcrumbs?.map((item: any, index: number) => {
        return (
          <li className="flex items-center justify-center gap-2" key={index}>
            <Link
              className="flex items-center justify-center gap-0.5"
              to={item?.key}
            >
              {(() => {
                switch (item?.breadcrumb?.props?.children) {
                  case "Home":
                    return <RiDashboardFill size={14} />;
                  case "Profile":
                    return <RiUser3Fill className="mt-0.5" size={13} />;
                  case "Marketplace":
                    return <RiStore2Fill className="mt-0.5" size={13} />;
                  case "User role management":
                    return <RiUserSettingsFill className="mt-0.5" size={13} />;
                }
              })()}
              <span className="mt-0.5">
                {stringCapitalization({
                  str: item?.breadcrumb?.props?.children,
                })}
              </span>
            </Link>
            <span className="mt-[0.1rem] scale-[1.32]">
              {breadcrumbs.length - 1 !== index && "/"}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
