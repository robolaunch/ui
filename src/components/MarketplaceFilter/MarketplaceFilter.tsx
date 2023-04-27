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
    <CardLayout className="!col-span-3 flex flex-col gap-8 p-6 !h-fit">
      <div className="flex flex-col gap-1">
        <span className="font-medium">Filter Settings</span>
        <div className="w-28 h-[2px] bg-primary" />
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm font-semibold text-layer-dark-700">
          Template Type
        </div>
        <div className="flex flex-col text-xs gap-3 pl-6">
          <label className="flex items-center gap-2" htmlFor="humble">
            <InputCheckbox className="!scale-125" name="humble" />
            <img className="w-6" src="/images/rocket.svg" alt="robolaunch" />
            <span>Published from robolaunch</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="humble">
            <InputCheckbox className="!scale-125" name="humble" />
            <MdPublic size={20} className="text-layer-secondary-500" />
            <span>Public Template</span>
          </label>

          <label className="flex items-center gap-2" htmlFor="foxy">
            <InputCheckbox className="!scale-125" name="foxy" />
            <RiOrganizationChart
              size={20}
              className="text-layer-secondary-500"
            />
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
            <BsShieldLockFill size={20} className="text-layer-secondary-500" />
            <span>Private Template</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm font-semibold text-layer-dark-700">
          Robot Type
        </div>
        <div className="flex flex-col text-xs gap-3 pl-6">
          <label className="flex items-center gap-2" htmlFor="humble">
            <InputCheckbox className="!scale-125" name="humble" />
            <BsFillCloudFill size={22} className="text-layer-secondary-500" />
            <span>Virtual Robot</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="foxy">
            <InputCheckbox className="!scale-125" name="foxy" />
            <BsFillCloudDownloadFill
              size={22}
              className="text-layer-primary-500"
            />
            <span>Hybrid Robot</span>
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="text-sm font-semibold text-layer-dark-700">
          Ros Distro
        </div>
        <div className="flex flex-col text-xs gap-3 pl-6">
          <label className="flex items-center gap-2" htmlFor="humble">
            <InputCheckbox className="!scale-125" name="humble" />
            <img className="w-10" src="/svg/ros/humble.svg" alt="humble" />
            <span>ROS2 Humble</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="foxy">
            <InputCheckbox className="!scale-125" name="foxy" />
            <img className="w-10" src="/svg/ros/foxy.svg" alt="foxy" />
            <span>ROS2 Foxy</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="galactic">
            <InputCheckbox className="!scale-125" name="galactic" />
            <img className="w-10" src="/svg/ros/galactic.svg" alt="galactic" />
            <span>ROS2 Galactic</span>
          </label>
          <label className="flex items-center gap-2" htmlFor="noetic">
            <InputCheckbox className="!scale-125" name="noetic" />
            <img className="w-10" src="/svg/ros/noetic.svg" alt="noetic" />
            <span>ROS1 Noetic</span>
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          className="!h-11 !bg-layer-light-50 !text-primary border border-layer-primary-500"
          text={"Reset Filter"}
        />
        <Button className="!h-11" text={"Apply Filter"} />
      </div>
    </CardLayout>
  );
}
