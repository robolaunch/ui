import React, { ReactElement } from "react";
import TrialTimer from "../../components/TrialTimer/TrialTimer";
import TrialStateViewer from "../../components/TrialStateViewer/TrialStateViewer";
import TrialFeedback from "../../components/TrialFeedback/TrialFeedback";
import MarketplaceGrid from "../../components/MarketplaceGrid/MarketplaceGrid";

export default function TrialPage(): ReactElement {
  return (
    <div className="h-full grid grid-cols-12 gap-6">
      <div className="h-full col-span-full lg:col-span-4 xl:col-span-3 2xl:col-span-2 grid grid-rows-6 gap-6">
        <TrialTimer layoutClassName="row-span-1" />
        <TrialStateViewer layoutClassName="row-span-2" />
        <TrialFeedback layoutClassName="row-span-3" />
      </div>
      <MarketplaceGrid />
    </div>
  );
}
