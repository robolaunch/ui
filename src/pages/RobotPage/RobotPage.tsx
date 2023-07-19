import React, { ReactElement, useEffect, useState } from "react";
import TaskManagementContext from "../../contexts/TaskManagementContext";
import RobotHeader from "../../components/RobotHeader/RobotHeader";
import RemoteDesktop from "./RemoteDesktop/RemoteDesktop";
import Visualization from "./Visualization/Visualization";
import Teleoperation from "./Teleoperation/Teleoperation";
import { useParams } from "react-router-dom";
import Overview from "./Overview/Overview";
import { useAppSelector } from "../../hooks/redux";
import BarcodeManagementContext from "../../contexts/BarcodeManagementContext";
import TaskManagementLayout from "../../layouts/TaskManagementLayout";
import useFunctions from "../../hooks/useFunctions";
import usePages from "../../hooks/usePages";
import RosConnector from "../../components/RosConnector/RosConnector";
import useSidebar from "../../hooks/useSidebar";
import CardLayout from "../../layouts/CardLayout";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { BsFullscreen, BsFullscreenExit } from "react-icons/bs";

export default function RobotPage(): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const [responseLaunchManagers, setResponseLaunchManagers] =
    useState<any>(undefined);

  const [topicList, setTopicList] = useState<any>([]);
  const [ros, setRos] = useState<any>(null);

  const [activeTab, setActiveTab] = useState<string>("Overview");
  const [isSettedCookie, setIsSettedCookie] = useState<boolean>(false);

  const { urls } = useAppSelector((state) => state.robot);
  const { sidebarState } = useSidebar();
  const { pagesState } = usePages();
  const url = useParams();
  const [activeTabCodeEditor, setActiveTabCodeEditor] = useState<
    "Cloud IDE" | "Physical IDE"
  >("Cloud IDE");

  const codeEditorTabs = [
    {
      name: "Cloud IDE",
    },
    {
      name: "Physical IDE",
    },
  ];
  const handleFullScreen = useFullScreenHandle();

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
      `org_${url?.organizationName as string}`
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
                  <BarcodeManagementContext ros={ros}>
                    <TaskManagementLayout ros={ros} />
                  </BarcodeManagementContext>
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
        <div
          id="CODE_EDITOR"
          className={`${
            activeTab === "Code Editor" ? "grid" : "hidden"
          } grid-cols-1 gap-6`}
        >
          {responseRobot?.physicalIdeIngressEndpoint && (
            <CardLayout className="!">
              <ul className="w-full flex justify-center gap-6  p-1 -mb-2.5 rounded">
                {codeEditorTabs.map((tab: any, index: number) => {
                  return (
                    <li
                      className={`flex w-full items-center flex-col gap-3 cursor-pointer 
                     ${tab?.hidden && "!hidden"}`}
                      onClick={() => setActiveTabCodeEditor(tab.name)}
                      key={index}
                    >
                      <div
                        className={`flex gap-1 items-center text-xs font-medium px-2 transition-all duration-500 min-w-max hover:scale-90
                        ${
                          tab.name === activeTabCodeEditor
                            ? "text-layer-primary-500"
                            : "text-layer-light-500"
                        } `}
                      >
                        <span>{tab.name}</span>
                      </div>
                      <div
                        className={`w-full h-[2px] transition-all duration-500 
                  ${
                    tab.name === activeTabCodeEditor
                      ? "bg-layer-primary-500"
                      : "bg-layer-light-100"
                  } `}
                      />
                    </li>
                  );
                })}
              </ul>
            </CardLayout>
          )}
          <CardLayout>
            <FullScreen className="relative" handle={handleFullScreen}>
              <iframe
                allow="clipboard-read"
                className={`w-full animate__animated animate__fadeIn ${
                  handleFullScreen?.active ? "h-screen" : "h-[55rem]"
                }`}
                src={
                  activeTabCodeEditor === "Cloud IDE"
                    ? urls?.ide || responseRobot?.ideIngressEndpoint
                    : responseRobot?.physicalIdeIngressEndpoint
                }
                title="Code Editor"
                onLoad={async () => {
                  if (await responseRobot) {
                    await setTimeout(() => {
                      setIsSettedCookie(true);
                    }, 4000);
                  }
                }}
              />
              {handleFullScreen.active ? (
                <button
                  className="absolute bottom-3 right-3"
                  onClick={handleFullScreen.exit}
                >
                  <BsFullscreenExit
                    size={24}
                    className="text-layer-light-700 hover:scale-90 hover:text-layer-primary-400 transition-all duration-200"
                  />
                </button>
              ) : (
                <button
                  className="absolute bottom-3 right-3"
                  onClick={handleFullScreen.enter}
                >
                  <BsFullscreen
                    size={24}
                    className=" text-layer-light-700 hover:scale-90 hover:text-layer-primary-400 transition-all duration-200"
                  />
                </button>
              )}
            </FullScreen>
          </CardLayout>
        </div>
      </div>
      <RosConnector
        isSettedCookie={isSettedCookie}
        responseRobot={responseRobot}
        ros={ros}
        setRos={setRos}
        setTopicList={setTopicList}
      />
    </div>
  );
}
