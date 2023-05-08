import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { BsShieldLockFill } from "react-icons/bs";
import { MdPublic } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { Link } from "react-router-dom";
import stringSlugify from "../../helpers/stringSlugify";
interface IMarketplaceRobotTemplateItem {
  template: {
    title: string;
    organization: string;
    type: string;
    rosDistro: string;
    star: boolean;
    starCount: number;
    access: string | undefined;
    ownership: boolean;
  };
}

export default function MarketplaceRobotTemplateItem({
  template,
}: IMarketplaceRobotTemplateItem): ReactElement {
  return (
    <CardLayout className="col-span-3 p-6 hover:scale-[1.032] transition-all duration-500 cursor-pointer !flex !flex-col gap-4">
      <Link to={stringSlugify(template?.title)}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{template?.title}</span>
              {template?.organization === "Robolaunch" && (
                <img
                  className="w-6"
                  src="/images/rocket.svg"
                  alt="robolaunch"
                />
              )}
            </div>
            <span
              className={`text-[0.60rem] font-medium w-fit ${
                template?.type === "Hybrid Robot"
                  ? "text-layer-secondary-500"
                  : "text-layer-primary-500"
              } `}
            >
              {template?.type}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[0.60rem] font-medium text-layer-secondary-500 px-1.5 rounded-lg capitalize -ml-1.5">
            {(() => {
              switch (template?.access) {
                case "public":
                  return (
                    <Fragment>
                      <MdPublic
                        size={16}
                        className="text-layer-secondary-500"
                      />
                      <span>Public Template</span>
                    </Fragment>
                  );
                case "organization":
                  return (
                    <Fragment>
                      <RiOrganizationChart
                        size={16}
                        className="text-layer-secondary-500"
                      />
                      <span>{template?.organization} Template</span>
                    </Fragment>
                  );
                case "private":
                  return (
                    <Fragment>
                      <BsShieldLockFill
                        size={16}
                        className="text-layer-secondary-500"
                      />
                      <span>Private Template</span>
                    </Fragment>
                  );
              }
            })()}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ul className="flex flex-col gap-2 text-xs text-layer-dark-500">
            <li>ROS Version: ROS2</li>
            <li>ROS Distro: Humble</li>
            <li>Created Date: 04.09.2024</li>
            <li>Deploy Count: 146</li>
          </ul>
          <img
            className="w-28"
            src={`/svg/ros/${template?.rosDistro}.svg`}
            alt="ros"
          />
        </div>
      </Link>
    </CardLayout>
  );
}
