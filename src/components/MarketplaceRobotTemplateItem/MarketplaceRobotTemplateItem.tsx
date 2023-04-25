import React, { ReactElement } from "react";
import { MdVerified } from "react-icons/md";
import CardLayout from "../../layouts/CardLayout";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Button from "../Button/Button";

interface IMarketplaceRobotTemplateItem {
  template: {
    title: string;
    organization: string;
    type: string;
    rosDistro: string;
    verified: boolean;
    star: boolean;
    starCount: number;
  };
}

export default function MarketplaceRobotTemplateItem({
  template,
}: IMarketplaceRobotTemplateItem): ReactElement {
  return (
    <CardLayout className="col-span-3 p-8">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between" id="header">
          <div className="flex flex-col gap-2">
            <div id="name" className="flex gap-1 items-center">
              <span className="text-sm font-medium">{template?.title}</span>
              {template?.verified && (
                <MdVerified className="text-layer-secondary-500" size={16} />
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

        <div className="flex gap-2">
          <Button
            className="!h-10 !text-xs !bg-layer-light-50 border border-layer-primary-500 !text-primary hover:!bg-primary hover:!text-layer-light-50 duration-500"
            text="Import Robot"
          />
          <div className="flex items-center gap-2 bg-layer-secondary-50 p-1.5 rounded text-layer-secondary-500 border border-layer-secondary-200">
            <span className="text-xs">{template?.starCount}</span>
            {template?.star ? (
              <AiFillStar size={22} className="text-yellow-300" />
            ) : (
              <AiOutlineStar size={22} className="text-yellow-300" />
            )}
          </div>
        </div>
      </div>
    </CardLayout>
  );
}
