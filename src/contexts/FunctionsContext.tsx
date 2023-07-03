import React, { createContext } from "react";
import {
  IgetBuildManager,
  IgetFleet,
  IgetFleets,
  IgetInstance,
  IgetInstances,
  IgetLaunchManagers,
  IgetOrganization,
  IgetPhysicalFleet,
  IgetPhysicalInstances,
  IgetRobot,
  IgetRoboticsCloud,
  IgetRoboticsClouds,
  IgetRobots,
  ImultipleGetLaunchParameters,
  ImultipleGetParameters,
  IsingleGetBuildParameters,
  IsingleGetParameters,
  IsingleGetRobotParameters,
} from "../interfaces/useFunctionsInterfaces";
import {
  getFederatedRobot,
  getFederatedRobots,
  getRobotBuildManagers,
  getRobotLaunchManagers,
} from "../resources/RobotSlice";
import { getRoboticsCloudsOfOrganization } from "../resources/RoboticsCloudSlice";
import { getOrganizations as getAllOrganizations } from "../resources/OrganizationSlice";
import { getPhysicalInstances as getAllPhysicalInstances } from "../resources/InstanceSlice";
import { getInstances as getAllInstances } from "../resources/InstanceSlice";
import { getFederatedFleets } from "../resources/FleetSlice";
import useCreateRobot from "../hooks/useCreateRobot";
import { useAppDispatch } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import useSidebar from "../hooks/useSidebar";
import { toast } from "sonner";

