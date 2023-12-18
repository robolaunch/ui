import { Fragment, ReactElement, useState } from "react";
import MissionManagement from "../pages/EnvironmentPage/TaskManagement/MissionManagement";
import BarcodeManagement from "../pages/EnvironmentPage/TaskManagement/BarcodeManagement";
import CardLayout from "./CardLayout";
import useRobot from "../hooks/useRobot";

export default function TaskManagementLayout(): ReactElement {
  const { ros } = useRobot();

  const [activeTab, setActiveTab] = useState<
    "Mission Management" | "Barcode Management"
  >("Mission Management");

  return (
    <Fragment>
      <CardLayout className="mb-5 !pb-0">
        <ul className="flex  overflow-x-auto pt-3 text-center">
          {[{ name: "Mission Management" }, { name: "Barcode Management" }].map(
            (tab: any, index: number) => {
              return (
                <div
                  className="flex w-full cursor-pointer flex-col gap-3"
                  onClick={() => setActiveTab(tab?.name)}
                  key={index}
                >
                  <li
                    className={`min-w-max px-2 text-xs font-medium transition-all duration-500 hover:scale-90  ${
                      tab.name === activeTab
                        ? "text-primary-500"
                        : "text-light-500"
                    } `}
                  >
                    {tab.name}
                  </li>
                  <div
                    className={`h-[2px] w-full transition-all duration-500 
                  ${
                    tab.name === activeTab ? "bg-primary-500" : "bg-light-100"
                  } `}
                  />
                </div>
              );
            },
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
