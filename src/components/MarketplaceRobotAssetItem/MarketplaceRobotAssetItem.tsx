import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import { BsShieldLockFill } from "react-icons/bs";
import { MdPublic } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import { Link } from "react-router-dom";
import { stringSlugify } from "../../functions/GeneralFunctions";

interface IMarketplaceRobotAssetItem {
  robot: any;
}

export default function MarketplaceRobotAssetItem({
  robot,
}: IMarketplaceRobotAssetItem): ReactElement {
  return (
    <CardLayout className="transition-300 col-span-3 !flex cursor-pointer !flex-col gap-4 p-6 hover:scale-[1.014]">
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
              className={`w-fit text-[0.60rem] font-medium ${
                robot?.type === "Hybrid Robot"
                  ? "text-secondary-500"
                  : "text-primary-500"
              } `}
            >
              {robot?.type}
            </span>
          </div>
          <div className="text-secondary-500 -ml-1.5 flex items-center gap-1 rounded-lg px-1.5 text-[0.60rem] font-medium capitalize">
            {(() => {
              switch (robot?.access) {
                case "public":
                  return (
                    <Fragment>
                      <MdPublic size={16} className="text-secondary-500" />
                      <span>Public Template</span>
                    </Fragment>
                  );
                case "organization":
                  return (
                    <Fragment>
                      <RiOrganizationChart
                        size={16}
                        className="text-secondary-500"
                      />
                      <span>{robot?.organization} Template</span>
                    </Fragment>
                  );
                case "private":
                  return (
                    <Fragment>
                      <BsShieldLockFill
                        size={16}
                        className="text-secondary-500"
                      />
                      <span>Private Template</span>
                    </Fragment>
                  );
              }
            })()}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <ul className="text-light-500 flex flex-col gap-2 text-xs">
            <li>Vendor: {robot?.vendor}</li>
            <li>Family: {robot?.family}</li>
            <li>Type: {robot?.type}</li>
            <li>Storage: {robot?.minStorageAmount / 1000} GB</li>
          </ul>
          <img
            className="border-light-100 w-24 border"
            src={
              robot
                ? robot.type === "Environment"
                  ? `/svg/apps/${robot.family?.toLowerCase()}.svg`
                  : `/svg/apps/${robot.distro?.toLowerCase()}.svg`
                : undefined
            }
            alt="apps"
          />
        </div>
      </Link>
    </CardLayout>
  );
}
