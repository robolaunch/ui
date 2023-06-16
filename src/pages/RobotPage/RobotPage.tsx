import React, { ReactElement, useEffect, useState } from "react";
import TaskManagementContext from "../../contexts/TaskManagementContext";
import RobotHeader from "../../components/RobotHeader/RobotHeader";
import DevelopmentSuite from "./DevelopmentSuite/DevelopmentSuite";
import RemoteDesktop from "./RemoteDesktop/RemoteDesktop";
import Visualization from "./Visualization/Visualization";
import Teleoperation from "./Teleoperation/Teleoperation";
import { useParams } from "react-router-dom";
import StreamContext from "../../contexts/StreamContext";
import K8SResources from "./K8SResources/K8SResources";
import CodeEditor from "./CodeEditor/CodeEditor";
import Workspaces from "./Workspaces/Workspaces";
import useSidebar from "../../hooks/useSidebar";
import Overview from "./Overview/Overview";
import ROSLIB from "roslib";
import { useAppSelector } from "../../hooks/redux";
import BarcodeManagementContext from "../../contexts/BarcodeManagementContext";
import TaskManagementLayout from "../../layouts/TaskManagementLayout";
import useFunctions from "../../hooks/useFunctions";

export default function RobotPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const [responseLaunchManagers, setResponseLaunchManagers] =
    useState<any>(undefined);
  const [topicList, setTopicList] = useState<any>([]);
  const { selectedState } = useSidebar();
  const [ros, setRos] = useState<any>(null);
  const url = useParams();

  const {
    handleSetterCurrentOrganization,
    handleSetterCurrentRoboticsCloud,
    handleSetterCurrentInstance,
    handleSetterCurrentFleet,
    handleSetterResponseRobot,
    handleSetterResponseBuildManager,
    handleSetterResponseLaunchManagers,
  } = useFunctions();

  useEffect(() => {
    if (!selectedState?.organization) {
      handleSetterCurrentOrganization(url?.organizationName);
    } else if (!selectedState?.roboticsCloud) {
      handleSetterCurrentRoboticsCloud(url?.roboticsCloudName);
    } else if (!selectedState?.instance) {
      handleSetterCurrentInstance(url?.instanceName);
    } else if (!selectedState?.fleet) {
      handleSetterCurrentFleet(url?.fleetName);
    } else if (!responseRobot) {
      handleSetterResponseRobot(url?.robotName, setResponseRobot);
      handleSetterResponseBuildManager(url?.robotName, setResponseBuildManager);
      handleSetterResponseLaunchManagers(
        url?.robotName,
        setResponseLaunchManagers
      );
    }

    const timerResponseRobot = setInterval(() => {
      responseRobot?.robotCluster?.filter(
        (robot: any) => robot?.robotStatus !== "EnvironmentReady"
      )?.length && handleSetterResponseRobot(url?.robotName, setResponseRobot);
    }, 10000);

    const timerResponseBuildManager = setInterval(() => {
      responseBuildManager?.robotClusters?.filter(
        (robot: any) => robot?.buildManagerStatus !== "EnvironmentReady"
      )?.length &&
        handleSetterResponseBuildManager(
          url?.robotName,
          setResponseBuildManager
        );
    }, 10000);

    // const timerResponseLaunchManagers = setInterval(() => {
    //   responseLaunchManagers
    //     ?.map((launchManager: any) => {
    //       return launchManager?.robotLaunchSteps?.map(
    //         (robotLaunchStep: any) => {
    //           return robotLaunchStep?.robotClusters;
    //         }
    //       );
    //     })
    //     ?.flat()
    //     ?.flat()
    //     ?.filter((robot: any) => robot?.launchManagerStatus !== "Running")
    //     ?.length &&
    //     handleSetterResponseLaunchManagers(
    //       url?.robotName,
    //       setResponseLaunchManagers
    //     );
    // }, 10000);

    return () => {
      clearInterval(timerResponseRobot);
      clearInterval(timerResponseBuildManager);
      // clearInterval(timerResponseLaunchManagers);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedState,
    url,
    responseRobot,
    responseBuildManager,
    responseLaunchManagers,
  ]);

  const { urls } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(urls);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              return (
                <Overview
                  responseRobot={responseRobot}
                  responseBuildManager={responseBuildManager}
                  responseLaunchManagers={responseLaunchManagers}
                />
              );
            case "Task Management":
              return (
                <TaskManagementContext ros={ros}>
                  <BarcodeManagementContext ros={ros}>
                    <TaskManagementLayout ros={ros} />
                  </BarcodeManagementContext>
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
