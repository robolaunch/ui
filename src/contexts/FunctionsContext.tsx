import {
  IgetBuildManager,
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
  getFiles as getFilesDispatch,
} from "../toolkit/RobotSlice";
import {
  getFederatedFleets,
  createFederatedFleet,
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
import { ISelectedState } from "../interfaces/mainInterfaces";
import useCreateRobot from "../hooks/useCreateRobot";
import { useAppDispatch } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import useMain from "../hooks/useMain";
import { createContext } from "react";
import { toast } from "sonner";
import { orgNameViewer } from "../functions/GeneralFunctions";

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
    await dispatch(getAllOrganizations()).then((organizationsResponse: any) => {
      if (organizationsResponse?.payload?.data) {
        parameters?.setResponse &&
          parameters?.setResponse(organizationsResponse?.payload?.data || []);

        parameters?.setItemCount &&
          parameters?.setItemCount(
            organizationsResponse?.payload?.data?.length || 0,
          );

        if (organizationsResponse?.payload?.data?.length === 1) {
          parameters?.setFirstItemforTrial &&
            parameters?.setFirstItemforTrial(
              organizationsResponse?.payload?.data[0],
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

  async function getOrganization(
    values: IgetOrganization,
    parameters?: IsingleGetParameters,
  ) {
    await dispatch(getAllOrganizations()).then(
      async (organizationsResponse: any) => {
        if (
          organizationsResponse?.payload?.data &&
          organizationsResponse?.payload?.data?.find(
            (organization: any) =>
              organization?.organizationName ===
              `org_${values?.organizationName}`,
          )
        ) {
          parameters?.isSetState &&
            setSelectedState((prevState: any) => {
              return {
                ...prevState,
                organization: organizationsResponse?.payload?.data?.find(
                  (organization: any) =>
                    organization?.organizationName ===
                    `org_${values?.organizationName}`,
                ),
              };
            });
          parameters?.setResponse &&
            (await parameters?.setResponse(
              organizationsResponse?.payload?.data?.find(
                (organization: any) =>
                  organization?.organizationName ===
                  `org_${values?.organizationName}`,
              ),
            ));
          parameters?.setPages &&
            setPagesState((prevState: any) => {
              return {
                ...prevState,
                organization: organizationsResponse?.payload?.data?.find(
                  (organization: any) =>
                    organization?.organizationName ===
                    `org_${values?.organizationName}`,
                ),
              };
            });
        } else {
          parameters?.ifErrorNavigateTo404 && navigateTo404();
          parameters?.setResponse && parameters?.setResponse({});
        }
      },
    );
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
      if (
        responseInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseInstances?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances || [],
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseInstances?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances?.length || 0,
          );

        if (
          responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
            ?.length === 1
        ) {
          parameters?.setFirstItemforTrial &&
            parameters?.setFirstItemforTrial(
              responseInstances?.payload?.data[0]?.roboticsClouds[0]
                ?.cloudInstances[0],
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
      if (
        responseInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances
      ) {
        parameters?.isSetState &&
          (await setSelectedState((prevState: any) => {
            return {
              ...prevState,
              instance:
                responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
                  (instance: any) => instance?.name === values?.instanceName,
                ) || {},
            };
          }));
        parameters?.setResponse &&
          (await parameters?.setResponse(
            responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
              (instance: any) => instance?.name === values?.instanceName,
            ) || {},
          ));

        parameters?.setPages &&
          (await setPagesState((prevState: any) => {
            return {
              ...prevState,
              instance:
                responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
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
      if (
        responseFederatedFleets?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedFleets
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedFleets || [],
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedFleets?.length || 0,
          );

        if (parameters?.setFirstItemforTrial) {
          if (
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedFleets?.length === 1
          ) {
            parameters?.setFirstItemforTrial(
              responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
                ?.cloudInstances[0]?.robolaunchFederatedFleets[0],
            );
          } else if (
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedFleets?.length === 0
          ) {
            dispatch(
              createFederatedFleet({
                organizationId: values?.organizationId,
                roboticsCloudName: values?.roboticsCloudName,
                region: values?.region,
                instanceId: values?.instanceId,
                robolaunchFederatedFleetsName: "trial-fleet",
              }),
            );
            parameters?.setFirstItemforTrial(null);
          } else {
            parameters?.setFirstItemforTrial(null);
          }
        }
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
      if (
        responseFederatedFleets?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedFleets
      ) {
        parameters?.isSetState &&
          setSelectedState((prevState: ISelectedState) => {
            return {
              ...prevState,
              fleet:
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
                  (fleet: any) => fleet?.name === values?.fleetName,
                ) || {},
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
              (fleet: any) => fleet?.name === values?.fleetName,
            ) || {},
          );

        parameters?.setPages &&
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              fleet:
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
                  (fleet: any) => fleet?.name === values?.fleetName,
                ) || {},
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
    ).then((responseNamespaces: any) => {
      if (
        responseNamespaces?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchNamespaces
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchNamespaces || [],
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchNamespaces?.length || 0,
          );

        if (parameters?.setFirstItemforTrial) {
          if (
            responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchNamespaces?.length === 1
          ) {
            parameters?.setFirstItemforTrial(
              responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
                ?.cloudInstances[0]?.robolaunchNamespaces[0],
            );
          } else if (
            responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchNamespaces?.length === 0
          ) {
            dispatch(
              createFederatedFleet({
                organizationId: values?.organizationId,
                roboticsCloudName: values?.roboticsCloudName,
                region: values?.region,
                instanceId: values?.instanceId,
                robolaunchFederatedFleetsName: "trial-fleet",
              }),
            );
            parameters?.setFirstItemforTrial(null);
          } else {
            parameters?.setFirstItemforTrial(null);
          }
        }
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
    ).then((responseFederatedFleets: any) => {
      if (
        Array.isArray(responseFederatedFleets?.payload?.data) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds,
        ) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances,
        ) &&
        responseFederatedFleets?.payload?.data[0].roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchNamespaces
      ) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              fleet:
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchNamespaces?.find(
                  (fleet: any) => fleet?.name === values?.namespaceName,
                ) || {},
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchNamespaces?.find(
              (fleet: any) => fleet?.name === values?.namespaceName,
            ) || {},
          );

        parameters?.setPages &&
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              fleet:
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchNamespaces?.find(
                  (fleet: any) => fleet?.name === values?.namespaceName,
                ) || {},
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
    ).then((responseFederatedRobot: any) => {
      if (
        responseFederatedRobot?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedRobots
      ) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step1: {
                ...prevState.step1,
                organization: {
                  id: selectedState?.organization?.organizationId,
                  name: orgNameViewer(
                    selectedState?.organization?.organizationName!,
                  ),
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
                          ?.map(
                            (gpu: any) =>
                              Number(gpu?.allocated) + Number(gpu?.capacity),
                          )
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
                namespace: {
                  name: selectedState?.fleet?.name,
                },

                resources: {
                  cpu: {
                    allocatedCore: 0,
                  },
                  gpu: {
                    allocatedCore:
                      Number(
                        responseFederatedRobot?.payload?.data[0]
                          ?.roboticsClouds[0]?.cloudInstances[0]
                          ?.robolaunchFederatedRobots[0].ideGpuResource || 0,
                      ) +
                      Number(
                        responseFederatedRobot?.payload?.data[0]
                          ?.roboticsClouds[0]?.cloudInstances[0]
                          ?.robolaunchFederatedRobots[0].notebookGpuResource ||
                          0,
                      ) +
                      Number(
                        responseFederatedRobot?.payload?.data[0]
                          ?.roboticsClouds[0]?.cloudInstances[0]
                          ?.robolaunchFederatedRobots[0].vdiGpuResource || 0,
                      ),
                  },
                  memory: {
                    allocatedCapacity: 0,
                  },
                  storage: {
                    allocatedCapacity: Number(
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots[0].storageAmount || 0,
                    ),
                  },
                },

                services: {
                  vdi: {
                    isEnabled:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.vdiEnabled,
                    socketEndpoint:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.vdiIngressEndpoint,
                    fileManagerEndpoint:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]
                        ?.vdiFileBrowserIngressEndpoint,
                    gpuAllocation:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.vdiGpuResource,
                    podName:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.vdiPodName,
                    sessionCount:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.vdiSessionCount,
                    log: responseFederatedRobot?.payload?.data[0]
                      ?.roboticsClouds[0]?.cloudInstances[0]
                      ?.robolaunchFederatedRobots?.[0]?.vdiApplicationLog,
                  },
                  ide: {
                    isEnabled:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.ideEnabled,
                    httpsEndpoint:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.ideIngressEndpoint,
                    fileManagerEndpoint:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]
                        ?.ideFileBrowserIngressEndpoint,
                    gpuAllocation:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.ideGpuResource,
                    gpuModelName:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.ideGpuModelName,
                    podName:
                      responseFederatedRobot?.payload?.data[0]
                        ?.roboticsClouds[0]?.cloudInstances[0]
                        ?.robolaunchFederatedRobots?.[0]?.idePodName,
                    log: responseFederatedRobot?.payload?.data[0]
                      ?.roboticsClouds[0]?.cloudInstances[0]
                      ?.robolaunchFederatedRobots?.[0]?.ideApplicationLog,
                  },
                },
                name: responseFederatedRobot?.payload?.data[0]
                  ?.roboticsClouds[0]?.cloudInstances[0]
                  ?.robolaunchFederatedRobots[0]?.name,
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
                    responseFederatedRobot?.payload?.data?.[0]
                      ?.roboticsClouds?.[0]?.cloudInstances?.[0]
                      ?.robolaunchFederatedRobots?.[0]?.vdiSessionCount,
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
                vdiPodName:
                  responseFederatedRobot?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.vdiPodName,
                idePodName:
                  responseFederatedRobot?.payload?.data?.[0]
                    ?.roboticsClouds?.[0]?.cloudInstances?.[0]
                    ?.robolaunchFederatedRobots?.[0]?.idePodName,
                permittedDirectories:
                  responseFederatedRobot?.payload?.data?.[0]
                    ?.roboticsClouds?.[0]?.cloudInstances?.[0]
                    ?.robolaunchFederatedRobots?.[0]?.permittedDirectories,
                persistentDirectories:
                  responseFederatedRobot?.payload?.data?.[0]
                    ?.roboticsClouds?.[0]?.cloudInstances?.[0]
                    ?.robolaunchFederatedRobots?.[0]?.persistentDirectories,
                hostDirectories:
                  responseFederatedRobot?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]?.robolaunchFederatedRobots?.[0]?.hostDirectories
                    ?.split(",")
                    ?.map((item: string) => {
                      return {
                        hostDirectory: item?.split(":")[0],
                        mountPath: item?.split(":")[1],
                      };
                    }),
                ideCustomPorts:
                  responseFederatedRobot?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]?.robolaunchFederatedRobots?.[0]?.ideCustomPorts
                    ?.split("/")
                    ?.map((item: string) => {
                      return {
                        name: item?.split("-")?.[0],
                        port: item?.split("-")?.[1].split(":")?.[1],
                        backendPort: item?.split("-")?.[1].split(":")?.[0],
                      };
                    }),
                vdiCustomPorts:
                  responseFederatedRobot?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]?.robolaunchFederatedRobots?.[0]?.vdiCustomPorts
                    ?.split("/")
                    ?.map((item: string) => {
                      return {
                        name: item?.split("-")?.[0],
                        port: item?.split("-")?.[1].split(":")?.[1],
                        backendPort: item?.split("-")?.[1].split(":")?.[0],
                      };
                    }),
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
              (robot: any) => robot?.name === values?.robotName,
            ) || {},
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function getBuildManager(
    values: IgetBuildManager,
    parameters?: IsingleGetBuildParameters,
  ) {
    await dispatch(
      getBuildManagerDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
        fleetName: values?.fleetName,
        robotName: values?.robotName,
      }),
    ).then((responseRobotBuildManager: any) => {
      if (
        responseRobotBuildManager?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.robolaunchFederatedRobots?.[0]
      ) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step3: {
                buildManagerName:
                  responseRobotBuildManager?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.buildManagerName?.split(
                    "-",
                  )[0],
                robotBuildSteps:
                  responseRobotBuildManager?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.robotBuildSteps || [],
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
                organization: {
                  id: selectedState?.organization?.organizationId,
                  name: orgNameViewer(
                    selectedState?.organization?.organizationName!,
                  ),
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
                          ?.map(
                            (gpu: any) =>
                              Number(gpu?.allocated) + Number(gpu?.capacity),
                          )
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
                namespace: {
                  name: selectedState?.fleet?.name,
                },

                resources: {
                  cpu: {
                    allocatedCore: 0,
                  },
                  gpu: {
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
                        }),
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
                        }),
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
                        }),
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

                name: responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                  ?.cloudInstances[0]?.environments[0]?.name,
                isVirtualRobot: responseEnvironment?.payload?.data[0]
                  ?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]
                  ?.physicalInstance
                  ? false
                  : true,
                physicalInstanceName:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.physicalInstance,
                isEnabledROS2Bridge:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.bridgeEnabled,
                rosDistros:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.distributions,
                gpuEnabledForCloudInstance:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.vdiGpuResource > 0
                    ? true
                    : false,
                isDevelopmentMode: false,
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
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.roboticsCloud?.region,
            robolaunchFederatedFleetsName: selectedState?.fleet?.name,
            robolaunchPhysicalInstancesName:
              robotData.step1.physicalInstanceName,
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
            organizationId: pagesState?.organization?.organizationId!,
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
            organizationId: selectedState?.organization?.organizationId!,
            region: selectedState?.roboticsCloud?.region!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.instanceId!,
            fleetName: selectedState?.fleet?.name,
            robotName: robotData?.step1?.name,
            physicalInstanceName: robotData?.step1?.isVirtualRobot
              ? undefined
              : robotData?.step1?.physicalInstanceName,
            distributions: robotData?.step1?.rosDistros,
            bridgeEnabled: robotData?.step1?.isEnabledROS2Bridge,
            vdiEnabled: robotData?.step1?.services.vdi?.isEnabled,
            vdiSessionCount: robotData?.step1?.services.vdi?.sessionCount,
            ideEnabled: robotData?.step1?.services.ide?.isEnabled,
            storageAmount:
              robotData?.step1?.resources.storage.allocatedCapacity,
            gpuEnabledForCloudInstance:
              robotData?.step1?.gpuEnabledForCloudInstance,
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
            organizationId: selectedState?.organization?.organizationId!,
            region: selectedState?.roboticsCloud?.region!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.instanceId!,
            fleetName: selectedState?.fleet?.name,
            environmentName: robotData?.step1?.name,
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

  async function createBuildManager() {
    await dispatch(
      createBuildManagerDispatch({
        organizationId: selectedState?.organization?.organizationId!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.instance?.region!,
        robotName: robotData?.step1?.name,
        fleetName: selectedState?.fleet?.name,
        physicalInstanceName: robotData?.step1?.physicalInstanceName,
        buildManagerName: robotData?.step3?.buildManagerName,
        robotBuildSteps: robotData?.step3?.robotBuildSteps,
      }),
    );
  }

  async function deleteDataScienceApp(values: IdeleteDataScienceAppsRequest) {
    await dispatch(
      deleteDataScienceAppDispatch({
        organizationId: selectedState.organization?.organizationId!,
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
        organizationId: selectedState.organization?.organizationId!,
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
        organizationId: selectedState.organization?.organizationId!,
        roboticsCloudName: selectedState.roboticsCloud?.name!,
        region: selectedState.instance?.region!,
        instanceId: selectedState.instance?.instanceId!,
        fleetName: selectedState.fleet?.name!,
      }),
    ).then((responseApps: any) => {
      console.log("responseApps - get", responseApps);
      if (
        responseApps?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.environments
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseApps?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
              ?.environments || [],
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseApps?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
              ?.environments?.length || 0,
          );
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

  async function getFiles(paths?: string[]): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await dispatch(
          getFilesDispatch({
            paths: paths,
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
        getFiles,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
