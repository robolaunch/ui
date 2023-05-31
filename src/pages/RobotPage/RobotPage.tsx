import React, { ReactElement, useEffect, useState } from "react";
import TaskManagementContext from "../../contexts/TaskManagementContext";
import { getOrganizations } from "../../resources/OrganizationSlice";
import RobotHeader from "../../components/RobotHeader/RobotHeader";
import DevelopmentSuite from "./DevelopmentSuite/DevelopmentSuite";
import { getFederatedRobot } from "../../resources/RobotSlice";
import { getInstances } from "../../resources/InstanceSlice";
import TaskManagement from "./TaskManagement/TaskManagement";
import RemoteDesktop from "./RemoteDesktop/RemoteDesktop";
import Visualization from "./Visualization/Visualization";
import Teleoperation from "./Teleoperation/Teleoperation";
import { useNavigate, useParams } from "react-router-dom";
import StreamContext from "../../contexts/StreamContext";
import K8SResources from "./K8SResources/K8SResources";
import { useAppDispatch } from "../../hooks/redux";
import CodeEditor from "./CodeEditor/CodeEditor";
import Workspaces from "./Workspaces/Workspaces";
import useSidebar from "../../hooks/useSidebar";
import Overview from "./Overview/Overview";
import { toast } from "sonner";
import ROSLIB from "roslib";
import {
  handleSetterCurrentOrganization,
  handleSetterCurrentInstances,
  handleSetterResponseRobot,
} from "../../helpers/dashboardDispatcherFunctions";

export default function RobotPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [topicList, setTopicList] = useState<any>([]);
  const { selectedState } = useSidebar();
  const [currentOrganization, setCurrentOrganization] = useState<any>(
    selectedState?.organization || undefined
  );
  const [currentInstance, setCurrentInstance] = useState<any>(
    selectedState?.instance || undefined
  );
  const [ros, setRos] = useState<any>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const url = useParams();

  useEffect(() => {
    if (!currentOrganization) {
      handleSetterCurrentOrganization({
        dispatch,
        url,
        navigate,
        setCurrentOrganization,
      });
    } else if (!currentInstance) {
      handleSetterCurrentInstances({
        dispatch,
        url,
        navigate,
        currentOrganization,
        setCurrentInstance,
      });
    } else {
      handleSetterResponseRobot({
        dispatch,
        url,
        navigate,
        currentOrganization,
        currentInstance,
        setResponseRobot,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentInstance,
    currentOrganization,
    dispatch,
    url?.fleetName,
    url?.robotName,
    url?.roboticsCloudName,
  ]);

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url: responseRobot?.bridgeIngressEndpoint,
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
              return <CodeEditor ideURL={responseRobot?.ideIngressEndpoint} />;
            case "Visualization":
              return (
                <Visualization
                  ros={ros}
                  topicList={topicList}
                  connectionURLs={{
                    rosURL: responseRobot?.bridgeIngressEndpoint,
                    remoteDesktopURL: responseRobot?.vdiIngressEndpoint,
                    ideURL: responseRobot?.ideIngressEndpoint,
                  }}
                  handleForceUpdate={handleForceUpdate}
                />
              );
            case "Teleoperation":
              return (
                <Teleoperation
                  ros={ros}
                  topicList={topicList}
                  connectionURLs={{
                    rosURL: responseRobot?.bridgeIngressEndpoint,
                    remoteDesktopURL: responseRobot?.vdiIngressEndpoint,
                    ideURL: responseRobot?.ideIngressEndpoint,
                  }}
                  handleForceUpdate={handleForceUpdate}
                />
              );
            case "Remote Desktop":
              return (
                <RemoteDesktop
                  connectionURLs={{
                    rosURL: responseRobot?.bridgeIngressEndpoint,
                    remoteDesktopURL:
                      responseRobot?.vdiIngressEndpoint + "ws?password=admin",
                    ideURL: responseRobot?.ideIngressEndpoint,
                  }}
                />
              );
            case "Settings":
              return <div>Settings</div>;
            case "Development Suite":
              return (
                <StreamContext
                  connectionURLs={{
                    rosURL: responseRobot?.bridgeIngressEndpoint,
                    remoteDesktopURL: responseRobot?.vdiIngressEndpoint,
                    ideURL: responseRobot?.ideIngressEndpoint,
                  }}
                >
                  <DevelopmentSuite
                    ros={ros}
                    connectionURLs={{
                      rosURL: responseRobot?.bridgeIngressEndpoint,
                      remoteDesktopURL: responseRobot?.vdiIngressEndpoint,
                      ideURL: responseRobot?.ideIngressEndpoint,
                    }}
                  />
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
