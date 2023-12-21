import { Fragment, ReactElement, useState } from "react";
import { FiDownload } from "react-icons/fi";
import { VscSymbolNamespace } from "react-icons/vsc";
import { BsCloudy } from "react-icons/bs";
import { MdStorage } from "react-icons/md";
import ImportRobotModal from "../../modals/DeployApplicationModal";
import ContentLoader from "react-content-loader";
import Button from "../Button/Button";
import Card from "../Card/Card";

interface IMarketplaceSingleItemSidebar {
  item: any;
}

export default function MarketplaceSingleItemSidebar({
  item,
}: IMarketplaceSingleItemSidebar): ReactElement {
  const [isShowImportRobotModal, setIsShowImportRobotModal] =
    useState<boolean>(false);

  return (
    <Card className="!col-span-3 flex !h-full flex-col gap-8 p-6">
      <Fragment>
        <div className="flex flex-col gap-1">
          <span className="font-medium">Installation</span>
          <div className="h-[2px] w-[5.5rem] bg-primary-500" />
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
          <div className="h-[2px] w-32 bg-primary-500" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="text-sm font-semibold text-light-700">Name</div>
          <div className="flex flex-col gap-3 pl-6 text-xs">
            <label className="flex items-center gap-2" htmlFor="humble">
              <VscSymbolNamespace size={20} className="text-secondary-500" />
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
          <div className="text-sm font-semibold text-light-700">Family</div>
          <div className="flex flex-col gap-3 pl-6 text-xs">
            <label className="flex items-center gap-2" htmlFor="humble">
              <VscSymbolNamespace size={20} className="text-secondary-500" />
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
          <div className="text-sm font-semibold text-light-700">
            Deployment Type
          </div>
          <div className="flex flex-col gap-3 pl-6 text-xs">
            <label className="flex items-center gap-2" htmlFor="humble">
              <BsCloudy size={22} className="text-secondary-500" />
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
          <div className="text-sm font-semibold text-light-700">Storage</div>
          <div className="flex flex-col gap-3 pl-6 text-xs">
            <label className="flex items-center gap-2" htmlFor="noetic">
              <MdStorage size={22} className="text-secondary-500" />
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
          <div className="text-sm font-semibold text-light-700">Version</div>
          <div className="flex flex-col gap-3 pl-6 text-xs">
            <label className="flex items-center gap-2" htmlFor="humble">
              <FiDownload size={20} className="text-secondary-500" />
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
    </Card>
  );
}
