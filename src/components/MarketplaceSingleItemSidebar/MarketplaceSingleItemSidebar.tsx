import React, { Fragment, ReactElement, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { VscSymbolNamespace } from "react-icons/vsc";
import CardLayout from "../../layouts/CardLayout";
import {
  BsFillCloudDownloadFill,
  BsFillCloudFill,
  BsShieldLockFill,
} from "react-icons/bs";
import { RiOrganizationChart } from "react-icons/ri";
import { MdPublic } from "react-icons/md";
import Button from "../Button/Button";
import ImportRobotModal from "../../modals/ImportRobotModal";

interface IMarketplaceSingleItemSidebar {
  item: any;
}

export default function MarketplaceSingleItemSidebar({
  item,
}: IMarketplaceSingleItemSidebar): ReactElement {
  const [isShowImportRobotModal, setIsShowImportRobotModal] =
    useState<boolean>(false);

  return (
    <CardLayout className="!col-span-3 flex flex-col gap-8 p-6 !h-fit">
      <Fragment>
        <div className="flex flex-col gap-1">
          <span className="font-medium">Installation</span>
          <div className="w-[5.5rem] h-[2px] bg-primary" />
        </div>
        <div className="flex gap-4 transition-all duration-500">
          <Button
            onClick={() => setIsShowImportRobotModal(true)}
            className="!h-11 text-xs"
            text={`Deploy Robot`}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium">Template Details</span>
          <div className="w-32 h-[2px] bg-primary" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">Title</div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <VscSymbolNamespace
                size={20}
                className="text-layer-secondary-500"
              />
              <span>{item?.title}</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Organization
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <RiOrganizationChart
                size={20}
                className="text-layer-secondary-500"
              />
              <span>{item?.organization}</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Template Type
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            {(() => {
              switch (item?.access) {
                case "public":
                  return (
                    <label className="flex items-center gap-2" htmlFor="humble">
                      <MdPublic
                        size={20}
                        className="text-layer-secondary-500"
                      />
                      <span>Public Template</span>
                    </label>
                  );

                case "organization":
                  return (
                    <label className="flex items-center gap-2" htmlFor="foxy">
                      <RiOrganizationChart
                        size={20}
                        className="text-layer-secondary-500"
                      />
                      <span>{item?.organization} Organization</span>
                    </label>
                  );
                case "private":
                  return (
                    <label className="flex items-center gap-2" htmlFor="foxy">
                      <BsShieldLockFill
                        size={20}
                        className="text-layer-secondary-500"
                      />
                      <span>Private Template</span>
                    </label>
                  );
              }
            })()}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Robot Type
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            {(() => {
              switch (item?.type) {
                case "virtual":
                  return (
                    <label className="flex items-center gap-2" htmlFor="humble">
                      <BsFillCloudFill
                        size={22}
                        className="text-layer-secondary-500"
                      />
                      <span>Virtual Robot</span>
                    </label>
                  );
                case "hybrid":
                  return (
                    <label className="flex items-center gap-2" htmlFor="foxy">
                      <BsFillCloudDownloadFill
                        size={22}
                        className="text-layer-primary-500"
                      />
                      <span>Hybrid Robot</span>
                    </label>
                  );
              }
            })()}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Ros Distro
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            {(() => {
              switch (item?.rosDistro) {
                case "noetic":
                  return (
                    <label className="flex items-center gap-2" htmlFor="noetic">
                      <img
                        className="w-10"
                        src="/svg/ros/noetic.svg"
                        alt="noetic"
                      />
                      <span>ROS1 Noetic</span>
                    </label>
                  );
                case "foxy":
                  return (
                    <label className="flex items-center gap-2" htmlFor="foxy">
                      <img
                        className="w-10"
                        src="/svg/ros/foxy.svg"
                        alt="foxy"
                      />
                      <span>ROS2 Foxy</span>
                    </label>
                  );
                case "galactic":
                  return (
                    <label
                      className="flex items-center gap-2"
                      htmlFor="galactic"
                    >
                      <img
                        className="w-10"
                        src="/svg/ros/galactic.svg"
                        alt="galactic"
                      />
                      <span>ROS2 Galactic</span>
                    </label>
                  );
                case "humble":
                  return (
                    <label className="flex items-center gap-2" htmlFor="humble">
                      <img
                        className="w-10"
                        src="/svg/ros/humble.svg"
                        alt="humble"
                      />
                      <span>ROS2 Humble</span>
                    </label>
                  );
              }
            })()}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Maintainers
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <VscSymbolNamespace
                size={20}
                className="text-layer-secondary-500"
              />
              <span>Maintainer #1</span>
            </label>
            <label className="flex items-center gap-2" htmlFor="humble">
              <VscSymbolNamespace
                size={20}
                className="text-layer-secondary-500"
              />
              <span>Maintainer #2</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Deploy Count
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <FiDownload size={20} className="text-layer-secondary-500" />
              <span>Deploy Count: {item?.deployCount}</span>
            </label>
          </div>
        </div>
        {isShowImportRobotModal && (
          <ImportRobotModal
            visibleModal={isShowImportRobotModal}
            handleCloseModal={() => setIsShowImportRobotModal(false)}
            template={item}
          />
        )}
      </Fragment>
    </CardLayout>
  );
}
