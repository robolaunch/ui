import React, { ReactElement, useEffect, useState } from "react";
import MarketplaceSortableBar from "../MarketplaceSortableBar/MarketplaceSortableBar";
import MarketplaceRobotTemplateItem from "../MarketplaceRobotTemplateItem/MarketplaceRobotTemplateItem";
import Paginate from "../Paginate/Paginate";
import { useAppDispatch } from "../../hooks/redux";
import useTrial from "../../hooks/useTrial";
import { getMarkeplaceItems } from "../../resources/MarketplaceSlice";

export default function MarketplaceGrid(): ReactElement {
  const [marketplaceItems, setMarketplaceItems] = useState<any>(undefined);
  const dispatch = useAppDispatch();
  const { trialState } = useTrial();

  useEffect(() => {
    if (trialState?.organization) {
      dispatch(
        getMarkeplaceItems({
          organizationId: trialState?.organization?.organizationId,
        })
      ).then((res: any) => {
        setMarketplaceItems(res?.payload?.marketplaceData?.[0]?.robots || []);
      });
    }
  }, [dispatch, trialState?.organization]);

  return (
    <div className="col-span-full lg:col-span-8 xl:col-span-9 2xl:col-span-10 h-full">
      <div className="grid grid-cols-3 lg:grid-cols-6 2xl:grid-cols-9 gap-6 transition-all duration-500">
        <MarketplaceSortableBar />
        {!Array.isArray(marketplaceItems) ? (
          <div className="col-span-full">
            <img
              className="mx-auto scale-[0.14] h-[45rem]"
              src="/svg/general/loading.svg"
              alt="loading"
            />
          </div>
        ) : (
          marketplaceItems?.map((robot: any, index: number) => {
            return <MarketplaceRobotTemplateItem key={index} robot={robot} />;
          })
        )}
      </div>
      {marketplaceItems?.length > 9 && <Paginate />}
    </div>
  );
}
