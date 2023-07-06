import React, { ReactElement } from "react";
import { stringCapitalization } from "../../helpers/GeneralFunctions";
import { Link, useParams } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {
  RiBillFill,
  RiDashboardFill,
  RiStore2Fill,
  RiUser3Fill,
  RiUserSettingsFill,
} from "react-icons/ri";

export default function Breadcrumb(): ReactElement {
  const breadcrumbs = useBreadcrumbs();
  const params = useParams();

  return (
    <ul className="flex gap-2 text-xs font-medium">
      {breadcrumbs?.map((item: any, index: number) => {
        return (
          <li className="flex items-center justify-center gap-2" key={index}>
            <Link
              className="flex items-center justify-center gap-1"
              to={item?.key}
            >
              {(() => {
                if (
                  params?.organizationName ||
                  params?.roboticsCloudName ||
                  params?.fleetName ||
                  params?.robotName
                ) {
                  if (index === 0) {
                    return <RiDashboardFill size={14} />;
                  }
                  if (params?.organizationName && index === 1) {
                    return (
                      <img
                        className="w-3"
                        src="/svg/general/organization/organization-gray.svg"
                        alt="rc"
                      />
                    );
                  }
                  if (params?.roboticsCloudName && index === 2) {
                    return (
                      <img
                        className="w-4"
                        src="/svg/general/roboticscloud/roboticscloud-gray.svg"
                        alt="rc"
                      />
                    );
                  }
                  if (params?.instanceName && index === 3) {
                    return (
                      <img
                        className="w-3"
                        src="/svg/general/instance/instance-gray.svg"
                        alt="rc"
                      />
                    );
                  }
                  if (params?.fleetName && index === 4) {
                    return (
                      <img
                        className="w-3"
                        src="/svg/general/fleet/fleet-gray.svg"
                        alt="rc"
                      />
                    );
                  }
                  if (params?.robotName && index === 5) {
                    return (
                      <img
                        className="w-3"
                        src="/svg/general/robot/robot-gray.svg"
                        alt="rc"
                      />
                    );
                  }
                } else {
                  switch (item?.breadcrumb?.props?.children) {
                    case "Home":
                      return <RiDashboardFill size={14} />;
                    case "Profile":
                      return <RiUser3Fill className="mt-0.5" size={13} />;
                    case "Marketplace":
                      return <RiStore2Fill className="mt-0.5" size={13} />;
                    case "User role management":
                      return (
                        <RiUserSettingsFill className="mt-0.5" size={13} />
                      );
                    case "Billing":
                      return <RiBillFill className="mt-0.5" size={13} />;
                  }
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
