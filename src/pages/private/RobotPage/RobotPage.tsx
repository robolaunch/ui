import React, { Fragment, ReactElement, useEffect, useState } from "react";
import RobotHeader from "../../../components/RobotHeader/RobotHeader";
import RemoteDesktop from "./RemoteDesktop/RemoteDesktop";
import Visualization from "./Visualization/Visualization";
import ROSLIB from "roslib";

export default function RobotPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Remote Desktop");
  const [ros, setRos] = useState<any>(null);
  const [topicList, setTopicList] = useState<any>([]);

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: "ws://172.16.44.153:9090",
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
                return <div>Overview</div>;
              case "Task Management":
                return <div>Task Management</div>;
              case "Robot Workspaces":
                return <div>Robot Workspaces</div>;
              case "Kubernetes Resources":
                return <div>Kubernetes Resources</div>;
              case "Visualization":
                return (
                  <Visualization
                    ros={ros}
                    topicList={topicList}
                    handleForceUpdate={handleForceUpdate}
                  />
                );
              case "Teleoperation":
                return <div>Teleoperation</div>;
              case "Remote Desktop":
                return <RemoteDesktop />;
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
        </div>
      </div>
    </Fragment>
  );
}
