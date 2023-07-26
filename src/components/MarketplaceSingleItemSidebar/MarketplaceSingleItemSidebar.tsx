import React, { Fragment, ReactElement, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { VscSymbolNamespace } from "react-icons/vsc";
import CardLayout from "../../layouts/CardLayout";
import { BsCloudy } from "react-icons/bs";
import { MdStorage } from "react-icons/md";
import ImportRobotModal from "../../modals/DeployApplicationModal";
import ContentLoader from "react-content-loader";
import Button from "../Button/Button";

interface IMarketplaceSingleItemSidebar {
  item: any;
}

export default function MarketplaceSingleItemSidebar({
  item,
}: IMarketplaceSingleItemSidebar): ReactElement {
  const [isShowImportRobotModal, setIsShowImportRobotModal] =
    useState<boolean>(false);

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
            text={`Deploy Application`}
            disabled={!item}
            loading={!item}
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="font-medium">Application Details</span>
          <div className="w-32 h-[2px] bg-primary" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">Name</div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <VscSymbolNamespace
                size={20}
                className="text-layer-secondary-500"
              />
              <span>
                {item?.name || (
                  <ContentLoader
                    speed={1}
                    width={192}
                    height={24}
                    backgroundColor="#f6f6ef"
                    foregroundColor="#e8e8e3"
                  >
                    <rect width="192" height="24" rx="4" ry="4" />
                  </ContentLoader>
                )}
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Family
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <VscSymbolNamespace
                size={20}
                className="text-layer-secondary-500"
              />
              <span>
                {item?.family || (
                  <ContentLoader
                    speed={1}
                    width={192}
                    height={24}
                    backgroundColor="#f6f6ef"
                    foregroundColor="#e8e8e3"
                  >
                    <rect width="192" height="24" rx="4" ry="4" />
                  </ContentLoader>
                )}
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Deployment Type
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <BsCloudy size={22} className="text-layer-secondary-500" />
              <span>
                {item?.deploymentType || (
                  <ContentLoader
                    speed={1}
                    width={192}
                    height={24}
                    backgroundColor="#f6f6ef"
                    foregroundColor="#e8e8e3"
                  >
                    <rect width="192" height="24" rx="4" ry="4" />
                  </ContentLoader>
                )}
              </span>
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Storage
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="noetic">
              <MdStorage size={22} className="text-layer-secondary-500" />
              {item?.minStorageAmount ? (
                <span>Minimum Storage: {item?.minStorageAmount / 1000} GB</span>
              ) : (
                <ContentLoader
                  speed={1}
                  width={192}
                  height={24}
                  backgroundColor="#f6f6ef"
                  foregroundColor="#e8e8e3"
                >
                  <rect width="192" height="24" rx="4" ry="4" />
                </ContentLoader>
              )}
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-layer-dark-700">
            Version
          </div>
          <div className="flex flex-col text-xs gap-3 pl-6">
            <label className="flex items-center gap-2" htmlFor="humble">
              <FiDownload size={20} className="text-layer-secondary-500" />
              <span>
                {item?.version || (
                  <ContentLoader
                    speed={1}
                    width={192}
                    height={24}
                    backgroundColor="#f6f6ef"
                    foregroundColor="#e8e8e3"
                  >
                    <rect width="192" height="24" rx="4" ry="4" />
                  </ContentLoader>
                )}
              </span>
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
