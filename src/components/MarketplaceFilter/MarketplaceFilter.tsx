import React, { Fragment, ReactElement } from "react";
import InputCheckbox from "../InputCheckbox/InputCheckbox";
import CardLayout from "../../layouts/CardLayout";
import {
  BsFillCloudFill,
  BsFillCloudDownloadFill,
  BsShieldLockFill,
} from "react-icons/bs";
import Button from "../Button/Button";
import { MdPublic } from "react-icons/md";
import { RiOrganizationChart } from "react-icons/ri";
import InputSelect from "../InputSelect/InputSelect";

export default function MarketplaceFilter(): ReactElement {
  return (
    <CardLayout className="!col-span-3 flex !h-fit flex-col gap-8 p-6">
      <div className="flex flex-col gap-1">
        <span className="font-medium">Filter Settings</span>
        <div className="bg-primary-500 h-[2px] w-28" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-light-700 text-sm font-semibold">
          Template Type
        </div>
        <div className="flex flex-col gap-3 pl-6 text-xs">
          <label className="flex items-center gap-2" htmlFor="humble">
            <InputCheckbox className="!scale-125" name="humble" />
            <img className="w-6" src="/images/rocket.svg" alt="robolaunch" />
            <span>Published from robolaunch</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="humble">
            <InputCheckbox className="!scale-125" name="humble" />
            <MdPublic size={20} className="text-secondary-500" />
            <span>Public Template</span>
          </label>

          <label className="flex items-center gap-2" htmlFor="foxy">
            <InputCheckbox className="!scale-125" name="foxy" />
            <RiOrganizationChart size={20} className="text-secondary-500" />
            <span className="flex items-center gap-1">
              <InputSelect className="h-8 !p-0">
                <Fragment>
                  <option value="organization">All Organizations</option>
                  <option value="organization">#1 Organizations</option>
                  <option value="organization">#2 Organizations</option>
                </Fragment>
              </InputSelect>{" "}
              Template
            </span>
          </label>
          <label className="flex items-center gap-2" htmlFor="foxy">
            <InputCheckbox className="!scale-125" name="foxy" />
            <BsShieldLockFill size={20} className="text-secondary-500" />
            <span>Private Template</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-light-700 text-sm font-semibold">Robot Type</div>
        <div className="flex flex-col gap-3 pl-6 text-xs">
          <label className="flex items-center gap-2" htmlFor="humble">
            <InputCheckbox className="!scale-125" name="humble" />
            <BsFillCloudFill size={22} className="text-secondary-500" />
            <span>Virtual Robot</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="foxy">
            <InputCheckbox className="!scale-125" name="foxy" />
            <BsFillCloudDownloadFill size={22} className="text-primary-500" />
            <span>Hybrid Robot</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-light-700 text-sm font-semibold">Ros Distro</div>
        <div className="flex flex-col gap-3 pl-6 text-xs">
          <label className="flex items-center gap-2" htmlFor="humble">
            <InputCheckbox className="!scale-125" name="humble" />
            <img className="w-10" src="/svg/apps/humble.svg" alt="humble" />
            <span>ROS2 Humble</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="foxy">
            <InputCheckbox className="!scale-125" name="foxy" />
            <img className="w-10" src="/svg/apps/foxy.svg" alt="foxy" />
            <span>ROS2 Foxy</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="galactic">
            <InputCheckbox className="!scale-125" name="galactic" />
            <img className="w-10" src="/svg/apps/galactic.svg" alt="galactic" />
            <span>ROS2 Galactic</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="noetic">
            <InputCheckbox className="!scale-125" name="noetic" />
            <img className="w-10" src="/svg/apps/noetic.svg" alt="noetic" />
            <span>ROS1 Noetic</span>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          className="!bg-light-50 !text-primary-500 border-primary-500 !h-11 border"
          text={"Reset Filter"}
        />
        <Button className="!h-11" text={"Apply Filter"} />
      </div>
    </CardLayout>
  );
}
