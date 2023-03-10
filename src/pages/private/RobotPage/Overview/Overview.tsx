import React, { ReactElement } from "react";
import UtilizationWidget from "../../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../../components/InformationWidget/InformationWidget";
import Button from "../../../../components/Button/Button";
import { useParams } from "react-router-dom";
import ActivitiesWidget from "../../../../components/ActivitiesWidget/ActivitiesWidget";

export default function Overview(): ReactElement {
  const url = useParams();

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-rows-2 lg:grid-cols-12 animate__animated animate__fadeIn">
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

      <div className="col-span-3 row-span-2">
        <div className="bg-layer-light-50 rounded-lg shadow-lg w-full h-full">
          <ActivitiesWidget />
        </div>
      </div>

      <div className="col-span-9">
        <div className="bg-layer-light-50 rounded-lg shadow-lg w-full h-full"></div>
      </div>
    </div>
  );
}
