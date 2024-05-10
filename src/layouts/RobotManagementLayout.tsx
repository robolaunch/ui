import { ReactElement, useState } from "react";
import MissionManagementBoard from "../components/MissionManagementBoard/MissionManagementBoard";
import BarcodeManagementBoard from "../components/BarcodeManagementBoard/BarcodeManagementBoard";
import LogManagementBoard from "../components/LogManagementBoard/LogManagementBoard";
import RobotManagementSidebar from "../components/RobotManagementSidebar/RobotManagementSidebar";
import LayoutTabSwitcher from "../components/LayoutTabSwitcher/LayoutTabSwitcher";
import RMSLogSettingsMapper from "../components/RMSLogSettingsMapper/RMSLogSettingsMapper";
import RMSLogMapper from "../components/RMSLogMapper/RMSLogMapper";
import RMBarcodeMapper from "../components/RMBarcodeMapper/RMBarcodeMapper";
import RMTaskWaypointsMapper from "../components/RMTaskWaypointsMapper/RMTaskWaypointsMapper";
import RMTaskWaitingPointsMapper from "../components/RMTaskWaitingPointsMapper/RMTaskWaitingPointsMapper";
import RMTaskJobsMapper from "../components/RMTaskJobsMapper/RMTaskJobsMapper";
import MissionManagementBoardV2 from "../components/MissionManagementBoardV2/MissionManagementBoardV2";

export default function RobotManagementLayout(): ReactElement {
  const [currentMainTab, setCurrentMainTab] = useState<
    "Mission Management" | "Barcode Management" | "Robot Logs"
  >("Mission Management");
  const [currentMissionTab, setCurrentMissionTab] = useState<
    "Waypoints" | "Waiting Points" | "Jobs"
  >("Waypoints");
  const [currentBarcodeTab, setCurrentBarcodeTab] =
    useState<"Barcode Management">("Barcode Management");
  const [currentLogTab, setCurrentLogTab] = useState<"Robot Logs" | "Settings">(
    "Robot Logs",
  );

  return (
    <div className="wh-full flex flex-col gap-6">
      <LayoutTabSwitcher
        tabs={["Mission Management", "Barcode Management", "Robot Logs"]}
        activeTab={currentMainTab}
        setActiveTab={setCurrentMainTab}
      />
      <div className="wh-full grid grid-cols-12 gap-6">
        <div className="wh-full col-span-3">
          <RobotManagementSidebar
            setter={(() => {
              switch (currentMainTab) {
                case "Mission Management":
                  return setCurrentMissionTab;
                case "Barcode Management":
                  return setCurrentBarcodeTab;
                case "Robot Logs":
                  return setCurrentLogTab;
                default:
                  return () => {};
              }
            })()}
            currentTab={(() => {
              switch (currentMainTab) {
                case "Mission Management":
                  return currentMissionTab;
                case "Barcode Management":
                  return currentBarcodeTab;
                case "Robot Logs":
                  return currentLogTab;
                default:
                  return "";
              }
            })()}
            tabs={(() => {
              switch (currentMainTab) {
                case "Mission Management":
                  return ["Waypoints", "Waiting Points", "Jobs"];
                case "Barcode Management":
                  return ["Barcode Management"];
                case "Robot Logs":
                  return ["Robot Logs", "Settings"];
                default:
                  return [];
              }
            })()}
            children={(() => {
              switch (currentMainTab) {
                case "Mission Management":
                  switch (currentMissionTab) {
                    case "Waypoints":
                      return <RMTaskWaypointsMapper />;
                    case "Waiting Points":
                      return <RMTaskWaitingPointsMapper />;
                    case "Jobs":
                      return <RMTaskJobsMapper />;
                    default:
                      return <RMTaskWaypointsMapper />;
                  }
                case "Barcode Management":
                  return <RMBarcodeMapper />;
                case "Robot Logs":
                  switch (currentLogTab) {
                    case "Robot Logs":
                      return <RMSLogMapper />;
                    case "Settings":
                      return <RMSLogSettingsMapper />;
                  }
              }
            })()}
          />
        </div>
        <div className="wh-full col-span-9">
          {(() => {
            switch (currentMainTab) {
              case "Mission Management":
                // return <MissionManagementBoard />;
                return <MissionManagementBoardV2 />;
              case "Barcode Management":
                return <BarcodeManagementBoard />;
              case "Robot Logs":
                return <LogManagementBoard />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}
