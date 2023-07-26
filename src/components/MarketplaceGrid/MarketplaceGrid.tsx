import React, { ReactElement, useEffect, useState } from "react";
import MarketplaceSortableBar from "../MarketplaceSortableBar/MarketplaceSortableBar";
import MarketplaceRobotTemplateItem from "../MarketplaceRobotTemplateItem/MarketplaceRobotTemplateItem";
import Paginate from "../Paginate/Paginate";
import { useAppDispatch } from "../../hooks/redux";
import useTrial from "../../hooks/useTrial";
import { getMarkeplaceItems } from "../../toolkit/MarketplaceSlice";

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
        {!Array.isArray(marketplaceItems) ? (
          <img
            className="w-20 h-20 mx-auto col-span-full m-14"
            src="/svg/general/loading.svg"
            alt="loading"
          />
        ) : (
          marketplaceItems
            ?.filter((item: any) => item?.type === "Environment")
            ?.map((robot: any, index: number) => {
              return <MarketplaceRobotTemplateItem key={index} robot={robot} />;
            })
        )}
      </div>
      {marketplaceItems?.length > 9 && <Paginate />}
    </div>
  );
}
