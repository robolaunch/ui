import React, { Fragment, ReactElement, useState } from "react";
import MissionManagement from "../pages/RobotPage/TaskManagement/MissionManagement";
import BarcodeManagement from "../pages/RobotPage/TaskManagement/BarcodeManagement";
import CardLayout from "./CardLayout";

interface ITaskManagementLayout {
  ros: any;
}

export default function TaskManagementLayout({
  ros,
}: ITaskManagementLayout): ReactElement {
  const [activeTab, setActiveTab] = useState<
    "Mission Management" | "Barcode Management"
  >("Mission Management");

  return (
    <Fragment>
      <CardLayout className="mb-5 !pb-0">
        <ul className="flex  pt-3 text-center overflow-x-auto">
          {[{ name: "Mission Management" }, { name: "Barcode Management" }].map(
            (tab: any, index: number) => {
              return (
                <div
                  className="flex flex-col gap-3 cursor-pointer w-full"
                  onClick={() => setActiveTab(tab?.name)}
                  key={index}
                >
                  <li
                    className={`text-xs font-medium px-2 transition-all duration-500 min-w-max hover:scale-90  ${
                      tab.name === activeTab
                        ? "text-layer-primary-500"
                        : "text-layer-light-500"
                    } `}
                  >
                    {tab.name}
                  </li>
                  <div
                    className={`w-full h-[2px] transition-all duration-500 
                  ${
                    tab.name === activeTab
                      ? "bg-layer-primary-500"
                      : "bg-layer-light-100"
                  } `}
                  />
                </div>
              );
            }
          )}
        </ul>
      </CardLayout>
      {(() => {
        switch (activeTab) {
          case "Mission Management":
            return <MissionManagement ros={ros} />;
          case "Barcode Management":
            return <BarcodeManagement ros={ros} />;
        }
      })()}
    </Fragment>
  );
}
