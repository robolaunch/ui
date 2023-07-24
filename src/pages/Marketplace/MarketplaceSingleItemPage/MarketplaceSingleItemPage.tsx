import React, { ReactElement, useEffect, useState } from "react";
import CardLayout from "../../../layouts/CardLayout";
import MarketplaceSingleItemSidebar from "../../../components/MarketplaceSingleItemSidebar/MarketplaceSingleItemSidebar";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { getMarkeplaceItem } from "../../../toolkit/MarketplaceSlice";
import MarkdownPreview from "@uiw/react-markdown-preview";
import ContentLoader from "react-content-loader";

export default function MarketplaceSingleItemPage(): ReactElement {
  const dispatch = useAppDispatch();
  const url = useParams();

  const [responseItem, setResponseItem] = useState<any>(undefined);

  useEffect(() => {
    dispatch(
      getMarkeplaceItem({
        acronym: url?.productName as string,
      })
    ).then((res: any) => {
      setResponseItem(res?.payload?.marketplaceData?.[0]?.robots?.[0] || []);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const source = `
## MarkdownPreview
## MarkdownPreview
## MarkdownPreview
## MarkdownPreview
## MarkdownPreview
## MarkdownPreview
## MarkdownPreview
## MarkdownPreview
## MarkdownPreview


> todo: React component preview markdown text.
> todo: React component preview markdown text.
> todo: React component preview markdown text.

`;

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9 grid grid-cols-1 gap-6 h-fit">
        <CardLayout className="col-span-1 p-4 h-52">
          <div className="h-full flex items-center gap-4">
            {responseItem?.distro ? (
              <img
                className="h-40 animate__animated animate__fadeIn"
                src={`/svg/ros/${responseItem?.distro?.toLowerCase()}.svg`}
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

            <div className="h-full flex flex-col justify-between py-1.5">
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
                    className={`text-[0.64rem] capitalize font-medium px-3 py-1 rounded-lg w-fit text-layer-primary-500 bg-layer-primary-100`}
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
                    className={`text-[0.64rem] capitalize font-medium px-3 py-1 rounded-lg w-fit text-layer-primary-500 bg-layer-primary-100`}
                  >
                    {typeof responseItem?.hasBuild === "boolean" ? (
                      `Build Steps: ${
                        responseItem?.hasBuild ? "Include" : "None"
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
                  <div
                    className={`text-[0.64rem] capitalize font-medium px-3 py-1 rounded-lg w-fit text-layer-primary-500 bg-layer-primary-100`}
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
              <div className="text-xs text-layer-dark-600">
                {typeof responseItem?.family === "string" ? (
                  responseItem?.family + ` (${responseItem?.acronym})`
                ) : (
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
              <div className="text-xs text-layer-dark-700">
                {typeof responseItem?.distro === "string" ? (
                  `ROS2 ${responseItem?.distro}`
                ) : (
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

              <div className="text-xs text-layer-dark-600">
                {typeof responseItem?.minStorageAmount === "number" ? (
                  responseItem?.minStorageAmount + " MB Storage"
                ) : (
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
              <div className="text-xs text-layer-dark-600">
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

        <CardLayout className="col-span-1 h-full px-8 py-6">
          <MarkdownPreview
            className="h-full"
            source={source}
            wrapperElement={{
              "data-color-mode": "light",
            }}
          />
        </CardLayout>
      </div>

      <MarketplaceSingleItemSidebar item={responseItem} />
    </div>
  );
}
