import RobotManagementSidebar from "../components/RobotManagementSidebar/RobotManagementSidebar";
import RMSLogSettingsMapper from "../components/RMSLogSettingsMapper/RMSLogSettingsMapper";
import TaskManagementBoard from "../components/TaskManagementBoard/TaskManagementBoard";
import RMTaskJobsMapperV2 from "../components/RMTaskJobsMapperV2/RMTaskJobsMapperV2";
import LogManagementBoard from "../components/LogManagementBoard/LogManagementBoard";
import LayoutTabSwitcher from "../components/LayoutTabSwitcher/LayoutTabSwitcher";
import RMBarcodeMapper from "../components/RMBarcodeMapper/RMBarcodeMapper";
import RMSLogMapper from "../components/RMSLogMapper/RMSLogMapper";
import { ReactElement, useState } from "react";

export default function RobotManagementLayout(): ReactElement {
  const [currentMainTab, setCurrentMainTab] = useState<
    "Task Management" | "Robot Logs"
  >("Task Management");
  const [currentLogTab, setCurrentLogTab] = useState<"Robot Logs" | "Settings">(
    "Robot Logs",
  );
  const [currentTaskTab, setCurrentTaskTab] = useState<"Jobs" | "Barcodes">(
    "Jobs",
  );

  return (
    <div className="wh-full flex flex-col gap-6">
      <LayoutTabSwitcher
        tabs={["Task Management", "Robot Logs"]}
        activeTab={currentMainTab}
        setActiveTab={setCurrentMainTab}
      />
      <div className="wh-full grid grid-cols-12 gap-6">
        <div className="wh-full col-span-3">
          <RobotManagementSidebar
            setter={(() => {
              switch (currentMainTab) {
                case "Task Management":
                  return setCurrentTaskTab;
                case "Robot Logs":
                  return setCurrentLogTab;
                default:
                  return () => {};
              }
            })()}
            currentTab={(() => {
              switch (currentMainTab) {
                case "Task Management":
                  return currentTaskTab;
                case "Robot Logs":
                  return currentLogTab;
              }
            })()}
            tabs={(() => {
              switch (currentMainTab) {
                case "Task Management":
                  return ["Jobs", "Barcodes"];
                case "Robot Logs":
                  return ["Robot Logs", "Settings"];
              }
            })()}
            children={(() => {
              switch (currentMainTab) {
                case "Task Management":
                  switch (currentTaskTab) {
                    case "Jobs":
                      return <RMTaskJobsMapperV2 />;
                    case "Barcodes":
                      return <RMBarcodeMapper />;
                    default:
                      return <></>;
                  }
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
              case "Task Management":
                return <TaskManagementBoard />;
              case "Robot Logs":
                return <LogManagementBoard />;
            }
          })()}
        </div>
      </div>
    </div>
  );
}
