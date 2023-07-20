import React, { ReactElement } from "react";
import TrialTimer from "../../components/TrialTimer/TrialTimer";
import MarketplaceRobotTemplateItem from "../../components/MarketplaceRobotTemplateItem/MarketplaceRobotTemplateItem";
import Paginate from "../../components/Paginate/Paginate";
import TrialStateViewer from "../../components/TrialStateViewer/TrialStateViewer";
import TrialFeedback from "../../components/TrialFeedback/TrialFeedback";
import MarketplaceSortableBar from "../../components/MarketplaceSortableBar/MarketplaceSortableBar";
import marketplaceData from "../../mock/marketplace.json";

export default function TrialPage({ ...props }): ReactElement {
  return (
    <div className="h-full grid grid-cols-12 gap-6">
      <div className="col-span-10 h-full">
        <div className="grid grid-cols-3 lg:grid-cols-6 2xl:grid-cols-9 gap-6 transition-all duration-500">
          <MarketplaceSortableBar />

          {marketplaceData.map((template: any, index: number) => {
            return (
              <MarketplaceRobotTemplateItem key={index} template={template} />
            );
          })}
        </div>
        <Paginate />
      </div>
      <div className="h-full col-span-2 grid grid-rows-6 gap-6">
        <TrialTimer layoutClassName="row-span-1" />
        <TrialStateViewer layoutClassName="row-span-2" />
        <TrialFeedback layoutClassName="row-span-3" />
      </div>
    </div>
  );
}
