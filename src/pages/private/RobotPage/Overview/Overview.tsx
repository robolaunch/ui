import React, { ReactElement } from "react";
import UtilizationWidget from "../../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../../components/InformationWidget/InformationWidget";
import Button from "../../../../components/Button/Button";
import { useParams } from "react-router-dom";

export default function Overview(): ReactElement {
  const url = useParams();

  return (
    <div className="grid gap-8 grid-cols-1 lg:grid-rows-2 lg:grid-cols-12">
      <div className="col-span-4">
        <InformationWidget
          title={url?.robotName || ""}
          subtitle="From this page, you can view, control or get information about all
            the details of the teams in your organization."
          actiontitle="If you need to create a new team or check the users in the team you
            can proceed here."
          component={
            <Button
              text="Manage RoboticsClouds"
              className="!w-28 !h-10 !text-xs"
            />
          }
        />
      </div>
      <div className="col-span-5">
        <UtilizationWidget title="Team" />
      </div>

      <div className="col-span-3">
        <div className="bg-layer-light-50 rounded-lg shadow-lg w-full h-full"></div>
      </div>

      <div className="col-span-12">
        <div className="bg-layer-light-50 rounded-lg shadow-lg w-full h-full"></div>
      </div>
    </div>
  );
}
