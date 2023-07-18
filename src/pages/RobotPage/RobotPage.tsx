import React, { ReactElement, useEffect, useState } from "react";
import TaskManagementContext from "../../contexts/TaskManagementContext";
import RobotHeader from "../../components/RobotHeader/RobotHeader";
import RemoteDesktop from "./RemoteDesktop/RemoteDesktop";
import Visualization from "./Visualization/Visualization";
import Teleoperation from "./Teleoperation/Teleoperation";
import { useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor/CodeEditor";
import Overview from "./Overview/Overview";
import { useAppSelector } from "../../hooks/redux";
import BarcodeManagementContext from "../../contexts/BarcodeManagementContext";
import TaskManagementLayout from "../../layouts/TaskManagementLayout";
import useFunctions from "../../hooks/useFunctions";
import usePages from "../../hooks/usePages";
import RosConnector from "../../components/RosConnector/RosConnector";
import HiddenFrames from "../../components/HiddenFrames/HiddenFrames";

export default function RobotPage(): ReactElement {
  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [topicList, setTopicList] = useState<any>([]);
  const [ros, setRos] = useState<any>(null);
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const [responseLaunchManagers, setResponseLaunchManagers] =
    useState<any>(undefined);
  const { urls } = useAppSelector((state) => state.robot);
  const { pagesState } = usePages();
  const url = useParams();

  const [isSettedCookie, setIsSettedCookie] = useState<boolean>(false);

  const {
    getOrganization,
    getRoboticsCloud,
    getInstance,
    getFleet,
    getRobot,
    getBuildManager,
    getLaunchManagers,
  } = useFunctions();

  useEffect(() => {
    if (
      pagesState?.organization?.organizationName !==
      `org_${url?.organizationName}`
    ) {
      handleGetOrganization();
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
      handleGetRoboticsCloud();
    } else if (pagesState?.instance?.name !== url?.instanceName) {
      handleGetInstance();
    } else if (pagesState?.fleet?.name !== url?.fleetName) {
      handleGetFleet();
    } else if (!responseRobot) {
      handleGetRobot();
      handleGetBuildManager();
      handleGetLaunchManagers();
    }

    const timerResponseRobot = setInterval(() => {
      responseRobot?.robotClusters?.filter(
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
  }, [pagesState, responseRobot, responseBuildManager, responseLaunchManagers]);

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName as string,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      }
    );
  }

  function handleGetRoboticsCloud() {
    getRoboticsCloud(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: url?.roboticsCloudName as string,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      }
    );
  }

  function handleGetInstance() {
    getInstance(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceName: url?.instanceName as string,
        region: pagesState?.roboticsCloud?.region,
        details: true,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      }
    );
  }

  function handleGetFleet() {
    getFleet(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region,
        fleetName: url?.fleetName as string,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      }
    );
  }

  function handleGetRobot() {
    getRobot(
      {
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region,
        fleetName: pagesState?.fleet?.name,
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
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region,
        fleetName: pagesState?.fleet?.name,
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
        organizationId: pagesState?.organization?.organizationId,
        roboticsCloudName: pagesState?.roboticsCloud?.name,
        instanceId: pagesState?.instance?.instanceId,

        region: pagesState?.roboticsCloud?.region,
        fleetName: pagesState?.fleet?.name,
        robotName: url?.robotName as string,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseLaunchManagers,
        setRobotData: true,
      }
    );
  }

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
      <RosConnector
        isSettedCookie={isSettedCookie}
        responseRobot={responseRobot}
        ros={ros}
        setRos={setRos}
        setTopicList={setTopicList}
      />
      <div className="col-span-full">
        <RobotHeader
          responseRobot={responseRobot}
          activeTab={activeTab}
          handleChangeActiveTab={handleChangeActiveTab}
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
            case "Code Editor":
              return (
                <CodeEditor
                  vIdeURL={urls?.ide || responseRobot?.ideIngressEndpoint}
                  pIdeURL={responseRobot?.physicalIdeIngressEndpoint}
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
      <HiddenFrames
        type="ide"
        url={urls?.ide || responseRobot?.ideIngressEndpoint}
        onLoad={() => setIsSettedCookie(true)}
      />
    </div>
  );
}
