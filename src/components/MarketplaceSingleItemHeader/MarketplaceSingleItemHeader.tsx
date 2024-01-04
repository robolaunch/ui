import React, { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import ContentLoader from "react-content-loader";

interface IMarketplaceSingleİtemHeader {
  responseItem: any;
}

export default function MarketplaceSingleİtemHeader({
  responseItem,
}: IMarketplaceSingleİtemHeader): ReactElement {
  return (
    <CardLayout className="col-span-1 h-52 p-4">
      <div className="flex h-full items-center gap-6">
        {responseItem?.distro ? (
          <img
            className="animate-fadeIn h-40"
            src={
              responseItem?.type === "Environment"
                ? `/svg/apps/${responseItem?.family?.toLowerCase()}.svg`
                : `/svg/apps/${responseItem?.distro?.toLowerCase()}.svg`
            }
            alt={responseItem?.distro}
          />
        ) : (
          <ContentLoader
            speed={1}
            width={132}
            height={168}
            backgroundColor="#f6f6ef"
            foregroundColor="#e8e8e3"
          >
            <rect width="132" height="168" />
          </ContentLoader>
        )}
        <div className="flex h-full flex-col justify-between py-1.5">
          <div className="flex justify-between">
            <div className="flex items-center gap-3">
              <div className="text-lg font-medium">
                {responseItem?.name || (
                  <ContentLoader
                    speed={1}
                    width={192}
                    height={28}
                    backgroundColor="#f6f6ef"
                    foregroundColor="#e8e8e3"
                  >
                    <rect width="192" height="28" />
                  </ContentLoader>
                )}
              </div>
              <div
                className={`w-fit rounded-lg bg-primary-100 px-3 py-1 text-[0.64rem] font-medium capitalize text-primary-500`}
              >
                {responseItem?.type || (
                  <ContentLoader
                    speed={1}
                    width={64}
                    height={18}
                    backgroundColor="#f5e5ff"
                    foregroundColor="#fbf4ff"
                  >
                    <rect width="64" height="18" />
                  </ContentLoader>
                )}
              </div>
              <div
                className={`w-fit rounded-lg bg-primary-100 px-3 py-1 text-[0.64rem] font-medium capitalize text-primary-500`}
              >
                {typeof responseItem?.hasBuild === "boolean" ? (
                  `Build Steps: ${responseItem?.hasBuild ? "Include" : "None"}`
                ) : (
                  <ContentLoader
                    speed={1}
                    width={64}
                    height={18}
                    backgroundColor="#f5e5ff"
                    foregroundColor="#fbf4ff"
                  >
                    <rect width="64" height="18" />
                  </ContentLoader>
                )}
              </div>
              <div
                className={`w-fit rounded-lg bg-primary-100 px-3 py-1 text-[0.64rem] font-medium capitalize text-primary-500`}
              >
                {typeof responseItem?.hasLaunch === "boolean" ? (
                  `Launch Steps: ${
                    responseItem?.hasLaunch ? "Include" : "None"
                  }`
                ) : (
                  <ContentLoader
                    speed={1}
                    width={64}
                    height={18}
                    backgroundColor="#f5e5ff"
                    foregroundColor="#fbf4ff"
                  >
                    <rect width="64" height="18" />
                  </ContentLoader>
                )}
              </div>
            </div>
          </div>
          <div className="text-xs text-light-600">
            {typeof responseItem?.family === "string" ? (
              responseItem?.family + ` (${responseItem?.acronym})`
            ) : (
              <ContentLoader
                speed={1}
                width={148}
                height={18}
                backgroundColor="#f6f6ef"
                foregroundColor="#e8e8e3"
              >
                <rect width="148" height="18" />
              </ContentLoader>
            )}
          </div>
          <div className="text-xs text-light-700">
            {typeof responseItem?.distro === "string" ? (
              `ROS2 ${responseItem?.distro}`
            ) : (
              <ContentLoader
                speed={1}
                width={124}
                height={18}
                backgroundColor="#f6f6ef"
                foregroundColor="#e8e8e3"
              >
                <rect width="124" height="18" />
              </ContentLoader>
            )}
          </div>

          <div className="text-xs text-light-600">
            {typeof responseItem?.minStorageAmount === "number" ? (
              responseItem?.minStorageAmount / 1000 + " GB Storage"
            ) : (
              <ContentLoader
                speed={1}
                width={108}
                height={18}
                backgroundColor="#f6f6ef"
                foregroundColor="#e8e8e3"
              >
                <rect width="108" height="18" />
              </ContentLoader>
            )}
          </div>
          <div className="text-xs text-light-600">
            {responseItem?.version || (
              <ContentLoader
                speed={1}
                width={92}
                height={18}
                backgroundColor="#f6f6ef"
                foregroundColor="#e8e8e3"
              >
                <rect width="92" height="18" />
              </ContentLoader>
            )}
          </div>
        </div>
      </div>
    </CardLayout>
  );
}
