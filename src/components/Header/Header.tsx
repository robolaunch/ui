import React, { ReactElement } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { RootState } from "../../app/store";
import { useAppSelector } from "../../hooks/redux";

export default function Header(): ReactElement {
  const breadcrumbs = useBreadcrumbs();

  const { user } = useAppSelector((state: RootState) => state.user);

  return (
    <div className="w-full h-16 px-4 flex justify-between items-center bg-layer-light-50 text-layer-dark-200 shadow-md animate__animated animate__fadeInDown">
      <ul className="flex gap-2 text-xs font-medium">
        {breadcrumbs?.map((item: any) => {
          return (
            <li>
              <a href={item?.key}>{item.breadcrumb.props?.children}</a>
            </li>
          );
        })}
      </ul>
      <div className="flex gap-4">
        <div className="flex items-center justify-center rounded-sm h-10 w-10 font-semibold bg-layer-primary-100 border border-layer-primary-200 text-layer-primary-700 cursor-pointer uppercase">
          {user?.username[0]}
        </div>
      </div>
    </div>
  );
}
