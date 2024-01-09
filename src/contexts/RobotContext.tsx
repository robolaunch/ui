import { useEffect, createContext, useState, useReducer } from "react";
import { IEnvironmentCluster, IrobotTab } from "../interfaces/robotInterfaces";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import ROSLIB from "roslib";
import { useAppSelector } from "../hooks/redux";
import useCreateRobot from "../hooks/useCreateRobot";

export const RobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const {
    getOrganization,
    getRoboticsCloud,
    getInstance,
    getPhysicalInstance,
    getFleet,
    getNamespace,
    getRobot,
    getEnvironment,
    getBuildManager,
    getLaunchManagers,
  } = useFunctions();

  const { applicationMode } = useAppSelector((state) => state.user);

  const url = useParams();

  const { pagesState, sidebarState } = useMain();

  const [activeTab, setActiveTab] = useState<IrobotTab["name"]>("Overview");

  const [responsePhysicalInstance, setResponsePhysicalInstance] =
    useState<any>(undefined);
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const [responseLaunchManagers, setResponseLaunchManagers] =
    useState<any>(undefined);

  const { robotData } = useCreateRobot();

  const [iFrameId, setIFrameId] = useState<number>(0);
  const [isRobotReady, setIsRobotReady] = useState<boolean>(false);
  const [isSettedCookie, setIsSettedCookie] = useState<boolean | undefined>(
    undefined,
  );

  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  const [topicList, setTopicList] = useState<any>([]);

  const [connectionsReducer, dispatcher] = useReducer(handleReducer, {
    ros: null,
    virtualIDE: null,
    physicalIDE: null,
    vdi: null,
  });

  const { urls } = useAppSelector((state) => state.robot);

  function handleReducer(state: any, action: any) {
    switch (action.type) {
      case "ros":
        return {
          ...state,
          ros: action.payload,
        };
      case "virtualIDE":
        return {
          ...state,
          virtualIDE: action.payload,
        };
      case "physicalIDE":
        return {
          ...state,
          physicalIDE: action.payload,
        };
      case "vdi":
        return {
          ...state,
          vdi: action.payload,
        };
      default:
        return state;
    }
  }

  // Main Functions
  useEffect(() => {
    if (
      pagesState?.organization?.organizationName !==
      `org_${url?.organizationName}`
    ) {
      return handleGetOrganization();
    } else if (pagesState?.roboticsCloud?.name !== url?.roboticsCloudName) {
      return handleGetRoboticsCloud();
    } else if (pagesState?.instance?.name !== url?.instanceName) {
      return handleGetInstance();
    } else if (pagesState?.fleet?.name !== url?.fleetName) {
      return applicationMode ? handleGetNamespace() : handleGetFleet();
    } else if (!responseRobot) {
      applicationMode ? handleGetEnvironment() : handleGetRobot();
    } else if (!responseBuildManager) {
      !applicationMode && handleGetBuildManager();
    } else if (!responseLaunchManagers) {
      !applicationMode && handleGetLaunchManagers();
    } else if (responseRobot?.physicalInstance && !responsePhysicalInstance) {
      handleGetPhysicalInstance();
    }

    const timerEnvironment = setInterval(() => {
      if (
        !sidebarState?.isOpen &&
        Array.isArray(robotData.step1.clusters.environment) &&
        robotData.step1.clusters.environment?.filter(
          (cluster: IEnvironmentCluster) =>
            cluster?.status !== "EnvironmentReady",
        )?.length
      ) {
        applicationMode ? handleGetEnvironment() : handleGetRobot();
      }
    }, 10000);

    const timerResponseBuildManager = setInterval(() => {
      !sidebarState?.isOpen &&
        responseBuildManager?.robotClusters?.filter(
          (robot: any) => robot?.buildManagerStatus !== "Ready",
        )?.length &&
        !applicationMode &&
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
        !applicationMode &&
        handleGetLaunchManagers();
    }, 10000);

    if (sidebarState?.isOpen) {
      clearInterval(timerEnvironment);
      clearInterval(timerResponseBuildManager);
      clearInterval(timerResponseLaunchManagers);
    }

    return () => {
      clearInterval(timerEnvironment);
      clearInterval(timerResponseBuildManager);
      clearInterval(timerResponseLaunchManagers);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pagesState,
    responseRobot,
    responseBuildManager,
    responseLaunchManagers,
    robotData,
  ]);
  // Main Functions

  // isRobotReady
  useEffect(() => {
    const isEnvironmentReady =
      robotData.step1.clusters.environment?.filter(
        (robot: any) => robot?.status !== "EnvironmentReady",
      )?.length === 0
        ? true
        : false;

    const isBuildManagerReady =
      responseBuildManager?.robotClusters?.filter(
        (robot: any) => robot?.buildManagerStatus !== "Ready",
      )?.length === 0
        ? true
        : false;

    const isLaunchManagerReady =
      responseLaunchManagers
        ?.map((launchStep: any) => {
          return launchStep?.robotClusters;
        })
        .flat()
        ?.map((cluster: any) => {
          return cluster?.launchManagerStatus;
        })
        ?.filter((status: any) => status !== "Running")?.length === 0
        ? true
        : false;

    if (isEnvironmentReady || isBuildManagerReady || isLaunchManagerReady) {
      setIsRobotReady(true);
    } else {
      setIFrameId((prevState) => prevState + 1);
      setIsRobotReady(false);
    }
  }, [
    responseRobot,
    responseBuildManager,
    responseLaunchManagers,
    robotData.step1.clusters.environment,
  ]);
  // isRobotReady

  // Cookies Reloader
  useEffect(() => {
    const timer = setInterval(
      () => {
        setIFrameId((prevState) => prevState + 1);
      },
      5 * 60 * 1000,
    ); // 5 minutes

    return () => {
      clearInterval(timer);
    };
  }, [
    isRobotReady,
    responseRobot,
    responseBuildManager,
    responseLaunchManagers,
    iFrameId,
  ]);
  // Cookies Reloader

  // ROS Bridge Connector
  useEffect(() => {
    const rosClient: ROSLIB.Ros | null =
      !applicationMode &&
      isSettedCookie &&
      responseRobot?.bridgeIngressEndpoint?.split("://")[0] === "wss"
        ? new ROSLIB.Ros({
            url: urls?.ros || responseRobot?.bridgeIngressEndpoint,
          })
        : null;

    setRos(rosClient);

    rosClient?.on("connection", function () {
      connectionsReducer?.ros === null &&
        dispatcher({ type: "ros", payload: true });
    });
    rosClient?.on("error", function (error) {
      connectionsReducer?.ros === null &&
        dispatcher({ type: "ros", payload: false });
    });
    rosClient?.on("close", function () {
      connectionsReducer?.ros === null &&
        dispatcher({ type: "ros", payload: false });
    });

    return () => {
      rosClient?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettedCookie]);
  // ROS Bridge Connector

  // ROS Topic Setter
  useEffect(() => {
    function getTopics() {
      if (ros && isSettedCookie && !applicationMode) {
        const getTopics = new ROSLIB.Service({
          ros: ros,
          name: "/rosapi/topics",
          serviceType: "rosapi/Topics",
        });

        const request = new ROSLIB.ServiceRequest({});
        getTopics.callService(request, async function (result) {
          const resultTopicsList = await result?.topics?.map(
            (topic: string, key: number) => {
              return {
                name: topic,
                type: result?.types[key],
              };
            },
          );

          if (resultTopicsList?.length !== topicList?.length) {
            setTopicList(resultTopicsList);
          }
        });
      }
    }

    getTopics();

    const timer = setInterval(() => getTopics(), 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ros, isSettedCookie]);
  // ROS Topic Setter

  // VDI - vIDE Test Connection
  useEffect(() => {
    const vdiClient: WebSocket | null =
      isSettedCookie && connectionsReducer?.vdi === null
        ? new WebSocket(
            (urls?.vdi || responseRobot?.vdiIngressEndpoint) +
              "ws?password=admin",
          )
        : null;

    vdiClient?.addEventListener("open", () => {
      ["vdi", "virtualIDE"].map((connection) =>
        dispatcher({
          type: connection,
          payload: true,
        }),
      );
    });

    vdiClient?.addEventListener("error", () => {
      ["vdi", "virtualIDE"].map((connection) =>
        dispatcher({
          type: connection,
          payload: false,
        }),
      );
    });

    connectionsReducer?.vdi !== null && vdiClient && vdiClient.close();

    return () => {
      vdiClient?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettedCookie, connectionsReducer?.vdi]);
  // VDI - vIDE Test Connection

  // Physical IDE Test Connection
  useEffect(() => {
    if (isSettedCookie && typeof connectionsReducer?.vdi === "boolean") {
      if (
        connectionsReducer?.vdi &&
        responsePhysicalInstance?.federationPhase === "Connected" &&
        responsePhysicalInstance?.multicastPhase === "Connected" &&
        responsePhysicalInstance?.phase === "Connected"
      ) {
        dispatcher({
          type: "physicalIDE",
          payload: true,
        });
      } else {
        dispatcher({
          type: "physicalIDE",
          payload: false,
        });
      }
    }
  }, [responsePhysicalInstance, isSettedCookie, connectionsReducer?.vdi]);
  // Physical IDE Test Connection

  function handleGetOrganization() {
    getOrganization(
      {
        organizationName: url?.organizationName!,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      },
    );
  }

  function handleGetRoboticsCloud() {
    getRoboticsCloud(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: url?.roboticsCloudName!,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      },
    );
  }

  function handleGetInstance() {
    getInstance(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceName: url?.instanceName!,
        region: pagesState?.roboticsCloud?.region!,
        details: true,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      },
    );
  }

  function handleGetPhysicalInstance() {
    getPhysicalInstance(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.instanceId!,
        physicalInstanceName: responseRobot?.physicalInstance,
        region: pagesState?.roboticsCloud?.region!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponsePhysicalInstance,
      },
    );
  }

  function handleGetFleet() {
    getFleet(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.instanceId!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: url?.fleetName!,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      },
    );
  }

  function handleGetNamespace() {
    getNamespace(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.instanceId!,
        region: pagesState?.roboticsCloud?.region!,
        namespaceName: url?.fleetName!,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      },
    );
  }

  function handleGetRobot() {
    getRobot(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.instanceId!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: pagesState?.fleet?.name,
        robotName: url?.robotName!,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setRobotData: true,
        setResponse: setResponseRobot,
      },
    );
  }

  function handleGetEnvironment() {
    getEnvironment(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.instanceId!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: pagesState?.fleet?.name,
        environmentName: url?.robotName!,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setResponse: setResponseRobot,
        setRobotData: true,
      },
    );
  }

  function handleGetBuildManager() {
    getBuildManager(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.instanceId!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: pagesState?.fleet?.name,
        robotName: url?.robotName!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseBuildManager,
        setRobotData: true,
      },
    );
  }

  function handleGetLaunchManagers() {
    getLaunchManagers(
      {
        organizationId: pagesState?.organization?.organizationId!,
        roboticsCloudName: pagesState?.roboticsCloud?.name!,
        instanceId: pagesState?.instance?.instanceId!,
        region: pagesState?.roboticsCloud?.region!,
        fleetName: pagesState?.fleet?.name,
        robotName: url?.robotName!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseLaunchManagers,
        setRobotData: true,
      },
    );
  }

  function handleForceUpdate(page: IrobotTab["name"]) {
    setActiveTab("Loading");
    setTimeout(() => {
      setActiveTab(page);
    }, 500);
  }

  function handleResetRobot() {
    setResponseRobot(undefined);
    setResponseBuildManager(undefined);
    setResponseLaunchManagers(undefined);
    setIsSettedCookie(undefined);
    setIsRobotReady(false);
    setRos(null);
    setTopicList([]);
    setActiveTab("Overview");
  }

  return (
    <RobotContext.Provider
      value={{
        activeTab,
        setActiveTab,
        responsePhysicalInstance,
        responseRobot,
        responseBuildManager,
        responseLaunchManagers,
        isRobotReady,
        iFrameId,
        ros,
        setRos,
        topicList,
        isSettedCookie,
        setIsSettedCookie,
        connectionsReducer,
        setTopicList,
        handleForceUpdate,
        handleResetRobot,
      }}
    >
      {children}
    </RobotContext.Provider>
  );
};
