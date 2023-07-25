import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { BsShieldLockFill } from "react-icons/bs";
import { MdPublic } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { Link } from "react-router-dom";
import { stringSlugify } from "../../functions/GeneralFunctions";
interface IMarketplaceRobotTemplateItem {
  robot: any;
}

export default function MarketplaceRobotTemplateItem({
  robot,
}: IMarketplaceRobotTemplateItem): ReactElement {
  return (
    <CardLayout className="col-span-3 p-6 hover:scale-[1.014] transition-all duration-500 cursor-pointer !flex !flex-col gap-4">
      <Link to={stringSlugify(robot?.acronym)}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">{robot?.name}</span>
              {robot?.organization === "robolaunch" && (
                <img
                  className="w-6"
                  src="/images/rocket.svg"
                  alt="robolaunch"
                />
              )}
            </div>
            <span
              className={`text-[0.60rem] font-medium w-fit ${
                robot?.type === "Hybrid Robot"
                  ? "text-layer-secondary-500"
                  : "text-layer-primary-500"
              } `}
            >
              {robot?.type}
            </span>
          </div>
          <div className="flex items-center gap-1 text-[0.60rem] font-medium text-layer-secondary-500 px-1.5 rounded-lg capitalize -ml-1.5">
            {(() => {
              switch (robot?.access) {
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
                      <span>{robot?.organization} Template</span>
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
            <li>Vendor: {robot?.vendor}</li>
            <li>Family: {robot?.family}</li>
            <li>Type: {robot?.type}</li>
            <li>Storage: {robot?.minStorageAmount / 1000} GB</li>
          </ul>
          <img
            className="w-24 border border-layer-light-100"
            src={
              robot?.type === "Environment"
                ? `/svg/apps/${robot?.family?.toLowerCase()}.svg`
                : `/svg/apps/${robot?.distro?.toLowerCase()}.svg`
            }
            alt="apps"
          />
        </div>
      </Link>
    </CardLayout>
  );
}
