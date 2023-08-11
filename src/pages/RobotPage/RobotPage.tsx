import React, { ReactElement, useState } from "react";
import TaskManagementLayout from "../../layouts/TaskManagementLayout";
import RosConnector from "../../components/RosConnector/RosConnector";
import RobotHeader from "../../components/RobotHeader/RobotHeader";
import DevelopmentSuite from "./DevelopmentSuite/DevelopmentSuite";
import TaskManagementContext from "../../contexts/MissionContext";
import { IrobotPages } from "../../interfaces/generalInterfaces";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import BarcodeContext from "../../contexts/BarcodeContext";
import RemoteDesktop from "./RemoteDesktop/RemoteDesktop";
import Visualization from "./Visualization/Visualization";
import Teleoperation from "./Teleoperation/Teleoperation";
import { useAppSelector } from "../../hooks/redux";
import Overview from "./Overview/Overview";
import HiddenVDIFrame from "../../components/HiddenVDIFrame/HiddenVDIFrame";
import { envOnPremise } from "../../helpers/envProvider";
import useRobot from "../../hooks/useRobot";

export default function RobotPage(): ReactElement {
  const {
    activeTab,
    setActiveTab,
    responseRobot,
    responseBuildManager,
    responseLaunchManagers,
    ros,
    setRos,
    topicList,
    setTopicList,
  } = useRobot();
  const [isSettedCookie, setIsSettedCookie] = useState<boolean | null>(null);

  const { urls } = useAppSelector((state) => state.robot);

  function handleChangeActiveTab(tab: IrobotPages["activeTab"]) {
    setActiveTab(tab);
  }

  function handleForceUpdate(
    page:
      | "Overview"
      | "Teleoperation"
      | "Task Management"
      | "Visualization"
      | "Loading"
      | "Settings"
      | "Remote Desktop"
      | "Development Suite"
      | "Code Editor"
  ) {
    setActiveTab("Loading");

    setTimeout(() => {
      setActiveTab(page);
    }, 500);
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="col-span-full">
        <RobotHeader
          responseRobot={responseRobot}
          isSettedCookie={isSettedCookie}
          activeTab={activeTab}
          handleChangeActiveTab={handleChangeActiveTab}
          ros={ros}
        />
      </div>

      <div className="col-span-full">
        {(() => {
          switch (activeTab) {
            case "Overview":
              return (
                <Overview
                  responseRobot={responseRobot}
                  responseBuildManager={responseBuildManager}
                  responseLaunchManagers={responseLaunchManagers}
                  informationWidgetAction={() => {
                    setActiveTab(
                      envOnPremise ? "Development Suite" : "Teleoperation"
                    );
                  }}
                />
              );
            case "Task Management":
              return (
                <TaskManagementContext ros={ros}>
                  <BarcodeContext ros={ros}>
                    <TaskManagementLayout ros={ros} />
                  </BarcodeContext>
                </TaskManagementContext>
              );
            case "Visualization":
              return (
                <Visualization
                  ros={ros}
                  topicList={topicList}
                  handleForceUpdate={handleForceUpdate}
                />
              );
            case "Teleoperation":
              return (
                <Teleoperation
                  ros={ros}
                  topicList={topicList}
                  vdiIngressEndpoint={
                    urls?.vdi || responseRobot?.vdiIngressEndpoint
                  }
                  handleForceUpdate={handleForceUpdate}
                />
              );
            case "Development Suite":
              return (
                <DevelopmentSuite
                  ideURL={urls?.ide || responseRobot?.ideIngressEndpoint}
                  vdiURL={urls?.vdi || responseRobot?.vdiIngressEndpoint}
                />
              );
            case "Remote Desktop":
              return (
                <RemoteDesktop
                  vdiIngressEndpoint={
                    urls?.vdi || responseRobot?.vdiIngressEndpoint
                  }
                />
              );
            case "Settings":
              return <div>Settings</div>;
            case "Loading":
              return (
                <div>
                  <img
                    className="mx-auto scale-75"
                    src="/svg/general/loading.svg"
                    alt="loading"
                  />
                </div>
              );
          }
        })()}
        <CodeEditor
          activeTab={activeTab}
          responseRobot={responseRobot}
          setIsSettedCookie={setIsSettedCookie}
        />
      </div>
      <RosConnector
        isSettedCookie={isSettedCookie}
        responseRobot={responseRobot}
        ros={ros}
        setRos={setRos}
        topicList={topicList}
        setTopicList={setTopicList}
      />
      <HiddenVDIFrame url={responseRobot?.vdiIngressEndpoint} />
    </div>
  );
}
