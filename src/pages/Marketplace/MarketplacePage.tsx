import React, { Fragment, ReactElement, useState } from "react";
import MarketplaceRobotTemplateItem from "../../components/MarketplaceRobotTemplateItem/MarketplaceRobotTemplateItem";

export default function MarketplacePage(): ReactElement {
  const [mockMarketplace, setMockMarketplace] = useState([
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      verified: true,
      star: true,
      starCount: 684,
    },
    {
      title: "Test Robot",
      type: "Hybrid Robot",
      organization: "ProvEdge Organization",
      rosDistro: "humble",
      verified: false,
      star: false,
      starCount: 16,
    },
    {
      title: "Test #2 Robot",
      type: "Hybrid Robot",
      organization: "Robolaunch Organization",
      rosDistro: "foxy",
      verified: true,
      star: true,
      starCount: 128,
    },
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      verified: true,
      star: true,
      starCount: 512,
    },
  ]);

  return (
    <Fragment>
      <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 2xl:grid-cols-12 gap-6 transition-all duration-500">
        {mockMarketplace.map((template, index) => {
          return (
            <MarketplaceRobotTemplateItem key={index} template={template} />
          );
        })}
      </div>
    </Fragment>
  );
}
