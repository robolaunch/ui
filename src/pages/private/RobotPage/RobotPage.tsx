import React, { Fragment, ReactElement, useEffect, useState } from "react";
import RobotHeader from "../../../components/RobotHeader/RobotHeader";
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

export default function RobotPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [ros, setRos] = useState<any>(null);
  const [topicList, setTopicList] = useState<any>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [connectionURLs, setConnectionURLs] = useState<any>({
    rosURL: "ws://localhost:9090",
    // rosURL: "ws://172.16.44.200:31549",
    // remoteDesktopURL: "ws://172.16.44.200:32580/vdi/ws?password=admin",
    // remoteDesktopURL: "ws://172.16.44.170:8080/vdi/ws?password=admin",
    // remoteDesktopURL: "ws://18.194.41.119:32731/vdi/ws?password=admin",
    remoteDesktopURL: "ws://localhost:8080/ws?password=admin",

    ideURL: "http://172.16.44.200:31512",
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
    <Fragment>
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
                return <TaskManagement ros={ros} />;
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
                return <DevelopmentSuite connectionURLs={connectionURLs} />;
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
    </Fragment>
  );
}
