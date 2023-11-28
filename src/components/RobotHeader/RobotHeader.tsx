import RobotHeaderTabs from "../RobotHeaderTabs/RobotHeaderTabs";
import RobotHeaderTop from "../RobotHeaderTop/RobotHeaderTop";
import RobotResource from "../RobotResource/RobotResource";
import CardLayout from "../../layouts/CardLayout";
import { ReactElement } from "react";

export default function RobotHeader(): ReactElement {
  return (
    <div data-tut="robot-header" className="col-span-full h-fit">
      <CardLayout className="flex w-full flex-col gap-6 p-6 !pb-0">
        <RobotHeaderTop />
        <div className="flex items-center justify-between">
          <RobotHeaderTabs />
          <RobotResource />
        </div>
      </CardLayout>
    </div>
  );
}
