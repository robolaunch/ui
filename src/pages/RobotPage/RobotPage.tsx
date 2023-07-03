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

  const [topicList, setTopicList] = useState<any>([]);
  const { selectedState } = useSidebar();
  const [ros, setRos] = useState<any>(null);
  const url = useParams();

  const {
    getOrganization,
    getRoboticsCloud,
    getInstance,
    getFleet,
    getRobot,
    getBuildManager,
    getLaunchManagers,
  } = useFunctions();

  const [responseCurrentOrganization, setResponseCurrentOrganization] =
    useState<any>(undefined);
  const [responseCurrentRoboticsCloud, setResponseCurrentRoboticsCloud] =
    useState<any>(undefined);
  const [responseCurrentInstance, setResponseCurrentInstance] =
    useState<any>(undefined);
  const [responseCurrentFleet, setResponseCurrentFleet] =
    useState<any>(undefined);
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const [responseLaunchManagers, setResponseLaunchManagers] =
    useState<any>(undefined);

  useEffect(() => {
    if (!responseCurrentOrganization) {
      handleGetOrganization();
    } else if (!responseCurrentRoboticsCloud) {
      handleGetRoboticsCloud();
    } else if (!responseCurrentInstance) {
      handleGetInstance();
    } else if (!responseCurrentFleet) {
      handleGetFleet();
    } else if (!responseRobot) {
      handleGetRobot();
      handleGetBuildManager();
      handleGetLaunchManagers();
    }

    const timerResponseRobot = setInterval(() => {
      responseRobot?.robotCluster?.filter(
        (robot: any) => robot?.robotStatus !== "EnvironmentReady"
      )?.length && handleGetRobot();
    }, 10000);

    const timerResponseBuildManager = setInterval(() => {
      responseBuildManager?.robotClusters?.filter(
        (robot: any) => robot?.buildManagerStatus !== "Ready"
      )?.length && handleGetBuildManager();
    }, 10000);

    const timerResponseLaunchManagers = setInterval(() => {
      responseLaunchManagers
        ?.map((launchStep: any) => {
          return launchStep?.robotClusters;
        })
        .flat()
        ?.map((cluster: any) => {
          return cluster?.launchManagerStatus;
        })
        ?.filter((status: any) => status !== "Running")?.length &&
        handleGetLaunchManagers();
    }, 10000);

    return () => {
      clearInterval(timerResponseRobot);
      clearInterval(timerResponseBuildManager);
      clearInterval(timerResponseLaunchManagers);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedState,
    url,
    responseRobot,
    responseBuildManager,
    responseLaunchManagers,
  ]);

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName as string,
      },
      {
        ifErrorNavigateTo404: !responseCurrentOrganization,
        isSetState: true,
        setResponse: setResponseCurrentOrganization,
      }
    );
  }

  function handleGetRoboticsCloud() {
    getRoboticsCloud(
      {
        organizationId: responseCurrentOrganization?.organizationId,
        roboticsCloudName: url?.roboticsCloudName as string,
      },
      {
        ifErrorNavigateTo404: !responseCurrentRoboticsCloud,
        isSetState: true,
        setResponse: setResponseCurrentRoboticsCloud,
      }
    );
  }

  function handleGetInstance() {
    getInstance(
      {
        organizationId: responseCurrentOrganization?.organizationId,
        roboticsCloudName: responseCurrentRoboticsCloud?.name,
        instanceName: url?.instanceName as string,
        region: responseCurrentRoboticsCloud?.region,
      },
      {
        ifErrorNavigateTo404: !responseCurrentInstance,
        isSetState: true,
        setResponse: setResponseCurrentInstance,
      }
    );
  }

  function handleGetFleet() {
    getFleet(
      {
        organizationId: responseCurrentOrganization?.organizationId,
        roboticsCloudName: responseCurrentRoboticsCloud?.name,
        instanceId: responseCurrentInstance?.instanceId,
        region: responseCurrentInstance?.region,
        fleetName: url?.fleetName as string,
      },
      {
        ifErrorNavigateTo404: !responseCurrentFleet,
        isSetState: true,
        setResponse: setResponseCurrentFleet,
      }
    );
  }

  function handleGetRobot() {
    getRobot(
      {
        organizationId: responseCurrentOrganization?.organizationId,
        roboticsCloudName: responseCurrentRoboticsCloud?.name,
        instanceId: responseCurrentInstance?.instanceId,
        region: responseCurrentInstance?.region,
        fleetName: responseCurrentFleet?.name,
        robotName: url?.robotName as string,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setRobotData: true,
        setResponse: setResponseRobot,
      }
    );
  }

  function handleGetBuildManager() {
    getBuildManager(
      {
        organizationId: responseCurrentOrganization?.organizationId,
        roboticsCloudName: responseCurrentRoboticsCloud?.name,
        instanceId: responseCurrentInstance?.instanceId,
        region: responseCurrentInstance?.region,
        fleetName: responseCurrentFleet?.name,
        robotName: url?.robotName as string,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseBuildManager,
        setRobotData: true,
      }
    );
  }

  function handleGetLaunchManagers() {
    getLaunchManagers(
      {
        organizationId: responseCurrentOrganization?.organizationId,
        roboticsCloudName: responseCurrentRoboticsCloud?.name,
        instanceId: responseCurrentInstance?.instanceId,
        region: responseCurrentInstance?.region,
        fleetName: responseCurrentFleet?.name,
        robotName: url?.robotName as string,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseLaunchManagers,
        setRobotData: true,
      }
    );
  }

  const { urls } = useAppSelector((state) => state.user);

  useEffect(() => {
    const ros = new ROSLIB.Ros({
      url:
        urls?.ros ||
        responseRobot?.bridgeIngressEndpoint ||
        "ws://localhost:9090",
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
          responseRobot={responseRobot}
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
                  informationWidgetAction={() => {
                    setActiveTab("Teleoperation");
                  }}
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
              return (
                <CodeEditor
                  ideURL={urls?.ide || responseRobot?.ideIngressEndpoint}
                />
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
            case "Development Suite":
              return (
                <StreamContext
                  vdiIngressEndpoint={
                    urls?.vdi || responseRobot?.vdiIngressEndpoint
                  }
                >
                  <DevelopmentSuite
                    ros={ros}
                    ideIngressEndpoint={
                      urls?.ide || responseRobot?.ideIngressEndpoint
                    }
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
