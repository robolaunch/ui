import { useEffect, createContext, useState } from "react";
import { IrobotTab } from "../interfaces/robotInterfaces";
import { envApplication } from "../helpers/envProvider";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";
import ROSLIB from "roslib";

export const RobotContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const {
    getOrganization,
    getRoboticsCloud,
    getInstance,
    getFleet,
    getNamespace,
    getRobot,
    getEnvironment,
    getBuildManager,
    getLaunchManagers,
  } = useFunctions();

  const url = useParams();

  const { pagesState, sidebarState } = useMain();

  const [activeTab, setActiveTab] = useState<IrobotTab["name"]>("Overview");

  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const [responseLaunchManagers, setResponseLaunchManagers] =
    useState<any>(undefined);

  const [iFrameId, setIFrameId] = useState<number>(0);
  const [isRobotReady, setIsRobotReady] = useState<boolean>(false);
  const [isSettedCookie, setIsSettedCookie] = useState<boolean | undefined>(
    undefined,
  );

  const [ros, setRos] = useState<ROSLIB.Ros | null>(null);
  const [topicList, setTopicList] = useState<any>([]);
  const [isRosConnected, setIsRosConnected] = useState<boolean | null>(null);

  const [isVDIConnected, setIsVDIConnected] = useState<boolean | null>(null);

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
      return envApplication ? handleGetNamespace() : handleGetFleet();
    } else if (!responseRobot) {
      envApplication ? handleGetEnvironment() : handleGetRobot();
    } else if (!responseBuildManager) {
      !envApplication && handleGetBuildManager();
    } else if (!responseLaunchManagers) {
      !envApplication && handleGetLaunchManagers();
    }

    const timerResponseRobot = setInterval(() => {
      if (
        !sidebarState?.isOpen &&
        Array.isArray(responseRobot?.robotClusters) &&
        responseRobot?.robotClusters?.filter(
          (robot: any) => robot?.robotStatus !== "EnvironmentReady",
        )?.length
      ) {
        envApplication ? handleGetEnvironment() : handleGetRobot();
      }
    }, 10000);

    const timerResponseBuildManager = setInterval(() => {
      !sidebarState?.isOpen &&
        responseBuildManager?.robotClusters?.filter(
          (robot: any) => robot?.buildManagerStatus !== "Ready",
        )?.length &&
        !envApplication &&
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
        !envApplication &&
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
  }, [pagesState, responseRobot, responseBuildManager, responseLaunchManagers]);
  // Main Functions

  // isRobotReady
  useEffect(() => {
    const isWorkspaceReady =
      responseRobot?.robotClusters?.filter(
        (robot: any) => robot?.robotStatus !== "EnvironmentReady",
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

    if (isWorkspaceReady || isBuildManagerReady || isLaunchManagerReady) {
      setIsRobotReady(true);
    } else {
      setIFrameId((prevState) => prevState + 1);
      setIsRobotReady(false);
    }
  }, [responseRobot, responseBuildManager, responseLaunchManagers]);
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
      !envApplication &&
      isSettedCookie &&
      responseRobot?.bridgeIngressEndpoint?.split("://")[0] === "wss"
        ? new ROSLIB.Ros({
            url: responseRobot?.bridgeIngressEndpoint,
          })
        : null;

    setRos(ros);

    rosClient?.on("connection", function () {
      isRosConnected === null && setIsRosConnected(true);
    });
    rosClient?.on("error", function (error) {
      isRosConnected === null && setIsRosConnected(false);
    });
    rosClient?.on("close", function () {
      isRosConnected === null && setIsRosConnected(false);
    });

    return () => {
      ros?.close();
      rosClient?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettedCookie]);
  // ROS Bridge Connector

  // ROS Topic Setter
  useEffect(() => {
    !envApplication && getTopics();

    const timer = setInterval(() => {
      !envApplication && getTopics();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ros]);

  function getTopics() {
    if (ros && isSettedCookie && !envApplication) {
      const getTopics = new ROSLIB.Service({
        ros: ros,
        name: "/rosapi/topics",
        serviceType: "rosapi/Topics",
      });
      // @ts-ignore
      const request = new ROSLIB.ServiceRequest();
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
  // ROS Topic Setter

  // VDI Test Connection
  useEffect(() => {
    const vdiClient =
      isSettedCookie && isVDIConnected === null
        ? new WebSocket(responseRobot?.vdiIngressEndpoint + "ws?password=admin")
        : null;

    vdiClient?.addEventListener("open", () => {
      isVDIConnected === null && setIsVDIConnected(true);
    });

    vdiClient?.addEventListener("error", () => {
      isVDIConnected === null && setIsVDIConnected(false);
    });

    vdiClient?.addEventListener("close", () => {
      isVDIConnected === null && setIsVDIConnected(false);
    });

    typeof isVDIConnected === "boolean" && vdiClient?.close();

    return () => {
      vdiClient?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSettedCookie, isVDIConnected]);
  // VDI Test Connection

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
        isRosConnected,
        setIsRosConnected,
        isVDIConnected,
        setIsVDIConnected,
        setTopicList,
        handleForceUpdate,
        handleResetRobot,
      }}
    >
      {children}
    </RobotContext.Provider>
  );
};
