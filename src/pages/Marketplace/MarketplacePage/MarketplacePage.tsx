import React, { ReactElement, useEffect, useState } from "react";
import MarketplaceTopBar from "../../../components/MarketplaceTopBar/MarketplaceTopBar";
import { useAppDispatch } from "../../../hooks/redux";
import MarketplaceAssetsGrid from "../../../components/MarketplaceAssetsGrid/MarketplaceAssetsGrid";
import MarketplaceFilter from "../../../components/MarketplaceFilter/MarketplaceFilter";
import { getMarkeplaceItems } from "../../../toolkit/MarketplaceSlice";

export default function MarketplacePage(): ReactElement {
  const [marketplaceAssets, setMarketplaceAssets] = useState<any>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getMarkeplaceItems()).then((res: any) => {
    //   setMarketplaceAssets(res?.payload?.marketplaceData?.[0]?.robots || []);
    // });

    setMarketplaceAssets([
      {
        name: "Robot 1",
        type: "Environment",
        distro: "Humble",
        vendor: "Vendor 1",
        family: "Family 1",
        minStorageAmount: 100000,
      },
      {
        name: "Robot 2",
        type: "Environment",
        distro: "Humble",
        vendor: "Vendor 2",
        family: "Family 2",
        minStorageAmount: 100000,
      },
      {
        name: "Robot 2",
        type: "Environment",
        distro: "Humble",
        vendor: "Vendor 2",
        family: "Family 2",
        minStorageAmount: 100000,
      },
      {
        name: "Robot 2",
        type: "Environment",
        distro: "Humble",
        vendor: "Vendor 2",
        family: "Family 2",
        minStorageAmount: 100000,
      },
      {
        name: "Robot 2",
        type: "Environment",
        distro: "Humble",
        vendor: "Vendor 2",
        family: "Family 2",
        minStorageAmount: 100000,
      },
      {
        name: "Robot 2",
        type: "Environment",
        distro: "Humble",
        vendor: "Vendor 2",
        family: "Family 2",
        minStorageAmount: 100000,
      },
      {
        name: "Robot 2",
        type: "Environment",
        distro: "Humble",
        vendor: "Vendor 2",
        family: "Family 2",
        minStorageAmount: 100000,
      },
      {
        name: "Robot 2",
        type: "Environment",
        distro: "Humble",
        vendor: "Vendor 2",
        family: "Family 2",
        minStorageAmount: 100000,
      },
    ]);
  }, [dispatch]);

  return (
    <div className="grid grid-cols-12 gap-6 transition-all duration-500">
      <div className="hidden md:block md:col-span-full">
        <MarketplaceTopBar />
      </div>
      <div className="hidden md:block md:col-span-6 lg:col-span-5 xl:col-span-4 2xl:col-span-3">
        <MarketplaceFilter />
      </div>
      <div className="col-span-full md:col-span-6 lg:col-span-7 xl:col-span-8 2xl:col-span-9">
        <MarketplaceAssetsGrid assets={marketplaceAssets} />
      </div>
    </div>
  );
}
