import MissionManagement from "../pages/EnvironmentPage/TaskManagement/MissionManagement";
import BarcodeManagement from "../pages/EnvironmentPage/TaskManagement/BarcodeManagement";
import LayoutTabSwitcher from "../components/LayoutTabSwitcher/LayoutTabSwitcher";
import { Fragment, ReactElement, useState } from "react";
import useRobot from "../hooks/useRobot";

export default function TaskManagementLayout(): ReactElement {
  const { ros } = useRobot();

  const [activeTab, setActiveTab] = useState<
    "Mission Management" | "Barcode Management"
  >("Mission Management");

  return (
    <Fragment>
      <LayoutTabSwitcher
        tabs={["Mission Management", "Barcode Management"]}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
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