export const FunctionsContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const dispatch = useAppDispatch();
  const { setSelectedState } = useSidebar();
  const navigate = useNavigate();
  const { setRobotData } = useCreateRobot();

  async function getOrganizations(parameters?: ImultipleGetParameters) {
    dispatch(getAllOrganizations()).then((organizationsResponse: any) => {
      if (organizationsResponse?.payload?.data) {
        parameters?.setResponse &&
          parameters?.setResponse(organizationsResponse?.payload?.data || []);

        parameters?.setItemCount &&
          parameters?.setItemCount(
            organizationsResponse?.payload?.data?.length || 0
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getOrganization(
    values: IgetOrganization,
    parameters?: IsingleGetParameters
  ) {
    await dispatch(getAllOrganizations()).then((organizationsResponse: any) => {
      if (
        organizationsResponse?.payload?.data &&
        organizationsResponse?.payload?.data?.find(
          (organization: any) =>
            organization?.organizationName === `org_${values?.organizationName}`
        )
      ) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              organization: organizationsResponse?.payload?.data?.find(
                (organization: any) =>
                  organization?.organizationName ===
                  `org_${values?.organizationName}`
              ),
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            organizationsResponse?.payload?.data?.find(
              (organization: any) =>
                organization?.organizationName ===
                `org_${values?.organizationName}`
            )
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getRoboticsClouds(
    values: IgetRoboticsClouds,
    parameters?: ImultipleGetParameters
  ) {
    dispatch(
      getRoboticsCloudsOfOrganization({
        organizationId: values?.organizationId,
      })
    ).then((responseRoboticsClouds: any) => {
      if (
        Array.isArray(responseRoboticsClouds?.payload?.data) &&
        responseRoboticsClouds?.payload?.data[0]?.roboticsClouds
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseRoboticsClouds?.payload?.data[0]?.roboticsClouds || []
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseRoboticsClouds?.payload?.data[0]?.roboticsClouds?.length ||
              0
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getRoboticsCloud(
    values: IgetRoboticsCloud,
    parameters?: IsingleGetParameters
  ) {
    dispatch(
      getRoboticsCloudsOfOrganization({
        organizationId: values?.organizationId,
      })
    ).then((responseRoboticsClouds: any) => {
      if (
        Array.isArray(responseRoboticsClouds?.payload?.data) &&
        responseRoboticsClouds?.payload?.data[0]?.roboticsClouds
      ) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              roboticsCloud:
                responseRoboticsClouds?.payload?.data[0]?.roboticsClouds?.find(
                  (roboticsCloud: any) =>
                    roboticsCloud?.name === values?.roboticsCloudName
                ) || {},
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            responseRoboticsClouds?.payload?.data[0]?.roboticsClouds?.find(
              (roboticsCloud: any) =>
                roboticsCloud?.name === values?.roboticsCloudName
            ) || {}
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getInstances(
    values: IgetInstances,
    parameters?: ImultipleGetParameters
  ) {
    dispatch(
      getAllInstances({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
      })
    ).then((responseInstances: any) => {
      if (
        Array.isArray(responseInstances?.payload?.data) &&
        Array.isArray(responseInstances?.payload?.data[0]?.roboticsClouds) &&
        responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseInstances?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances || []
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseInstances?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances?.length || 0
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getPhysicalInstances(
    values: IgetPhysicalInstances,
    parameters?: ImultipleGetParameters
  ) {
    dispatch(
      getAllPhysicalInstances({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      })
    ).then((responsePhysicalInstances: any) => {
      if (
        Array.isArray(responsePhysicalInstances?.payload?.data) &&
        Array.isArray(
          responsePhysicalInstances?.payload?.data[0]?.roboticsClouds
        ) &&
        Array.isArray(
          responsePhysicalInstances?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        responsePhysicalInstances?.payload?.data[0]?.roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchPhysicalInstances
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responsePhysicalInstances?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchPhysicalInstances || []
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responsePhysicalInstances?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchPhysicalInstances?.length || 0
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getInstance(
    values: IgetInstance,
    parameters?: IsingleGetParameters
  ) {
    dispatch(
      getAllInstances({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
      })
    ).then((responseInstances: any) => {
      if (
        Array.isArray(responseInstances?.payload?.data) &&
        Array.isArray(responseInstances?.payload?.data[0]?.roboticsClouds) &&
        responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
      ) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              instance:
                responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
                  (instance: any) => instance?.name === values?.instanceName
                ) || {},
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
              (instance: any) => instance?.name === values?.instanceName
            ) || {}
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getFleets(
    values: IgetFleets,
    parameters?: ImultipleGetParameters
  ) {
    dispatch(
      getFederatedFleets({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      })
    ).then((responseFederatedFleets: any) => {
      if (
        Array.isArray(responseFederatedFleets?.payload?.data) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds
        ) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        responseFederatedFleets?.payload?.data[0].roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedFleets
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedFleets || []
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedFleets?.length || 0
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getFleet(
    values: IgetFleet,
    parameters?: IsingleGetParameters
  ) {
    dispatch(
      getFederatedFleets({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      })
    ).then((responseFederatedFleets: any) => {
      if (
        Array.isArray(responseFederatedFleets?.payload?.data) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds
        ) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        responseFederatedFleets?.payload?.data[0].roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedFleets
      ) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              fleet:
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
                  (fleet: any) => fleet?.name === values?.fleetName
                ) || {},
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
              (fleet: any) => fleet?.name === values?.fleetName
            ) || {}
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getPhysicalFleet(
    values: IgetPhysicalFleet,
    parameters?: IsingleGetParameters
  ) {
    dispatch(
      getFederatedFleets({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      })
    ).then((responseFederatedFleets: any) => {
      if (
        Array.isArray(responseFederatedFleets?.payload?.data) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds
        ) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        //Change robolaunchFederatedFleets object
        responseFederatedFleets?.payload?.data[0].roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedFleets
      ) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              fleet:
                //Change robolaunchFederatedFleets object
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
                  (fleet: any) => fleet?.fleetName === values?.fleetName
                ) || {},
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            //Change robolaunchFederatedFleets object
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
              (fleet: any) => fleet?.fleetName === values?.fleetName
            ) || {}
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getRobots(
    values: IgetRobots,
    parameters?: ImultipleGetParameters
  ) {
    dispatch(
      getFederatedRobots({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
        fleetName: values?.fleetName,
      })
    ).then((responseRobots: any) => {
      if (
        Array.isArray(responseRobots?.payload?.data) &&
        Array.isArray(responseRobots?.payload?.data[0]?.roboticsClouds) &&
        Array.isArray(
          responseRobots?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
        ) &&
        responseRobots?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
          ?.robolaunchFederatedRobots
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseRobots?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedRobots || []
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseRobots?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedRobots?.length || 0
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getRobot(
    values: IgetRobot,
    parameters?: IsingleGetRobotParameters
  ) {
    dispatch(
      getFederatedRobot({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
        fleetName: values?.fleetName,
        robotName: values?.robotName,
      })
    ).then((responseFederatedRobot: any) => {
      if (
        Array.isArray(responseFederatedRobot?.payload?.data) &&
        Array.isArray(
          responseFederatedRobot?.payload?.data[0]?.roboticsClouds
        ) &&
        Array.isArray(
          responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        responseFederatedRobot?.payload?.data[0].roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedRobots
      ) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step1: {
                ...prevState.step1,
                robotName:
                  responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.name,
                isVirtualRobot: responseFederatedRobot?.payload?.data[0]
                  ?.roboticsClouds[0]?.cloudInstances[0]
                  ?.robolaunchFederatedRobots[0]?.physicalInstance
                  ? false
                  : true,
                physicalInstanceName:
                  responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.physicalInstance,
                robotStorage:
                  responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.storageAmount,
                isEnabledIde:
                  responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.ideEnabled,
                isEnabledROS2Bridge:
                  responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.bridgeEnabled,
                remoteDesktop: {
                  isEnabled:
                    responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.vdiEnabled,
                  sessionCount:
                    responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.vdiSessionCount,
                },
                rosDistros:
                  responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.distributions,
                gpuEnabledForCloudInstance:
                  responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.vdiGpuResource > 0
                    ? true
                    : false,
                isDevelopmentMode: false,
              },
              step2: {
                workspaces:
                  responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.robotWorkspaces,
              },
            };
          });

        parameters?.setResponse &&
          parameters?.setResponse(
            responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots?.find(
              (robot: any) => robot?.name === values?.robotName
            ) || {}
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getBuildManager(
    values: IgetBuildManager,
    parameters?: IsingleGetBuildParameters
  ) {
    dispatch(
      getRobotBuildManagers({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
        fleetName: values?.fleetName,
        robotName: values?.robotName,
      })
    ).then((responseRobotBuildManager: any) => {
      if (
        Array.isArray(responseRobotBuildManager?.payload?.data) &&
        Array.isArray(
          responseRobotBuildManager?.payload?.data[0]?.roboticsClouds
        ) &&
        Array.isArray(
          responseRobotBuildManager?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        Array.isArray(
          responseRobotBuildManager?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances[0]?.robolaunchFederatedRobots
        ) &&
        responseRobotBuildManager?.payload?.data[0]?.roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
      ) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step3: {
                buildManagerName:
                  responseRobotBuildManager?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.buildManagerName?.split(
                    "-"
                  )[0],
                robotBuildSteps:
                  responseRobotBuildManager?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.robotBuildSteps,
              },
            };
          });

        parameters?.setResponse &&
          parameters?.setResponse(
            responseRobotBuildManager?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedRobots[0] || {}
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getLaunchManagers(
    values: IgetLaunchManagers,
    parameters?: ImultipleGetLaunchParameters
  ) {
    dispatch(
      getRobotLaunchManagers({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
        fleetName: values?.fleetName,
        robotName: values?.robotName,
      })
    ).then((responseRobotLaunchManagers: any) => {
      if (
        responseRobotLaunchManagers?.payload?.data[0]?.roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.robotLaunchSteps
      ) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step4: {
                robotLaunchSteps:
                  responseRobotLaunchManagers?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.robotLaunchSteps?.map(
                    (launchStep: any) => {
                      return {
                        name: launchStep?.name,
                        workspace: launchStep?.workspace,
                        entryPointType: "custom",
                        entryPointCmd: launchStep?.entryPointCmd,
                        instancesName: launchStep?.robotClusters?.map(
                          (instance: any) => instance?.name
                        ),
                        robotLmEnvs: launchStep?.robotLmEnvs,
                      };
                    }
                  ),
              },
            };
          });

        parameters?.setResponse &&
          parameters?.setResponse(
            responseRobotLaunchManagers?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
              ?.robotLaunchSteps || []
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
      }
    });
  }

  function navigateTo404() {
    toast.error("The current page does not exist or is not available to you.");
    navigate("/404");
  }

  return (
    <FunctionsContext.Provider
      value={{
        getOrganizations,
        getOrganization,
        getRoboticsClouds,
        getRoboticsCloud,
        getInstances,
        getPhysicalInstances,
        getInstance,
        getFleets,
        getFleet,
        getPhysicalFleet,
        getRobots,
        getRobot,
        getBuildManager,
        getLaunchManagers,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
