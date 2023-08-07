import React, { ReactElement, useEffect, useState } from "react";
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
import useFunctions from "../../hooks/useFunctions";
import { useAppSelector } from "../../hooks/redux";
import { useParams } from "react-router-dom";
import Overview from "./Overview/Overview";
import useMain from "../../hooks/useMain";

export default function RobotPage(): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const [responseLaunchManagers, setResponseLaunchManagers] =
    useState<any>(undefined);

  const [topicList, setTopicList] = useState<any>([]);
  const [ros, setRos] = useState<any>(null);

  const [activeTab, setActiveTab] =
    useState<IrobotPages["activeTab"]>("Overview");

  const [isSettedCookie, setIsSettedCookie] = useState<boolean>(false);

  const { urls } = useAppSelector((state) => state.robot);
  const { pagesState, sidebarState } = useMain();
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
    } else if (
      !responseRobot &&
      !responseBuildManager &&
      !responseLaunchManagers
    ) {
      handleGetRobot();
      handleGetBuildManager();
      handleGetLaunchManagers();
    }

    const timerResponseRobot = setInterval(() => {
      !sidebarState?.isOpen &&
        responseRobot?.robotClusters?.filter(
          (robot: any) => robot?.robotStatus !== "EnvironmentReady"
        )?.length &&
        handleGetRobot();
    }, 10000);

    const timerResponseBuildManager = setInterval(() => {
      !sidebarState?.isOpen &&
        responseBuildManager?.robotClusters?.filter(
          (robot: any) => robot?.buildManagerStatus !== "Ready"
        )?.length &&
        handleGetBuildManager();
    }, 10000);

    const timerResponseLaunchManagers = setInterval(() => {
      !sidebarState?.isOpen &&
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

    if (sidebarState?.isOpen) {
      clearInterval(timerResponseRobot);
      clearInterval(timerResponseBuildManager);
      clearInterval(timerResponseLaunchManagers);
    }

    return () => {
      clearInterval(timerResponseRobot);
      clearInterval(timerResponseBuildManager);
      clearInterval(timerResponseLaunchManagers);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pagesState,
    sidebarState?.isOpen,
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
    </div>
  );
}
