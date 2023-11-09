import RobotHeaderDetails from "../RobotHeaderDetails/RobotHeaderDetails";
import RobotHeaderTabs from "../RobotHeaderTabs/RobotHeaderTabs";
import RobotResource from "../RobotResource/RobotResource";
import Connections from "../Connections/Connections";
import CardLayout from "../../layouts/CardLayout";
import { ReactElement } from "react";

export default function RobotHeader(): ReactElement {
  return (
    <div data-tut="robot-header" className="col-span-full h-fit">
      <CardLayout className="flex w-full flex-col gap-6 px-8 !pb-0 pt-6">
        <div className="flex items-center justify-between">
          <RobotHeaderDetails />
          <div className="hidden h-full gap-8 text-xs font-medium text-layer-dark-400 md:flex">
            <div className="flex  flex-col items-end justify-around gap-2.5">
              <Connections />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <RobotHeaderTabs />
          <RobotResource />
        </div>
      </CardLayout>
    </div>
  );
}
