import React, { Fragment, ReactElement, useState } from "react";
import MarketplaceRobotTemplateItem from "../../../components/MarketplaceRobotTemplateItem/MarketplaceRobotTemplateItem";
import Paginate from "../../../components/Paginate/Paginate";
import MarketplaceFilter from "../../../components/MarketplaceFilter/MarketplaceFilter";
import MarketplaceSortableBar from "../../../components/MarketplaceSortableBar/MarketplaceSortableBar";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import CardLayout from "../../../layouts/CardLayout";
import { Carousel } from "react-responsive-carousel";

export default function MarketplacePage(): ReactElement {
  const [mockMarketplace, setMockMarketplace] = useState([
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
      organization: "Robolaunch",
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
        <CardLayout className="col-span-12">
          <Carousel
            className="cursor-pointer"
            showThumbs={false}
            dynamicHeight={true}
            autoPlay={true}
            infiniteLoop={true}
            emulateTouch={true}
          >
            <div>
              <img src="svg/mock/mock768.svg" />
            </div>
            <div>
              <img src="svg/mock/mock768.svg" />
            </div>
            <div>
              <img src="svg/mock/mock768.svg" />
            </div>
          </Carousel>
        </CardLayout>

        <MarketplaceFilter />
        <div className="col-span-9">
          <div className="grid grid-cols-3 lg:grid-cols-6 2xl:grid-cols-9 gap-8 transition-all duration-500">
            <MarketplaceSortableBar />
            {mockMarketplace.map((template, index) => {
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
