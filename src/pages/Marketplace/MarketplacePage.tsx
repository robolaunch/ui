import React, { Fragment, ReactElement, useState } from "react";
import CardLayout from "../../layouts/CardLayout";
import { MdVerified } from "react-icons/md";
import Button from "../../components/Button/Button";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export default function MarketplacePage(): ReactElement {
  const [mockMarketplace, setMockMarketplace] = useState([
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      verified: true,
      star: true,
    },
    {
      title: "Test Robot",
      type: "Hybrid Robot",
      organization: "ProvEdge Organization",
      rosDistro: "humble",
      verified: false,
      star: false,
    },
    {
      title: "Test #2 Robot",
      type: "Hybrid Robot",
      organization: "Robolaunch Organization",
      rosDistro: "foxy",
      verified: true,
      star: true,
    },
    {
      title: "Robolaunch Robot",
      organization: "KAE Organization",
      type: "Virtual Robot",
      rosDistro: "galactic",
      verified: true,
      star: true,
    },
  ]);

  return (
    <Fragment>
      <div className="grid grid-cols-12 gap-6">
        {mockMarketplace.map((template, index) => {
          return (
            <CardLayout className="col-span-3 p-8">
              <div className="flex flex-col gap-8">
                <div className="flex justify-between" id="header">
                  <div className="flex flex-col gap-2">
                    <div id="name" className="flex gap-1 items-center">
                      <span className="text-sm font-medium">
                        {template?.title}
                      </span>
                      {template?.verified && (
                        <MdVerified
                          className="text-layer-secondary-500"
                          size={16}
                        />
                      )}
                    </div>
                    <span className="text-xs text-layer-dark-300">
                      {template?.organization}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-3">
                    <span
                      className={`text-[0.60rem] font-medium px-3 py-2 rounded-lg border ${
                        template?.type === "Hybrid Robot"
                          ? "text-layer-secondary-500 bg-layer-secondary-50 border-layer-secondary-200"
                          : "text-layer-primary-500 bg-layer-primary-50 border-layer-primary-200"
                      } `}
                    >
                      {template?.type}
                    </span>
                    <div className="flex items-center gap-1 bg-layer-secondary-50 p-1.5 rounded">
                      <span className="text-xs">123</span>
                      {template?.star ? (
                        <AiFillStar size={24} className="text-yellow-300" />
                      ) : (
                        <AiOutlineStar size={24} className="text-yellow-300" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between" id="content">
                  <div>content</div>

                  <img
                    className="w-24"
                    src={`/svg/ros/${template?.rosDistro}.svg`}
                    alt="ros"
                  />
                </div>

                <Button
                  className="!h-10 !text-xs !bg-layer-light-50 border border-layer-primary-500 text-primary hover:!bg-primary hover:!text-layer-light-50 duration-500"
                  text="Import Robot"
                />
              </div>
            </CardLayout>
          );
        })}
      </div>
    </Fragment>
  );
}
