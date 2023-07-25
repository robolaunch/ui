import React, { ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import InputText from "../InputText/InputText";

export default function MarketplaceSortableBar(): ReactElement {
  return (
    <CardLayout className="col-span-full !w-full !flex !justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <img
          className="w-12"
          src="
        /images/rocket.svg"
          alt="robolaunch"
        />
        <span className="text-layer-dark-600 font-medium">
          robolaunch Application Templates
        </span>
      </div>
      <div className="flex gap-6">
        <InputText
          className="!w-64 !text-xs"
          placeholder="Search by Template Name"
        />
      </div>
    </CardLayout>
  );
}
