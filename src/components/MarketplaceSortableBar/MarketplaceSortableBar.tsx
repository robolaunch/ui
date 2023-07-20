import React, { Fragment, ReactElement } from "react";
import CardLayout from "../../layouts/CardLayout";
import InputSelect from "../InputSelect/InputSelect";
import InputText from "../InputText/InputText";

export default function MarketplaceSortableBar(): ReactElement {
  return (
    <CardLayout className="col-span-3 lg:col-span-6 2xl:col-span-9 !w-full !flex !justify-between items-center p-4">
      <div className="flex items-center gap-4">
        <img
          className="w-12"
          src="
        /images/rocket.svg"
          alt="robolaunch"
        />
        <span className="text-layer-dark-600 font-medium">
          Robolaunch Application Templates
        </span>
      </div>
      <div className="flex gap-6">
        <InputSelect className="!w-40" placeholder="Sort by">
          <Fragment>
            <option value=""></option>
            <option value="name">Name</option>
            <option value="organization">Organization</option>
          </Fragment>
        </InputSelect>
        <InputText
          className="!w-64 !text-xs"
          placeholder="Search by Template Name"
        />
      </div>
    </CardLayout>
  );
}
