import React, { Fragment, ReactElement, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { VscSymbolNamespace } from "react-icons/vsc";
import CardLayout from "../../layouts/CardLayout";
import { BsFillCloudFill } from "react-icons/bs";
import { RiOrganizationChart } from "react-icons/ri";
import { MdPublic } from "react-icons/md";
import Button from "../Button/Button";
import ImportRobotModal from "../../modals/ImportRobotModal";
import useTrial from "../../hooks/useTrial";

interface IMarketplaceSingleItemSidebar {
  item: any;
}

export default function MarketplaceSingleItemSidebar({
  item,
}: IMarketplaceSingleItemSidebar): ReactElement {
  const [isShowImportRobotModal, setIsShowImportRobotModal] =
    useState<boolean>(false);

  const { trialState } = useTrial();

  return (
    <CardLayout className="!col-span-3 flex flex-col gap-8 p-6 !h-full">
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
              <span>{item?.name}</span>
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
              <span>{trialState?.organization?.organizationName}</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Build Manager
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <MdPublic size={20} className="text-layer-secondary-500" />
              <span>{item?.hasBuild ? "Include" : "None"}</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Launch Manager
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <BsFillCloudFill size={22} className="text-layer-secondary-500" />
              <span>{item?.hasLaunch ? "Include" : "None"}</span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Ros Distro
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="noetic">
              <BsFillCloudFill size={22} className="text-layer-secondary-500" />
              <span>Minimum Storage: {item?.minStorageAmount} MB</span>
            </label>
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
            handleCloseModal={() => setIsShowImportRobotModal(false)}
            item={item}
          />
        )}
      </Fragment>
    </CardLayout>
  );
}
