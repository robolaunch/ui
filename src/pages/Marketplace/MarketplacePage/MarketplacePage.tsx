import React, { Fragment, ReactElement } from "react";
import MarketplaceRobotTemplateItem from "../../../components/MarketplaceRobotTemplateItem/MarketplaceRobotTemplateItem";
import Paginate from "../../../components/Paginate/Paginate";
import MarketplaceFilter from "../../../components/MarketplaceFilter/MarketplaceFilter";
import MarketplaceSortableBar from "../../../components/MarketplaceSortableBar/MarketplaceSortableBar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CardLayout from "../../../layouts/CardLayout";
import { Carousel } from "react-responsive-carousel";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import Button from "../../../components/Button/Button";
import marketplaceData from "../../../mock/marketplace.json";

export default function MarketplacePage(): ReactElement {
  return (
    <Fragment>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-3">
          <InformationWidget
            title={`Main Dashboard`}
            subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization. If you need to create a new team or check the users in the team you
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
            {marketplaceData.map((template: any, index: number) => {
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
