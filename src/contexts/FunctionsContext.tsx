import {
  IgetEnvironments,
  IgetFleet,
  IgetFleets,
  IgetInstance,
  IgetInstances,
  IgetLaunchManagers,
  IgetNamespace,
  IgetNamespaces,
  IgetOrganization,
  IgetPhysicalFleet,
  IgetPhysicalInstance,
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
  getRobot as getRobotDispatch,
  getRobots as getRobotsDispatch,
  getBuildManagers as getBuildManagerDispatch,
  getLaunchManagers as getLaunchManagerDispatch,
  createRobot as createRobotDispatch,
  createBuildManager as createBuildManagerDispatch,
  getFilesFromFileManager as getFilesFromFileManagerDispatch,
} from "../toolkit/RobotSlice";
import {
  getFederatedFleets,
  getNamespaces as getNamespacesDispatch,
} from "../toolkit/FleetSlice";
import {
  IcreateDataScienceAppsRequest,
  IdeleteDataScienceAppsRequest,
  IgetEnvironmentRequest,
  IsingleGetEnviromentParameters,
} from "../interfaces/environmentInterfaces";
import {
  getEnvironments as getEnvironmentsDispatch,
  getEnvironment as getEnvironmentDispatch,
  createEnvironment as createEnvironmentDispatch,
  getDataScienceApps as getDataScienceAppsDispatch,
  createDataScienceApp as createDataScienceAppDispatch,
  deleteDataScienceApp as deleteDataScienceAppDispatch,
} from "../toolkit/EnvironmentSlice";
import { getRoboticsClouds as getRoboticsCloudDispatch } from "../toolkit/RoboticsCloudSlice";
import {
  getPhysicalInstances as getAllPhysicalInstances,
  addPhysicalInstanceToFleet as addPhysicalInstanceToFleetDispatch,
  getSystemStatus as getSystemStatusDispatch,
} from "../toolkit/InstanceSlice";
import { getOrganizations as getAllOrganizations } from "../toolkit/OrganizationSlice";
import { getInstances as getAllInstances } from "../toolkit/InstanceSlice";
import { getIP as getCurrentIP } from "../toolkit/TrialSlice";
import useCreateRobot from "../hooks/useCreateRobot";
import { useAppDispatch } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import useMain from "../hooks/useMain";
import { createContext } from "react";
import { toast } from "sonner";
import { orgNameViewer } from "../functions/GeneralFunctions";
import { INamespace } from "../interfaces/namespace.interface";
import {
  namespaceMapper,
  namespacesMapper,
} from "../handler/namespace.handler";
import { fleetMapper, fleetsMapper } from "../handler/fleet.handler";
import { orgMapper, orgsMapper } from "../handler/organization.handler";

