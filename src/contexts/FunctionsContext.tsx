import React, { createContext } from "react";
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
} from "../toolkit/RobotSlice";
import { getRoboticsClouds as getRoboticsCloudDispatch } from "../toolkit/RoboticsCloudSlice";
import { getOrganizations as getAllOrganizations } from "../toolkit/OrganizationSlice";
import { getPhysicalInstances as getAllPhysicalInstances } from "../toolkit/InstanceSlice";
import { getInstances as getAllInstances } from "../toolkit/InstanceSlice";
import {
  getFederatedFleets,
  createFederatedFleet,
  getNamespaces as getNamespacesDispatch,
} from "../toolkit/FleetSlice";
import { getIP as getCurrentIP } from "../toolkit/TrialSlice";
import {
  getEnvironments as getEnvironmentsDispatch,
  getEnvironment as getEnvironmentDispatch,
} from "../toolkit/EnvironmentSlice";
import useCreateRobot from "../hooks/useCreateRobot";
import { useAppDispatch } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import useMain from "../hooks/useMain";
import { toast } from "sonner";
import {
  IgetEnvironmentRequest,
  IsingleGetEnviromentParameters,
} from "../interfaces/environmentInterfaces";

export const FunctionsContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const dispatch = useAppDispatch();
  const { setTrialState, setSelectedState, pagesState, setPagesState } =
    useMain();
  const navigate = useNavigate();
  const { setRobotData } = useCreateRobot();

  async function getOrganizations(parameters?: ImultipleGetParameters) {
    await dispatch(getAllOrganizations()).then((organizationsResponse: any) => {
      if (organizationsResponse?.payload?.data) {
        parameters?.setResponse &&
          parameters?.setResponse(organizationsResponse?.payload?.data || []);

        parameters?.setItemCount &&
          parameters?.setItemCount(
            organizationsResponse?.payload?.data?.length || 0
          );

        if (organizationsResponse?.payload?.data?.length === 1) {
          parameters?.setFirstItemforTrial &&
            parameters?.setFirstItemforTrial(
              organizationsResponse?.payload?.data[0]
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
    parameters?: IsingleGetParameters
  ) {
    await dispatch(getAllOrganizations()).then(
      async (organizationsResponse: any) => {
        if (
          organizationsResponse?.payload?.data &&
          organizationsResponse?.payload?.data?.find(
            (organization: any) =>
              organization?.organizationName ===
              `org_${values?.organizationName}`
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
            (await parameters?.setResponse(
              organizationsResponse?.payload?.data?.find(
                (organization: any) =>
                  organization?.organizationName ===
                  `org_${values?.organizationName}`
              )
            ));
          parameters?.setPages &&
            setPagesState((prevState: any) => {
              return {
                ...prevState,
                organization: organizationsResponse?.payload?.data?.find(
                  (organization: any) =>
                    organization?.organizationName ===
                    `org_${values?.organizationName}`
                ),
              };
            });
        } else {
          parameters?.ifErrorNavigateTo404 && navigateTo404();
          parameters?.setResponse && parameters?.setResponse({});
        }
      }
    );
  }

  async function getRoboticsClouds(
    values: IgetRoboticsClouds,
    parameters?: ImultipleGetParameters
  ) {
    await dispatch(
      getRoboticsCloudDispatch({
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

        if (responseRoboticsClouds?.payload?.data?.length === 1) {
          parameters?.setFirstItemforTrial &&
            parameters?.setFirstItemforTrial(
              responseRoboticsClouds?.payload?.data[0]?.roboticsClouds[0]
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
    parameters?: IsingleGetParameters
  ) {
    await dispatch(
      getRoboticsCloudDispatch({
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

        parameters?.setPages &&
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              roboticsCloud:
                responseRoboticsClouds?.payload?.data[0]?.roboticsClouds?.find(
                  (roboticsCloud: any) =>
                    roboticsCloud?.name === values?.roboticsCloudName
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
                    roboticsCloud?.name === values?.roboticsCloudName
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
    parameters?: ImultipleGetParameters
  ) {
    await dispatch(
      getAllInstances({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
        details: values?.details,
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

        if (
          responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
            ?.length === 1
        ) {
          parameters?.setFirstItemforTrial &&
            parameters?.setFirstItemforTrial(
              responseInstances?.payload?.data[0]?.roboticsClouds[0]
                ?.cloudInstances[0]
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
    parameters?: ImultipleGetParameters
  ) {
    await dispatch(
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
    await dispatch(
      getAllInstances({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
        details: values?.details,
      })
    ).then(async (responseInstances: any) => {
      if (
        Array.isArray(responseInstances?.payload?.data) &&
        Array.isArray(responseInstances?.payload?.data[0]?.roboticsClouds) &&
        responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
      ) {
        parameters?.isSetState &&
          (await setSelectedState((prevState: any) => {
            return {
              ...prevState,
              instance:
                responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
                  (instance: any) => instance?.name === values?.instanceName
                ) || {},
            };
          }));
        parameters?.setResponse &&
          (await parameters?.setResponse(
            responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
              (instance: any) => instance?.name === values?.instanceName
            ) || {}
          ));

        parameters?.setPages &&
          (await setPagesState((prevState: any) => {
            return {
              ...prevState,
              instance:
                responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
                  (instance: any) => instance?.name === values?.instanceName
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
    parameters?: ImultipleGetParameters
  ) {
    await dispatch(
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

        if (parameters?.setFirstItemforTrial) {
          if (
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchFederatedFleets?.length === 1
          ) {
            parameters?.setFirstItemforTrial(
              responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
                ?.cloudInstances[0]?.robolaunchFederatedFleets[0]
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
              })
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
    parameters?: IsingleGetParameters
  ) {
    await dispatch(
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

        parameters?.setPages &&
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              fleet:
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchFederatedFleets?.find(
                  (fleet: any) => fleet?.name === values?.fleetName
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
    parameters?: ImultipleGetParameters
  ) {
    await dispatch(
      getNamespacesDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
      })
    ).then((responseNamespaces: any) => {
      if (
        Array.isArray(responseNamespaces?.payload?.data) &&
        Array.isArray(responseNamespaces?.payload?.data[0]?.roboticsClouds) &&
        Array.isArray(
          responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        responseNamespaces?.payload?.data[0].roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchNamespaces
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchNamespaces || []
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchNamespaces?.length || 0
          );

        if (parameters?.setFirstItemforTrial) {
          if (
            responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.robolaunchNamespaces?.length === 1
          ) {
            parameters?.setFirstItemforTrial(
              responseNamespaces?.payload?.data[0]?.roboticsClouds[0]
                ?.cloudInstances[0]?.robolaunchNamespaces[0]
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
              })
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
    parameters?: IsingleGetParameters
  ) {
    await dispatch(
      getNamespacesDispatch({
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
          ?.cloudInstances[0]?.robolaunchNamespaces
      ) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              fleet:
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchNamespaces?.find(
                  (fleet: any) => fleet?.name === values?.namespaceName
                ) || {},
            };
          });
        parameters?.setResponse &&
          parameters?.setResponse(
            responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchNamespaces?.find(
              (fleet: any) => fleet?.name === values?.namespaceName
            ) || {}
          );

        parameters?.setPages &&
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              fleet:
                responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.robolaunchNamespaces?.find(
                  (fleet: any) => fleet?.name === values?.namespaceName
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
    parameters?: IsingleGetParameters
  ) {
    await dispatch(
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
    await dispatch(
      getRobotsDispatch({
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
    await dispatch(
      getRobotDispatch({
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
    await dispatch(
      getBuildManagerDispatch({
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
                    ?.robotBuildSteps || [],
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
    parameters?: ImultipleGetLaunchParameters
  ) {
    await dispatch(
      getLaunchManagerDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        instanceId: values?.instanceId,
        region: values?.region,
        fleetName: values?.fleetName,
        robotName: values?.robotName,
      })
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
    parameters?: ImultipleGetParameters
  ) {
    await dispatch(
      getEnvironmentsDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
        instanceId: values?.instanceId,
        fleetName: values?.fleetName,
      })
    ).then((responseEnvironments: any) => {
      if (
        Array.isArray(responseEnvironments?.payload?.data) &&
        Array.isArray(responseEnvironments?.payload?.data[0]?.roboticsClouds) &&
        Array.isArray(
          responseEnvironments?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        responseEnvironments?.payload?.data[0]?.roboticsClouds[0]
          ?.cloudInstances[0]?.environments
      ) {
        parameters?.setResponse &&
          parameters?.setResponse(
            responseEnvironments?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.environments || []
          );

        parameters?.setItemCount &&
          parameters?.setItemCount(
            responseEnvironments?.payload?.data[0]?.roboticsClouds[0]
              ?.cloudInstances[0]?.environments?.length || 0
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
    parameters?: IsingleGetEnviromentParameters
  ) {
    await dispatch(
      getEnvironmentDispatch({
        organizationId: values?.organizationId,
        roboticsCloudName: values?.roboticsCloudName,
        region: values?.region,
        instanceId: values?.instanceId,
        fleetName: values?.fleetName,
        environmentName: values?.environmentName,
      })
    ).then((responseEnvironment: any) => {
      if (
        Array.isArray(responseEnvironment?.payload?.data) &&
        Array.isArray(responseEnvironment?.payload?.data[0]?.roboticsClouds) &&
        Array.isArray(
          responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        responseEnvironment?.payload?.data[0].roboticsClouds[0]
          ?.cloudInstances[0]?.environments
      ) {
        console.log(
          responseEnvironment?.payload?.data[0].roboticsClouds[0]
            ?.cloudInstances[0]?.environments
        );
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step1: {
                ...prevState.step1,
                robotName:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.name,
                isVirtualRobot: responseEnvironment?.payload?.data[0]
                  ?.roboticsClouds[0]?.cloudInstances[0]?.environments[0]
                  ?.physicalInstance
                  ? false
                  : true,
                physicalInstanceName:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.physicalInstance,
                robotStorage:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.storageAmount,
                isEnabledIde:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.ideEnabled,
                isEnabledROS2Bridge:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.bridgeEnabled,
                remoteDesktop: {
                  isEnabled:
                    responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.environments[0]?.vdiEnabled,
                  sessionCount:
                    responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.environments[0]?.vdiSessionCount,
                },
                rosDistros:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.distributions,
                gpuEnabledForCloudInstance:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.vdiGpuResource > 0
                    ? true
                    : false,
                isDevelopmentMode: false,
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
              step2: {
                workspaces:
                  responseEnvironment?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.environments[0]?.robotWorkspaces,
              },
            };
          });

        parameters?.setResponse &&
          parameters?.setResponse(
            responseEnvironment?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]?.environments?.find(
              (robot: any) => robot?.name === values?.environmentName
            ) || {}
          );
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
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
        getNamespaces,
        getNamespace,
        getPhysicalFleet,
        getRobots,
        getRobot,
        getBuildManager,
        getLaunchManagers,
        getEnvironments,
        getEnvironment,
        getIP,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
