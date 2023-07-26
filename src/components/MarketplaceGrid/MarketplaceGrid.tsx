import React, { ReactElement, useEffect, useState } from "react";
import MarketplaceSortableBar from "../MarketplaceSortableBar/MarketplaceSortableBar";
import MarketplaceRobotTemplateItem from "../MarketplaceRobotTemplateItem/MarketplaceRobotTemplateItem";
import Paginate from "../Paginate/Paginate";
import { useAppDispatch } from "../../hooks/redux";
import useTrial from "../../hooks/useTrial";
import { getMarkeplaceItems } from "../../toolkit/MarketplaceSlice";
import ContentLoader from "react-content-loader";

export default function MarketplaceGrid(): ReactElement {
  const [marketplaceItems, setMarketplaceItems] = useState<any>(undefined);
  const dispatch = useAppDispatch();
  const { trialState } = useTrial();

  useEffect(() => {
    dispatch(getMarkeplaceItems()).then((res: any) => {
      setMarketplaceItems(res?.payload?.marketplaceData?.[0]?.robots || []);
    });
  }, [dispatch, trialState?.organization]);

  return (
    <div className="col-span-full lg:col-span-8 xl:col-span-9 2xl:col-span-10 h-full">
      <div className="grid grid-cols-3 lg:grid-cols-6 2xl:grid-cols-12 gap-6 transition-all duration-500">
        <MarketplaceSortableBar />
        {!Array.isArray(marketplaceItems)
          ? Array.apply(null, Array(8))?.map((_, index: number) => {
              return (
                <div
                  key={index}
                  className="col-span-3 p-6 hover:scale-[1.014] transition-all duration-500 cursor-pointer !flex !flex-col gap-4"
                >
                  <ContentLoader
                    speed={1}
                    width={332}
                    height={180}
                    backgroundColor="#f6f6ef"
                    foregroundColor="#e8e8e3"
                  >
                    <rect width="332" height="180" rx="4" ry="4" />
                  </ContentLoader>
                </div>
              );
            })
          : marketplaceItems
              ?.filter((item: any) => item?.type === "Environment")
              ?.map((robot: any, index: number) => {
                return (
                  <MarketplaceRobotTemplateItem key={index} robot={robot} />
                );
              })}
      </div>
      {marketplaceItems?.length > 9 && <Paginate />}
    </div>
  );
}