export const FunctionsContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const dispatch = useAppDispatch();
  const {
    setTrialState,
    selectedState,
    setSelectedState,
    pagesState,
    setPagesState,
  } = useMain();
  const navigate = useNavigate();
  const { robotData, setRobotData } = useCreateRobot();

  async function getOrganizations(parameters?: ImultipleGetParameters) {
    await dispatch(getAllOrganizations()).then((resOrgs: any) => {
      const organizations = orgsMapper(resOrgs?.payload?.data);

      if (organizations) {
        parameters?.setResponse && parameters?.setResponse(organizations);
        parameters?.setItemCount &&
          parameters?.setItemCount(organizations?.length);
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getOrganization(
    values: IgetOrganization,
    parameters?: IsingleGetParameters,
  ) {
    await dispatch(getAllOrganizations()).then(async (resOrg: any) => {
      const organization = orgMapper(
        resOrg?.payload?.data,
        values?.organizationName,
      );

      if (organization) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              organization: organization,
            };
          });
        parameters?.setResponse &&
          (await parameters?.setResponse(organization));
        parameters?.setPages &&
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              organization: organization,
            };
          });
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getRoboticsClouds(
    values: IgetRoboticsClouds,
    parameters?: ImultipleGetParameters,
  ) {
    await dispatch(
      getRoboticsCloudDispatch({
        organizationId: values?.organizationId,
      }),
    ).then((responseRoboticsClouds: any) => {
      if (responseRoboticsClouds?.payload?.data?.[0]?.roboticsClouds) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseRoboticsClouds?.payload?.data[0]?.roboticsClouds || [],
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseRoboticsClouds?.payload?.data[0]?.roboticsClouds?.length ||
              0,
          );

        if (responseRoboticsClouds?.payload?.data?.length === 1) {
          parameters?.setFirstItemforTrial &&
            parameters?.setFirstItemforTrial(
              responseRoboticsClouds?.payload?.data[0]?.roboticsClouds[0],
            );
        } else {
          parameters?.setFirstItemforTrial &&
            parameters?.setFirstItemforTrial(null);
        }
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getRoboticsCloud(
    values: IgetRoboticsCloud,
    parameters?: IsingleGetParameters,
  ) {
    await dispatch(
      getRoboticsCloudDispatch({
        organizationId: values?.organizationId,
      }),
    ).then((responseRoboticsClouds: any) => {
      if (responseRoboticsClouds?.payload?.data?.[0]?.roboticsClouds) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              roboticsCloud:
                responseRoboticsClouds?.payload?.data[0]?.roboticsClouds?.find(
                  (roboticsCloud: any) =>
                    roboticsCloud?.name === values?.roboticsCloudName,
                ) || {},
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            responseRoboticsClouds?.payload?.data[0]?.roboticsClouds?.find(
              (roboticsCloud: any) =>
                roboticsCloud?.name === values?.roboticsCloudName,
            ) || {},
          );

        parameters?.setPages &&
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              roboticsCloud:
                responseRoboticsClouds?.payload?.data[0]?.roboticsClouds?.find(
                  (roboticsCloud: any) =>
                    roboticsCloud?.name === values?.roboticsCloudName,
                ) || {},
            };
          });

        if (
          parameters?.setPages &&
          pagesState?.roboticsCloud?.name !== values?.roboticsCloudName
        ) {
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              roboticsCloud:
                responseRoboticsClouds?.payload?.data[0]?.roboticsClouds?.find(
                  (roboticsCloud: any) =>
                    roboticsCloud?.name === values?.roboticsCloudName,
                ) || {},
            };
          });
        }
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getInstances(
    values: IgetInstances,
    parameters?: ImultipleGetParameters,
  ) {
    await dispatch(
      getAllInstances({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
        details: values?.details,
      }),
    ).then((responseInstances: any) => {
      const instances =
        responseInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances;

      if (instances) {
        parameters?.setResponse && parameters?.setResponse(instances || []);

        parameters?.setItemCount &&
          parameters?.setItemCount(instances?.length || 0);

        if (instances?.length === 1) {
          parameters?.setFirstItemforTrial &&
            parameters?.setFirstItemforTrial(instances?.[0]);
        } else {
          parameters?.setFirstItemforTrial &&
            parameters?.setFirstItemforTrial(null);
        }
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getPhysicalInstances(
    values: IgetPhysicalInstances,
    parameters?: ImultipleGetParameters,
  ) {
    await dispatch(
      getAllPhysicalInstances({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      }),
    ).then((responsePhysicalInstances: any) => {
      if (
        responsePhysicalInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchPhysicalInstances
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responsePhysicalInstances?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchPhysicalInstances || [],
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responsePhysicalInstances?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchPhysicalInstances?.length || 0,
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getPhysicalInstance(
    values: IgetPhysicalInstance,
    parameters?: ImultipleGetParameters,
  ) {
    await dispatch(
      getAllPhysicalInstances({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      }),
    ).then((responsePhysicalInstances: any) => {
      if (
        responsePhysicalInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchPhysicalInstances
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responsePhysicalInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchPhysicalInstances?.find(
              (physicalInstance: any) =>
                physicalInstance?.name === values?.physicalInstanceName,
            ) || {},
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getInstance(
    values: IgetInstance,
    parameters?: IsingleGetParameters,
  ) {
    await dispatch(
      getAllInstances({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
        details: values?.details,
      }),
    ).then(async (responseInstances: any) => {
      const instances =
        responseInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances;

      if (instances) {
        console.log("XXX", instances);
        parameters?.isSetState &&
          (await setSelectedState((prevState: any) => {
            return {
              ...prevState,
              instance:
                instances?.find(
                  (instance: any) => instance?.name === values?.instanceName,
                ) || {},
            };
          }));
        parameters?.setResponse &&
          (await parameters?.setResponse(
            instances?.find(
              (instance: any) => instance?.name === values?.instanceName,
            ) || {},
          ));

        parameters?.setPages &&
          (await setPagesState((prevState: any) => {
            return {
              ...prevState,
              instance:
                instances?.find(
                  (instance: any) => instance?.name === values?.instanceName,
                ) || {},
            };
          }));
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getFleets(
    values: IgetFleets,
    parameters?: ImultipleGetParameters,
  ) {
    await dispatch(
      getFederatedFleets({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      }),
    ).then((responseFederatedFleets: any) => {
      const fleets = fleetsMapper(
        responseFederatedFleets?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedFleets,
        responseFederatedFleets?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchPhysicalInstances,
      );

      if (fleets) {
        parameters?.setResponse && parameters?.setResponse(fleets);
        parameters?.setItemCount && parameters?.setItemCount(fleets?.length);
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getFleet(
    values: IgetFleet,
    parameters?: IsingleGetParameters,
  ) {
    await dispatch(
      getFederatedFleets({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      }),
    ).then((responseFederatedFleets: any) => {
      const fleet = fleetMapper(
        responseFederatedFleets?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedFleets,
        responseFederatedFleets?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchPhysicalInstances,
        values?.fleetName,
      );

      if (fleet) {
        parameters?.isSetState &&
          setSelectedState((prev) => {
            return {
              ...prev,
              fleet: fleet,
            };
          });
        parameters?.setResponse && parameters?.setResponse(fleet);

        parameters?.setPages &&
          setPagesState((prev) => {
            return {
              ...prev,
              fleet: fleet,
            };
          });
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getNamespaces(
    values: IgetNamespaces,
    parameters?: ImultipleGetParameters,
  ) {
    await dispatch(
      getNamespacesDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      }),
    ).then((resNS: any) => {
      const namespaces: INamespace[] = namespacesMapper(
        resNS?.payload?.data?.[0].roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.robolaunchNamespaces,
      );

      if (namespaces) {
        parameters?.setResponse && parameters?.setResponse(namespaces);
        parameters?.setItemCount && parameters?.setItemCount(namespaces.length);
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getNamespace(
    values: IgetNamespace,
    parameters?: IsingleGetParameters,
  ) {
    await dispatch(
      getNamespacesDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      }),
    ).then((resNS: any) => {
      const namespace = namespaceMapper(
        resNS?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
          ?.robolaunchNamespaces,
        values?.namespaceName,
      );

      if (namespace) {
        parameters?.isSetState &&
          setSelectedState((prev) => {
            return {
              ...prev,
              fleet: namespace,
            };
          });
        parameters?.setResponse && parameters?.setResponse(namespace);

        parameters?.setPages &&
          setPagesState((prev) => {
            return {
              ...prev,
              fleet: namespace,
            };
          });
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getPhysicalFleet(
    values: IgetPhysicalFleet,
    parameters?: IsingleGetParameters,
  ) {
    await dispatch(
      getFederatedFleets({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      }),
    ).then((responseFederatedFleets: any) => {
      if (
        responseFederatedFleets?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedFleets
      ) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              fleet:
                //Change robolaunchFederatedFleets object
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
                  (fleet: any) => fleet?.fleetName === values?.fleetName,
                ) || {},
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            //Change robolaunchFederatedFleets object
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
              (fleet: any) => fleet?.fleetName === values?.fleetName,
            ) || {},
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getRobots(
    values: IgetRobots,
    parameters?: ImultipleGetParameters,
  ) {
    await dispatch(
      getRobotsDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
        fleetName: values?.fleetName,
      }),
    ).then((responseRobots: any) => {
      if (
        responseRobots?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedRobots
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseRobots?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedRobots || [],
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseRobots?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedRobots?.length || 0,
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
    parameters?: IsingleGetRobotParameters,
  ) {
    await dispatch(
      getRobotDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
        fleetName: values?.fleetName,
        robotName: values?.robotName,
      }),
    ).then((responseRobot: any) => {
      if (
        responseRobot?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedRobots
      ) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step1: {
                ...prevState.step1,

                details: {
                  name: responseRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.name,
                  isVirtualRobot: responseRobot?.payload?.data[0]
                    ?.roboticsClouds[0]?.cloudInstances[0]
                    ?.robolaunchFederatedRobots[0]?.physicalInstance
                    ? false
                    : true,
                  isDevelopmentMode: false,
                  configureWorkspace: false,
                },
                tree: {
                  organization: {
                    id: selectedState?.organization?.id,
                    name: orgNameViewer(selectedState?.organization?.name!),
                  },
                  region: {
                    name: selectedState?.instance?.region,
                    code: selectedState?.instance?.region,
                  },
                  cloudInstance: {
                    id: selectedState?.instance?.instanceId,
                    name: selectedState?.instance?.name,
                    resources: {
                      cpu: {
                        coreTotal:
                          selectedState?.instance?.cloudInstanceResource
                            ?.cpuTotal,
                      },
                      gpu: {
                        coreTotal:
                          selectedState?.instance?.cloudInstanceResource?.gpuUsage
                            ?.map((gpu: any) => Number(gpu?.capacity))
                            .reduce((a: any, b: any) => a + b, 0),
                      },
                      memory: {
                        capacityTotal:
                          selectedState?.instance?.cloudInstanceResource
                            ?.memoryTotal,
                      },
                      storage: {
                        capacityTotal: 0,
                      },
                    },
                  },
                  physicalInstance: {
                    name: responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.physicalInstance,
                  },
                  namespace: {
                    name: selectedState?.fleet?.name,
                  },
                },

                resources: {
                  cpu: {
                    allocatedCore: 0,
                  },
                  gpu: {
                    enabledForCloudInstance:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.vdiGpuResource > 0
                        ? true
                        : false,
                    allocatedCore:
                      Number(
                        responseRobot?.payload?.data[0]?.roboticsClouds[0]
                          ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                          .ideGpuResource || 0,
                      ) +
                      Number(
                        responseRobot?.payload?.data[0]?.roboticsClouds[0]
                          ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                          .notebookGpuResource || 0,
                      ) +
                      Number(
                        responseRobot?.payload?.data[0]?.roboticsClouds[0]
                          ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                          .vdiGpuResource || 0,
                      ),
                  },
                  memory: {
                    allocatedCapacity: 0,
                  },
                  storage: {
                    allocatedCapacity: Number(
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        .storageAmount || 0,
                    ),
                  },
                },

                services: {
                  ros: {
                    isEnabled:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.bridgeEnabled,
                    rosDistros:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.distributions,
                    socketEndpoint:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.bridgeIngressEndpoint,
                    podName:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.bridgePodName,
                    log: responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.bridgeApplicationLog,
                  },
                  vdi: {
                    isEnabled:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.vdiEnabled,
                    socketEndpoint:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.vdiIngressEndpoint,
                    fileManagerEndpoint:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.vdiFileBrowserIngressEndpoint,
                    customPorts:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.vdiCustomPorts
                        ?.split("/")
                        ?.map((item: string) => {
                          return {
                            name: item?.split("-")[0],
                            port: item?.split("-")[1].split(":")[1],
                            backendPort: item?.split("-")[1].split(":")[0],
                          };
                        }) || [],
                    gpuAllocation:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.vdiGpuResource,
                    podName:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.vdiPodName,
                    sessionCount:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.vdiSessionCount,
                    log: responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                      ?.vdiApplicationLog,
                  },
                  ide: {
                    isEnabled:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.ideEnabled,
                    httpsEndpoint:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.ideIngressEndpoint,
                    fileManagerEndpoint:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.ideFileBrowserIngressEndpoint,
                    customPorts:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.ideCustomPorts
                        ?.split("/")
                        ?.map((item: string) => {
                          return {
                            name: item?.split("-")[0],
                            port: item?.split("-")[1].split(":")[1],
                            backendPort: item?.split("-")[1].split(":")[0],
                          };
                        }) || [],
                    gpuAllocation:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.ideGpuResource,
                    maxGpuAllocation: 0,
                    gpuModelName:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.ideGpuModelName,
                    podName:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                        ?.idePodName,
                    log: responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots?.[0]
                      ?.ideApplicationLog,
                  },
                  physicalIde: {
                    isEnabled: responseRobot?.payload?.data[0]
                      ?.roboticsClouds[0]?.cloudInstances[0]
                      ?.robolaunchFederatedRobots[0]?.physicalIdeIngressEndpoint
                      ? true
                      : false,
                    httpsEndpoint:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.physicalIdeIngressEndpoint,
                  },
                  jupyterNotebook: {
                    isEnabled:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.notebookEnabled,
                    httpsEndpoint:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.notebookIngressEndpoint,
                    fileManagerEndpoint:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.notebookFileBrowserIngressEndpoint,
                    gpuAllocation:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.notebookGpuResource,
                    customPorts:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.notebookCustomPorts
                        ?.split("/")
                        ?.map((item: string) => {
                          return {
                            name: item?.split("-")[0],
                            port: item?.split("-")[1].split(":")[1],
                            backendPort: item?.split("-")[1].split(":")[0],
                          };
                        }) || [],
                    podName:
                      responseRobot?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.notebookPodName,
                    log: responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.notebookApplicationLog,
                  },
                },
                directories: {
                  permittedDirectories:
                    responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.permittedDirectories,
                  persistentDirectories:
                    responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.persistentDirectories,
                  hostDirectories:
                    responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.hostDirectories
                      ?.split(",")
                      ?.map((item: string) => {
                        return {
                          hostDirectory: item?.split(":")[0],
                          mountPath: item?.split(":")[1],
                        };
                      }),
                },
                applicationConfig: {
                  domainName:
                    responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.domainName,
                  application:
                    responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.application,
                  devspace:
                    responseRobot?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.devspace,
                },

                clusters: {
                  environment:
                    responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots[0].robotClusters?.map(
                      (cluster: { name: string; robotStatus: string }) => {
                        return {
                          name: cluster.name,
                          status: cluster.robotStatus,
                        };
                      },
                    ),
                },
              },
              step2: {
                workspaces:
                  responseRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.robotWorkspaces,
              },
            };
          });

        parameters?.setResponse &&
          parameters?.setResponse(
            responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots?.find(
              (robot: any) => robot?.name === values?.robotName,
            ) || {},
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getBuildManager(parameters?: IsingleGetBuildParameters) {
    await dispatch(
      getBuildManagerDispatch({
        organizationId: robotData.step1.tree.organization.id,
        roboticsCloudName: robotData.step1.tree.region.name,
        instanceId: robotData.step1.tree.cloudInstance.id,
        region: robotData.step1.tree.region.code,
        fleetName: robotData.step1.tree.namespace.name,
        robotName: robotData?.step1?.details.name,
      }),
    ).then((responseRobotBuildManager: any) => {
      if (
        responseRobotBuildManager?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedRobots?.[0]
      ) {
        const robotBuild =
          responseRobotBuildManager?.payload?.data?.[0]?.roboticsClouds?.[0]
            ?.cloudInstances?.[0]?.robolaunchFederatedRobots?.[0];

        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step1: {
                ...prevState.step1,
                clusters: {
                  ...prevState.step1.clusters,
                  build:
                    robotBuild?.robotClusters?.map((cluster: any) => {
                      return {
                        name: cluster?.name,
                        status: cluster?.buildManagerStatus,
                      };
                    }) || [],
                },
              },
              step3: {
                name: robotBuild?.buildManagerName?.split("-")[0],
                steps:
                  robotBuild?.robotBuildSteps.map((step: any) => {
                    return {
                      workspace: step?.workspace,
                      name: step?.name,
                      command: step?.command,
                      isShellCode: step?.isCommandCode,
                      status: step?.buildStatus,
                      log: step?.buildLog,
                      instanceScope: step?.instancesName,
                    };
                  }) || [],
              },
            };
          });

        parameters?.setResponse &&
          parameters?.setResponse(
            responseRobotBuildManager?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedRobots[0] || {},
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step3: {
                buildManagerName: "",
                robotBuildSteps: [],
              },
            };
          });
      }
    });
  }

  async function getLaunchManagers(
    values: IgetLaunchManagers,
    parameters?: ImultipleGetLaunchParameters,
  ) {
    await dispatch(
      getLaunchManagerDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
        fleetName: values?.fleetName,
        robotName: values?.robotName,
      }),
    ).then((responseRobotLaunchManagers: any) => {
      if (
        responseRobotLaunchManagers?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedRobots?.[0]
          ?.robotLaunchSteps
      ) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            const robotLaunch =
              responseRobotLaunchManagers?.payload?.data[0]?.roboticsClouds[0]
                ?.cloudInstances[0]?.robolaunchFederatedRobots[0];

            return {
              ...prevState,

              step1: {
                ...prevState.step1,
                clusters: {
                  ...prevState.step1.clusters,
                  launch: robotLaunch?.robotLaunchSteps
                    .map((step: any) => step.robotClusters)
                    ?.reduce(
                      (acc: any, current: any) => acc.concat(current),
                      [],
                    )
                    .map((cluster: any) => {
                      return {
                        name: cluster.name,
                        status: cluster.launchManagerStatus,
                        log: cluster.launchManagerLog,
                      };
                    }),
                },
              },

              step4: {
                robotLaunchSteps: robotLaunch?.robotLaunchSteps?.map(
                  (launchStep: any) => {
                    return {
                      name: launchStep?.name,
                      workspace: launchStep?.workspace,
                      entryPointType: "custom",
                      entryPointCmd: launchStep?.entryPointCmd,
                      instancesName: launchStep?.robotClusters?.map(
                        (instance: any) => instance?.name,
                      ),
                      robotLmEnvs: launchStep?.robotLmEnvs,
                    };
                  },
                ),
              },
            };
          });

        parameters?.setResponse &&
          parameters?.setResponse(
            responseRobotLaunchManagers?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
              ?.robotLaunchSteps || [],
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step4: {
                robotLaunchSteps: [],
              },
            };
          });
      }
    });
  }

  async function getEnvironments(
    values: IgetEnvironments,
    parameters?: ImultipleGetParameters,
  ) {
    await dispatch(
      getEnvironmentsDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
        instanceId: values?.instanceId,
        fleetName: values?.fleetName,
      }),
    ).then((responseEnvironments: any) => {
      if (
        responseEnvironments?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.environments
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseEnvironments?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.environments || [],
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseEnvironments?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.environments?.length || 0,
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getEnvironment(
    values: IgetEnvironmentRequest,
    parameters?: IsingleGetEnviromentParameters,
  ) {
    await dispatch(
      getEnvironmentDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
        instanceId: values?.instanceId,
        fleetName: values?.fleetName,
        environmentName: values?.environmentName,
      }),
    ).then((responseEnvironment: any) => {
      if (
        responseEnvironment?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.environments
      ) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step1: {
                ...prevState.step1,
                details: {
                  name: responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.name,
                  isVirtualRobot: responseEnvironment?.payload?.data[0]
                    ?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]
                    ?.physicalInstance
                    ? false
                    : true,
                  isDevelopmentMode: false,
                  configureWorkspace: false,
                },
                tree: {
                  organization: {
                    id: selectedState?.organization?.id,
                    name: orgNameViewer(selectedState?.organization?.name!),
                  },
                  region: {
                    name: selectedState?.instance?.region,
                  },
                  cloudInstance: {
                    id: selectedState?.instance?.instanceId,
                    name: selectedState?.instance?.name,
                    resources: {
                      cpu: {
                        coreTotal:
                          selectedState?.instance?.cloudInstanceResource
                            ?.cpuTotal,
                      },
                      gpu: {
                        coreTotal:
                          selectedState?.instance?.cloudInstanceResource?.gpuUsage
                            ?.map((gpu: any) => Number(gpu?.capacity))
                            .reduce((a: any, b: any) => a + b, 0),
                      },
                      memory: {
                        capacityTotal:
                          selectedState?.instance?.cloudInstanceResource
                            ?.memoryTotal,
                      },
                      storage: {
                        capacityTotal: 0,
                      },
                    },
                  },
                  physicalInstance: {
                    name: responseEnvironment?.payload?.data[0]
                      ?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]
                      ?.physicalInstance,
                  },
                  namespace: {
                    name: selectedState?.fleet?.name,
                  },
                },
                resources: {
                  cpu: {
                    allocatedCore: 0,
                  },
                  gpu: {
                    enabledForCloudInstance:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]?.vdiGpuResource > 0
                        ? true
                        : false,
                    allocatedCore:
                      Number(
                        responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                          ?.cloudInstances[0]?.environments[0].ideGpuResource ||
                          0,
                      ) +
                      Number(
                        responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                          ?.cloudInstances[0]?.environments[0]
                          .notebookGpuResource || 0,
                      ) +
                      Number(
                        responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                          ?.cloudInstances[0]?.environments[0].vdiGpuResource ||
                          0,
                      ),
                  },
                  memory: {
                    allocatedCapacity: 0,
                  },
                  storage: {
                    allocatedCapacity: Number(
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0].storageAmount || 0,
                    ),
                  },
                },
                services: {
                  ros: {
                    isEnabled:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]?.bridgeEnabled,
                    rosDistros:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]?.distributions,
                    socketEndpoint:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]
                        ?.bridgeIngressEndpoint,
                    podName:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]?.bridgePodName,
                    log: responseEnvironment?.payload?.data[0]
                      ?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]
                      ?.bridgeApplicationLog,
                  },
                  vdi: {
                    isEnabled:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]?.vdiEnabled,
                    socketEndpoint:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]
                        ?.vdiIngressEndpoint,
                    fileManagerEndpoint:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]
                        ?.vdiFileBrowserIngressEndpoint,
                    customPorts:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]?.vdiCustomPorts
                        ?.split("/")
                        ?.map((item: string) => {
                          return {
                            name: item?.split("-")[0],
                            port: item?.split("-")[1].split(":")[1],
                            backendPort: item?.split("-")[1].split(":")[0],
                          };
                        }) || [],
                    gpuAllocation:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]?.vdiGpuResource,
                    podName:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]?.vdiPodName,
                    sessionCount:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]?.vdiSessionCount,
                    log: responseEnvironment?.payload?.data[0]
                      ?.roboticsClouds[0]?.cloudInstances[0]?.environments?.[0]
                      ?.vdiApplicationLog,
                  },
                  ide: {
                    isEnabled:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]?.ideEnabled,
                    httpsEndpoint:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]
                        ?.ideIngressEndpoint,
                    fileManagerEndpoint:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]
                        ?.ideFileBrowserIngressEndpoint,
                    customPorts:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]?.ideCustomPorts
                        ?.split("/")
                        ?.map((item: string) => {
                          return {
                            name: item?.split("-")[0],
                            port: item?.split("-")[1].split(":")[1],
                            backendPort: item?.split("-")[1].split(":")[0],
                          };
                        }) || [],
                    gpuAllocation:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]?.ideGpuResource,
                    maxGpuAllocation: 0,
                    gpuModelName:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]?.ideGpuModelName,
                    podName:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments?.[0]?.idePodName,
                    log: responseEnvironment?.payload?.data[0]
                      ?.roboticsClouds[0]?.cloudInstances[0]?.environments?.[0]
                      ?.ideApplicationLog,
                  },
                  physicalIde: {
                    isEnabled: responseEnvironment?.payload?.data[0]
                      ?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]
                      ?.physicalIdeIngressEndpoint
                      ? true
                      : false,
                    httpsEndpoint:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]
                        ?.physicalIdeIngressEndpoint,
                  },
                  jupyterNotebook: {
                    isEnabled:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]?.notebookEnabled,
                    httpsEndpoint:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]
                        ?.notebookIngressEndpoint,
                    fileManagerEndpoint:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]
                        ?.notebookFileBrowserIngressEndpoint,
                    gpuAllocation:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]
                        ?.notebookGpuResource,
                    customPorts:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]?.notebookCustomPorts
                        ?.split("/")
                        ?.map((item: string) => {
                          return {
                            name: item?.split("-")[0],
                            port: item?.split("-")[1].split(":")[1],
                            backendPort: item?.split("-")[1].split(":")[0],
                          };
                        }) || [],
                    podName:
                      responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.environments[0]?.notebookPodName,
                    log: responseEnvironment?.payload?.data[0]
                      ?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]
                      ?.notebookApplicationLog,
                  },
                },
                directories: {
                  permittedDirectories:
                    responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.environments[0]
                      ?.permittedDirectories,
                  persistentDirectories:
                    responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.environments[0]
                      ?.persistentDirectories,
                  hostDirectories:
                    responseEnvironment?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]?.hostDirectories
                      ?.split(",")
                      ?.map((item: string) => {
                        return {
                          hostDirectory: item?.split(":")[0],
                          mountPath: item?.split(":")[1],
                        };
                      }),
                },
                applicationConfig: {
                  domainName:
                    responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.environments[0]?.domainName,
                  application:
                    responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.environments[0]?.application,
                  devspace:
                    responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.environments[0]?.devspace,
                },

                clusters: {
                  environment:
                    responseEnvironment?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.environments[0].robotClusters?.map(
                      (cluster: { name: string; robotStatus: string }) => {
                        return {
                          name: cluster.name,
                          status: cluster.robotStatus,
                        };
                      },
                    ),
                },
              },
              step2: {
                workspaces:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.robotWorkspaces || [],
              },
            };
          });

        parameters?.setResponse &&
          parameters?.setResponse(
            responseEnvironment?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.environments?.find(
              (robot: any) => robot?.name === values?.environmentName,
            ) || {},
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  function addPhysicalInstanceToFleet() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          addPhysicalInstanceToFleetDispatch({
            organizationId: selectedState?.organization?.id,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.roboticsCloud?.region,
            robolaunchFederatedFleetsName: selectedState?.fleet?.name,
            robolaunchPhysicalInstancesName:
              robotData.step1.tree.physicalInstance.name,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function getSystemStatus() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          getSystemStatusDispatch({
            organizationId: pagesState?.organization?.id!,
            instanceId: pagesState?.instance?.instanceId!,
            region: pagesState?.roboticsCloud?.region!,
            roboticsCloudName: pagesState?.roboticsCloud?.name!,
          }),
        ).then((res: any) => {
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              instance: {
                ...prevState.instance,
                systemStatus:
                  res?.payload?.data?.[0]?.roboticsClouds?.[0]
                    ?.cloudInstances?.[0]?.robolaunchPods,
              },
            };
          });
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function createRobot() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createRobotDispatch({
            organizationId: selectedState?.organization?.id!,
            region: selectedState?.roboticsCloud?.region!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.instanceId!,
            fleetName: selectedState?.fleet?.name!,
            robotName: robotData?.step1?.details.name,
            physicalInstanceName: robotData?.step1?.details.isVirtualRobot
              ? undefined
              : robotData?.step1?.tree.physicalInstance.name,
            distributions: robotData?.step1?.services.ros.rosDistros,
            bridgeEnabled: robotData?.step1?.services.ros.isEnabled,
            vdiEnabled: robotData?.step1?.services.vdi?.isEnabled,
            vdiSessionCount: robotData?.step1?.services.vdi?.sessionCount,
            ideEnabled: robotData?.step1?.services.ide?.isEnabled,
            storageAmount:
              robotData?.step1?.resources.storage.allocatedCapacity,
            gpuEnabledForCloudInstance:
              robotData?.step1?.resources.gpu.enabledForCloudInstance,
            workspaces: robotData.step2.workspaces,
            permittedDirectories:
              robotData?.step1?.directories.permittedDirectories,
            persistentDirectories:
              robotData?.step1?.directories.persistentDirectories,
            hostDirectories:
              robotData?.step1?.directories.hostDirectories
                ?.map((directory) => {
                  return `${directory.hostDirectory}:${directory.mountPath}`;
                })
                ?.join(",") || "",
            ideCustomPorts:
              robotData.step1.services.ide.customPorts
                ?.map((port) => {
                  return `${port.name}-${port.backendPort}:${port.port}`;
                })
                ?.join("/") || "",
            vdiCustomPorts:
              robotData.step1.services.vdi.customPorts
                ?.map((port) => {
                  return `${port.name}-${port.backendPort}:${port.port}`;
                })
                ?.join("/") || "",
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function createEnvironment(withoutWorkspaces: boolean) {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createEnvironmentDispatch({
            organizationId: selectedState?.organization?.id!,
            region: selectedState?.roboticsCloud?.region!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.instanceId!,
            fleetName: selectedState?.fleet?.name!,
            environmentName: robotData?.step1?.details.name,
            storageAmount:
              robotData?.step1?.resources.storage.allocatedCapacity,
            vdiSessionCount: robotData?.step1?.services.vdi?.sessionCount,
            domainName: robotData?.step1?.applicationConfig.domainName,
            ideGpuResource: robotData?.step1?.services.ide.gpuAllocation,
            ideGpuResourceType: robotData?.step1?.services.ide.gpuModelName,
            applicationName:
              robotData?.step1?.applicationConfig.application?.name,
            applicationVersion:
              robotData?.step1?.applicationConfig.application?.version,
            devspaceUbuntuDistro:
              robotData?.step1?.applicationConfig.devspace?.ubuntuDistro,
            devspaceDesktop:
              robotData?.step1?.applicationConfig.devspace?.desktop,
            devspaceVersion:
              robotData?.step1?.applicationConfig.devspace?.version,
            workspaces: withoutWorkspaces ? null : robotData?.step2.workspaces,
            permittedDirectories:
              robotData?.step1?.directories.permittedDirectories,
            persistentDirectories:
              robotData?.step1?.directories.persistentDirectories,
            hostDirectories:
              robotData?.step1?.directories.hostDirectories
                ?.map((directory) => {
                  return `${directory.hostDirectory}:${directory.mountPath}`;
                })
                ?.join(",") || "",
            ideCustomPorts:
              robotData.step1.services.ide.customPorts
                ?.map((port) => {
                  return `${port.name}-${port.backendPort}:${port.port}`;
                })
                ?.join("/") || "",
            vdiCustomPorts:
              robotData.step1.services.vdi.customPorts
                ?.map((port) => {
                  return `${port.name}-${port.backendPort}:${port.port}`;
                })
                ?.join("/") || "",

            notebookEnabled:
              robotData?.step1?.services.jupyterNotebook?.isEnabled,
            notebookGpuResource:
              robotData?.step1?.services.jupyterNotebook?.gpuAllocation,
            notebookCustomPorts:
              robotData.step1.services.jupyterNotebook?.customPorts
                ?.map((port) => {
                  return `${port.name}-${port.backendPort}:${port.port}`;
                })
                ?.join("/") || "",
          }),
        );

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function createBuildManager() {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createBuildManagerDispatch({
            organizationId: robotData.step1.tree.organization.id,
            roboticsCloudName: robotData.step1.tree.region.name,
            instanceId: robotData.step1.tree.cloudInstance.id,
            region: robotData.step1.tree.region.code,
            robotName: robotData?.step1?.details?.name,
            fleetName: robotData.step1.tree.namespace.name,
            physicalInstanceName: robotData?.step1?.tree.physicalInstance.name,
            buildManagerName: robotData.step3.name,
            robotBuildSteps: robotData.step3.steps,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function deleteDataScienceApp(values: IdeleteDataScienceAppsRequest) {
    await dispatch(
      deleteDataScienceAppDispatch({
        organizationId: selectedState.organization?.id!,
        roboticsCloudName: selectedState.roboticsCloud?.name!,
        region: selectedState.instance?.region!,
        instanceId: selectedState.instance?.instanceId!,
        fleetName: selectedState.fleet?.name!,
        applicationName: values.applicationName,
        applicationType: values.applicationName,
      }),
    );
  }

  async function createDataScienceApp(values: IcreateDataScienceAppsRequest) {
    await dispatch(
      createDataScienceAppDispatch({
        organizationId: selectedState.organization?.id!,
        roboticsCloudName: selectedState.roboticsCloud?.name!,
        region: selectedState.instance?.region!,
        instanceId: selectedState.instance?.instanceId!,
        fleetName: selectedState.fleet?.name!,
        applicationName: values.applicationName,
        applicationType: values.applicationName,
      }),
    );
  }

  async function getDataScienceApps(parameters?: ImultipleGetParameters) {
    await dispatch(
      getDataScienceAppsDispatch({
        organizationId: selectedState.organization?.id!,
        roboticsCloudName: selectedState.roboticsCloud?.name!,
        region: selectedState.instance?.region!,
        instanceId: selectedState.instance?.instanceId!,
        fleetName: selectedState.fleet?.name!,
      }),
    ).then((responseApps: any) => {
      const apps =
        responseApps?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.environments;

      if (apps) {
        parameters?.setResponse && parameters?.setResponse(apps || []);

        parameters?.setItemCount && parameters?.setItemCount(apps?.length || 0);
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse([]);
        parameters?.setItemCount && parameters?.setItemCount(0);
      }
    });
  }

  async function getIP() {
    await dispatch(getCurrentIP()).then((response: any) => {
      setTrialState((prevState: any) => {
        return {
          ...prevState,
          ip: response?.payload?.ip,
        };
      });
    });
  }

  async function getFilesFromFileManager(values: {
    instanceIP: string;
    paths?: string[];
  }): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await dispatch(
          getFilesFromFileManagerDispatch({
            instanceIP: values.instanceIP,
            paths: values.paths,
          }),
        );

        resolve({
          items: response?.payload?.items || [],
        });
      } catch (error) {
        reject(error);
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
        getPhysicalInstance,
        getInstance,
        getFleets,
        getFleet,
        getNamespaces,
        getNamespace,
        getPhysicalFleet,
        getRobots,
        getRobot,
        getBuildManager,
        getLaunchManagers,
        getEnvironments,
        getEnvironment,
        addPhysicalInstanceToFleet,
        getSystemStatus,
        createRobot,
        createEnvironment,
        createBuildManager,
        createDataScienceApp,
        deleteDataScienceApp,
        getDataScienceApps,
        getIP,
        getFilesFromFileManager,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
