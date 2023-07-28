import React, { ReactElement } from "react";
import MarketplaceRobotAssetItem from "../MarketplaceRobotAssetItem/MarketplaceRobotAssetItem";

interface IMarketplaceAssetsGrid {
  assets: any;
}

export default function MarketplaceAssetsGrid({
  assets,
}: IMarketplaceAssetsGrid): ReactElement {
  return (
    <div className="grid xl:grid-cols-6 2xl:grid-cols-9 gap-6">
      {!Array.isArray(assets) ? (
        <img
          className="w-20 h-20 mx-auto col-span-full m-64"
          src="/svg/general/loading.svg"
          alt="loading"
        />
      ) : (
        assets
          ?.filter((item: any) => item?.type === "Environment")
          ?.map((robot: any, index: number) => {
            return <MarketplaceRobotAssetItem key={index} robot={robot} />;
          })
      )}
    </div>
  );
}
