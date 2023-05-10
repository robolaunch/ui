import React, { Fragment, ReactElement, useState } from "react";
import MarketplaceRobotTemplateItem from "../../../components/MarketplaceRobotTemplateItem/MarketplaceRobotTemplateItem";
import Paginate from "../../../components/Paginate/Paginate";
import MarketplaceFilter from "../../../components/MarketplaceFilter/MarketplaceFilter";
import MarketplaceSortableBar from "../../../components/MarketplaceSortableBar/MarketplaceSortableBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import CardLayout from "../../../layouts/CardLayout";
import { Carousel } from "react-responsive-carousel";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import Button from "../../../components/Button/Button";

export default function MarketplacePage(): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [mockMarketplace, setMockMarketplace] = useState<any>([
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      star: true,
      starCount: 684,
      access: "public",
      ownership: false,
    },
    {
      title: "Test Robot",
      type: "Hybrid Robot",
      organization: "ProvEdge Organization",
      rosDistro: "humble",
      star: false,
      starCount: 16,
      access: "public",
      ownership: true,
    },
    {
      title: "Test #2 Robot",
      type: "Hybrid Robot",
      organization: "Robolaunch Organization",
      rosDistro: "foxy",
      star: true,
      starCount: 128,
      access: "organization",
      ownership: false,
    },
    {
      title: "Robolaunch Robot",
      organization: "Robolaunch Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      star: true,
      starCount: 512,
      access: "private",
      ownership: true,
    },
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      star: true,
      starCount: 684,
      access: "public",
      ownership: true,
    },
    {
      title: "Test Robot",
      type: "Hybrid Robot",
      organization: "ProvEdge Organization",
      rosDistro: "humble",
      star: false,
      starCount: 16,
      access: "organization",
      ownership: false,
    },
    {
      title: "Test #2 Robot",
      type: "Hybrid Robot",
      organization: "Robolaunch Organization",
      rosDistro: "foxy",
      star: true,
      starCount: 128,
      access: "public",
      ownership: false,
    },
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      star: false,
      starCount: 512,
      access: "private",
      ownership: false,
    },
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      star: true,
      starCount: 684,
      access: "public",
      ownership: true,
    },
    {
      title: "Test #2 Robot",
      type: "Hybrid Robot",
      organization: "Robolaunch Organization",
      rosDistro: "foxy",
      star: true,
      starCount: 128,
      access: "public",
      ownership: false,
    },
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      star: false,
      starCount: 512,
      access: "private",
      ownership: false,
    },
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      star: true,
      starCount: 684,
      access: "public",
      ownership: true,
    },
  ]);

  return (
    <Fragment>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <InformationWidget
            title={`Main Dashboard`}
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
            actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
            component={
              <Button text="Manage Teams" className="!w-28 !h-10 !text-xs" />
            }
          />
        </div>
        <CardLayout className="col-span-9">
          <Carousel
            className="cursor-pointer"
            showThumbs={false}
            dynamicHeight={true}
            autoPlay={true}
            infiniteLoop={true}
            emulateTouch={true}
          >
            <div>
              <img src="svg/mock/mock384.svg" alt="" />
            </div>
            <div>
              <img src="svg/mock/mock384.svg" alt="" />
            </div>
            <div>
              <img src="svg/mock/mock384.svg" alt="" />
            </div>
          </Carousel>
        </CardLayout>

        <MarketplaceFilter />
        <div className="col-span-9">
          <div className="grid grid-cols-3 lg:grid-cols-6 2xl:grid-cols-9 gap-8 transition-all duration-500">
            <MarketplaceSortableBar />
            {mockMarketplace.map((template: any, index: number) => {
              return (
                <MarketplaceRobotTemplateItem key={index} template={template} />
              );
            })}
          </div>
        </div>
      </div>
      <Paginate />
    </Fragment>
  );
}
