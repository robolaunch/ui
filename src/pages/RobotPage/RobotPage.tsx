import React, { ReactElement, useEffect, useState } from "react";
import RobotHeader from "../../components/RobotHeader/RobotHeader";
import RemoteDesktop from "./RemoteDesktop/RemoteDesktop";
import Visualization from "./Visualization/Visualization";
import ROSLIB from "roslib";
import Teleoperation from "./Teleoperation/Teleoperation";
import DevelopmentSuite from "./DevelopmentSuite/DevelopmentSuite";
import CodeEditor from "./CodeEditor/CodeEditor";
import Overview from "./Overview/Overview";
import TaskManagement from "./TaskManagement/TaskManagement";
import Workspaces from "./Workspaces/Workspaces";
import K8SResources from "./K8SResources/K8SResources";
import StreamContext from "../../contexts/StreamContext";
import TaskManagementContext from "../../contexts/TaskManagementContext";

export default function RobotPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [ros, setRos] = useState<any>(null);
  const [topicList, setTopicList] = useState<any>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [connectionURLs, setConnectionURLs] = useState<{
    rosURL: string;
    remoteDesktopURL: string;
    ideURL: string;
  }>({
    rosURL: "ws://localhost:9090",
    remoteDesktopURL: "ws://localhost:8080/ws?password=admin",
    ideURL: "http://3.120.228.144:30901",
  });

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: connectionURLs.rosURL,
    });
    setRos(ros);

    ros.on("connection", function () {
      console.log("Connected to websocket server.");
    });
    ros.on("error", function (error) {
      console.log("Error connecting to websocket server: ", error);
    });
    ros.on("close", function () {
      console.log("Connection to websocket server closed.");
    });

    return () => {
      ros.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    setTimeout(
      () => {
        setActiveTab(page);
      },

      500
    );
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
              return <Overview />;
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
              return <CodeEditor connectionURLs={connectionURLs} />;
            case "Visualization":
              return (
                <Visualization
                  ros={ros}
                  topicList={topicList}
                  connectionURLs={connectionURLs}
                  handleForceUpdate={handleForceUpdate}
                />
              );
            case "Teleoperation":
              return (
                <Teleoperation
                  ros={ros}
                  topicList={topicList}
                  connectionURLs={connectionURLs}
                  handleForceUpdate={handleForceUpdate}
                />
              );
            case "Remote Desktop":
              return <RemoteDesktop connectionURLs={connectionURLs} />;
            case "Settings":
              return <div>Settings</div>;
            case "Development Suite":
              return (
                <StreamContext connectionURLs={connectionURLs}>
                  <DevelopmentSuite ros={ros} connectionURLs={connectionURLs} />
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
