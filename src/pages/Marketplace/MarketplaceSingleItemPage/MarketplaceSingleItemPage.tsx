import React, { ReactElement, useEffect, useState } from "react";
import MarketplaceSingleItemSidebar from "../../../components/MarketplaceSingleItemSidebar/MarketplaceSingleItemSidebar";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/redux";
import { getMarkeplaceItem } from "../../../toolkit/MarketplaceSlice";
import MarketplaceSingleİtemHeader from "../../../components/MarketplaceSingleItemHeader/MarketplaceSingleItemHeader";
import MarketplaceSingleItemReadme from "../../../components/MarketplaceSingleItemReadme/MarketplaceSingleItemReadme";

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

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-9 grid grid-cols-1 gap-6 h-fit">
        <MarketplaceSingleİtemHeader responseItem={responseItem} />

        <MarketplaceSingleItemReadme />
      </div>

      <MarketplaceSingleItemSidebar item={responseItem} />
    </div>
  );
}
