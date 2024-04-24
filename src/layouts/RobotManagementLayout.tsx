import { Fragment, ReactElement, useState } from "react";
import MissionManagementBoard from "../components/MissionManagementBoard/MissionManagementBoard";
import BarcodeManagementBoard from "../components/BarcodeManagementBoard/BarcodeManagementBoard";
import LogManagementBoard from "../components/LogManagementBoard/LogManagementBoard";
import RobotManagementSidebar from "../components/RobotManagementSidebar/RobotManagementSidebar";
import LayoutTabSwitcher from "../components/LayoutTabSwitcher/LayoutTabSwitcher";
import useBarcode from "../hooks/useBarcode";
import Card from "../components/Card/Card";
import RMSLogSettingsMapper from "../components/RMSLogSettingsMapper/RMSLogSettingsMapper";
import RMSLogMapper from "../components/RMSLogMapper/RMSLogMapper";

export default function RobotManagementLayout(): ReactElement {
  const [currentMainTab, setCurrentMainTab] =
    useState<string>("Mission Management");
  const [currentMissionTab, setCurrentMissionTab] =
    useState<string>("Waypoints");
  const [currentBarcodeTab, setCurrentBarcodeTab] =
    useState<string>("Barcode Management");
  const [currentLogTab, setCurrentLogTab] = useState<string>("Robot Logs");

  const { snapshots, selectedSnapshot, setSelectedSnapshot } = useBarcode();

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
                  return <></>;
                case "Barcode Management":
                  return (
                    <Fragment>
                      {[null, ...snapshots]?.map((snapshot, index: number) => {
                        return (
                          <Card
                            key={index}
                            onClick={() => setSelectedSnapshot(snapshot)}
                            className={`flex !h-16 cursor-pointer flex-col items-center justify-center gap-1 p-2 text-xs font-medium shadow-sm ${selectedSnapshot?.readableDate === snapshot?.readableDate ? "border border-primary-500 text-primary-700" : "bg-white text-dark-700"}`}
                          >
                            <span>{snapshot?.name}</span>
                            <span>{snapshot?.readableDate || "Now"}</span>
                          </Card>
                        );
                      })}
                    </Fragment>
                  );
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
                return <MissionManagementBoard />;
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
