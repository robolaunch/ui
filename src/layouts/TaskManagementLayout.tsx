import MissionManagement from "../pages/EnvironmentPage/TaskManagement/MissionManagement";
import BarcodeManagement from "../pages/EnvironmentPage/TaskManagement/BarcodeManagement";
import LayoutTabSwitcher from "../components/LayoutTabSwitcher/LayoutTabSwitcher";
import { ReactElement, useState } from "react";
import useRobot from "../hooks/useRobot";
import RobotLogs from "../pages/EnvironmentPage/TaskManagement/RobotLogs";
import RobotManagementLayout from "./RobotManagementLayout";

export default function TaskManagementLayout(): ReactElement {
  const { ros } = useRobot();

  const [activeTab, setActiveTab] = useState<string>("Mission Management");

  return (
    // <div className={"animate-fadeIn flex h-full flex-col gap-6"}>
    //   <LayoutTabSwitcher
    //     tabs={["Mission Management", "Barcode Management", "Robot Logs"]}
    //     activeTab={activeTab}
    //     setActiveTab={setActiveTab}
    //   />
    //   {(() => {
    //     switch (activeTab) {
    //       case "Mission Management":
    //         return <MissionManagement ros={ros} />;
    //       case "Barcode Management":
    //         return <BarcodeManagement />;
    //       case "Robot Logs":
    //         return <RobotLogs />;
    //     }
    //   })()}
    // </div>
    <RobotManagementLayout />
  );
}
