import React, { useEffect, createContext, useState } from "react";
import { envOnPremiseFleet, envOnPremiseRobot } from "../helpers/envProvider";
import { IrobotPages } from "../interfaces/generalInterfaces";
import useFunctions from "../hooks/useFunctions";
import { useParams } from "react-router-dom";
import useMain from "../hooks/useMain";

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

  const { pagesState, sidebarState } = useMain();

  const [activeTab, setActiveTab] =
    useState<IrobotPages["activeTab"]>("Overview");

  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const [responseBuildManager, setResponseBuildManager] =
    useState<any>(undefined);
  const [responseLaunchManagers, setResponseLaunchManagers] =
    useState<any>(undefined);

  const [topicList, setTopicList] = useState<any>([]);
  const [ros, setRos] = useState<any>(null);

  const url = useParams();
  const [isSettedCookie, setIsSettedCookie] = useState<boolean | null>(null);

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
      envOnPremiseFleet ? handleGetNamespace() : handleGetFleet();
    } else if (
      !responseRobot &&
      !responseBuildManager &&
      !responseLaunchManagers
    ) {
      envOnPremiseRobot ? handleGetEnvironment() : handleGetRobot();
      !envOnPremiseRobot && handleGetBuildManager();
      !envOnPremiseRobot && handleGetLaunchManagers();
    }

    const timerResponseRobot = setInterval(() => {
      if (
        !sidebarState?.isOpen &&
        Array.isArray(responseRobot?.robotClusters) &&
        responseRobot?.robotClusters?.filter(
          (robot: any) => robot?.robotStatus !== "EnvironmentReady"
        )?.length
      ) {
        envOnPremiseRobot ? handleGetEnvironment() : handleGetRobot();
      }
    }, 10000);

    const timerResponseBuildManager = setInterval(() => {
      !sidebarState?.isOpen &&
        responseBuildManager?.robotClusters?.filter(
          (robot: any) => robot?.buildManagerStatus !== "Ready"
        )?.length &&
        !envOnPremiseRobot &&
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
        !envOnPremiseRobot &&
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
        organizationId: pagesState?.organization?.organizationId as string,
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
        organizationId: pagesState?.organization?.organizationId as string,
        roboticsCloudName: pagesState?.roboticsCloud?.name as string,
        instanceName: url?.instanceName as string,
        region: pagesState?.roboticsCloud?.region as string,
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
        organizationId: pagesState?.organization?.organizationId as string,
        roboticsCloudName: pagesState?.roboticsCloud?.name as string,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region as string,
        fleetName: url?.fleetName as string,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        isSetState: true,
        setPages: true,
      }
    );
  }

  function handleGetNamespace() {
    getNamespace(
      {
        organizationId: pagesState?.organization?.organizationId as string,
        roboticsCloudName: pagesState?.roboticsCloud?.name as string,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region as string,
        namespaceName: url?.fleetName as string,
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
        organizationId: pagesState?.organization?.organizationId as string,
        roboticsCloudName: pagesState?.roboticsCloud?.name as string,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region as string,
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

  function handleGetEnvironment() {
    getEnvironment(
      {
        organizationId: pagesState?.organization?.organizationId as string,
        roboticsCloudName: pagesState?.roboticsCloud?.name as string,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region as string,
        fleetName: pagesState?.fleet?.name,
        environmentName: url?.robotName as string,
      },
      {
        ifErrorNavigateTo404: !responseRobot,
        setResponse: setResponseRobot,
        setRobotData: true,
      }
    );
  }

  function handleGetBuildManager() {
    getBuildManager(
      {
        organizationId: pagesState?.organization?.organizationId as string,
        roboticsCloudName: pagesState?.roboticsCloud?.name as string,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region as string,
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
        organizationId: pagesState?.organization?.organizationId as string,
        roboticsCloudName: pagesState?.roboticsCloud?.name as string,
        instanceId: pagesState?.instance?.instanceId,
        region: pagesState?.roboticsCloud?.region as string,
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

  function handleForceReloadRobotPage() {
    setResponseRobot(undefined);
    setResponseBuildManager(undefined);
    setResponseLaunchManagers(undefined);
    setIsSettedCookie(null);
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
        ros,
        setRos,
        topicList,
        setTopicList,
        isSettedCookie,
        setIsSettedCookie,
        handleForceUpdate,
        handleForceReloadRobotPage,
      }}
    >
      {children}
    </RobotContext.Provider>
  );
};
