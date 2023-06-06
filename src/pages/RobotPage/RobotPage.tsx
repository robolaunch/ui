import React, { ReactElement, useEffect, useState } from "react";
import TaskManagementContext from "../../contexts/TaskManagementContext";
import RobotHeader from "../../components/RobotHeader/RobotHeader";
import DevelopmentSuite from "./DevelopmentSuite/DevelopmentSuite";
import TaskManagement from "./TaskManagement/TaskManagement";
import RemoteDesktop from "./RemoteDesktop/RemoteDesktop";
import Visualization from "./Visualization/Visualization";
import Teleoperation from "./Teleoperation/Teleoperation";
// import { useParams } from "react-router-dom";
import StreamContext from "../../contexts/StreamContext";
import K8SResources from "./K8SResources/K8SResources";
import CodeEditor from "./CodeEditor/CodeEditor";
import Workspaces from "./Workspaces/Workspaces";
// import useSidebar from "../../hooks/useSidebar";
import Overview from "./Overview/Overview";
import ROSLIB from "roslib";
import { useAppSelector } from "../../hooks/redux";
// import useFunctions from "../../hooks/useFunctions";

export default function RobotPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [topicList, setTopicList] = useState<any>([]);
  // const { selectedState } = useSidebar();

  const [ros, setRos] = useState<any>(null);
  // const url = useParams();

  // const {
  //   handleSetterCurrentOrganization,
  //   handleSetterCurrentRoboticsCloud,
  //   handleSetterCurrentInstance,
  //   handleSetterCurrentFleet,
  //   handleSetterResponseRobot,
  // } = useFunctions();

  // useEffect(() => {
  //   if (!selectedState?.organization) {
  //     handleSetterCurrentOrganization(url?.organizationName);
  //   } else if (!selectedState?.roboticsCloud) {
  //     handleSetterCurrentRoboticsCloud(url?.roboticsCloudName);
  //   } else if (!selectedState?.instance) {
  //     handleSetterCurrentInstance(url?.instanceName);
  //   } else if (!selectedState?.fleet) {
  //     handleSetterCurrentFleet(url?.fleetName);
  //   } else {
  //     handleSetterResponseRobot(url?.robotName, setResponseRobot);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedState, url]);

  const { urls } = useAppSelector((state) => state.user);

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: urls?.ros || "ws://localhost:9090",
    });

    setRos(ros);

    ros?.on("connection", function () {
      console.log("Connected to websocket server.");
    });
    ros?.on("error", function (error) {
      console.error("Error connecting to websocket server: ", error);
    });
    ros?.on("close", function () {
      console.log("Connection to websocket server closed.");
    });

    return () => {
      ros.close();
    };
  }, [responseRobot]);

  useEffect(() => {
    if (ros) {
      const getTopics = new ROSLIB.Service({
        ros: ros,
        name: "/rosapi/topics",
        serviceType: "rosapi/Topics",
      });
      // @ts-ignore
      const request = new ROSLIB.ServiceRequest();
      getTopics.callService(request, function (result) {
        result.topics.map((topic: string, key: number) =>
          setTopicList((prev: any) => [
            ...prev,
            { name: topic, type: result.types[key] },
          ])
        );
      });
    }
  }, [ros]);

  function handleChangeActiveTab(tab: string) {
    setActiveTab(tab);
  }

  function handleForceUpdate(page: string) {
    setActiveTab("Loading");

    setTimeout(() => {
      setActiveTab(page);
    }, 500);
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="col-span-1">
        <RobotHeader
          activeTab={activeTab}
          handleChangeActiveTab={handleChangeActiveTab}
        />
      </div>
      <div className="col-span-1">
        {(() => {
          switch (activeTab) {
            case "Overview":
              return <Overview responseRobot={responseRobot} />;
            case "Task Management":
              return (
                <TaskManagementContext ros={ros}>
                  <TaskManagement ros={ros} />
                </TaskManagementContext>
              );
            case "ROS Workspaces":
              return <Workspaces />;
            case "K8S Resources":
              return <K8SResources />;
            case "Code Editor":
              return <CodeEditor ideURL={urls?.ide} />;
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
                  vdiIngressEndpoint={urls?.vdi}
                  handleForceUpdate={handleForceUpdate}
                />
              );
            case "Remote Desktop":
              return <RemoteDesktop vdiIngressEndpoint={urls?.vdi} />;
            case "Settings":
              return <div>Settings</div>;
            case "Development Suite":
              return (
                <StreamContext vdiIngressEndpoint={urls?.vdi}>
                  <DevelopmentSuite ros={ros} ideIngressEndpoint={urls?.ide} />
                </StreamContext>
              );
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
      </div>
    </div>
  );
}
