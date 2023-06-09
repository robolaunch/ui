import React, { ReactElement } from "react";
import UtilizationWidget from "../../../components/UtilizationWidget/UtilizationWidget";
import InformationWidget from "../../../components/InformationWidget/InformationWidget";
import ActivitiesWidget from "../../../components/ActivitiesWidget/ActivitiesWidget";
import Button from "../../../components/Button/Button";
import { useParams } from "react-router-dom";
interface IOverview {
  responseRobot: any;
}

export default function Overview({ responseRobot }: IOverview): ReactElement {
  const url = useParams();

  return (
    <div className="grid gap-6 grid-cols-1 lg:grid-rows-2 lg:grid-cols-12 animate__animated animate__fadeIn">
      <div className="col-span-4">
        <InformationWidget
          title={url?.robotName || ""}
          subtitle="From this page, you can see all the details of the robot, control the robot, assign tasks, control the environments running on the robot or develop the robot's software.
          "
          actiontitle="If you need to quickly control your robot, you can continue here."
          component={
            <Button
              text="Teleoperation of Robot"
              className="!w-44 !h-10 !text-xs"
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
