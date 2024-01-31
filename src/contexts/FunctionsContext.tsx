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
  deleteRobot as deleteRobotDispatch,
} from "../toolkit/RobotSlice";
import {
  getFederatedFleets,
  getNamespaces as getNamespacesDispatch,
  deleteNamespace as deleteNamespaceDispatch,
  deleteFederatedFleet as deleteFederatedFleetDispatch,
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
  deleteEnvironment as deleteEnvironmentDispatch,
} from "../toolkit/EnvironmentSlice";
import { getRoboticsClouds as getRoboticsCloudDispatch } from "../toolkit/RoboticsCloudSlice";
import {
  getPhysicalInstances as getAllPhysicalInstances,
  addPhysicalInstanceToFleet as addPhysicalInstanceToFleetDispatch,
  getSystemStatus as getSystemStatusDispatch,
  startInstance as startInstanceDispatch,
  stopInstance as stopInstanceDispatch,
  terminateInstance as deleteInstanceDispatch,
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
import { INamespace } from "../interfaces/namespace.interface";
import {
  namespaceMapper,
  namespacesMapper,
} from "../handler/namespace.handler";
import { fleetMapper, fleetsMapper } from "../handler/fleet.handler";
import { orgMapper, orgsMapper } from "../handler/organization.handler";
import { regionMapper, regionsMapper } from "../handler/region.handler";
import {
  cloudInstanceMapper,
  cloudInstancesMapper,
} from "../handler/cloudInstance.handler";
import {
  environmentMapper,
  environmentsMapper,
} from "../handler/environment.handler";
import { systemStatusMapper } from "../handler/system.handler";
import { ISystemStatus } from "../interfaces/system.interface";

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
          setSelectedState((prevState) => {
            return {
              ...prevState,
              organization: organization,
            };
          });
        parameters?.setResponse &&
          (await parameters?.setResponse(organization));
        parameters?.setPages &&
          setPagesState((prevState) => {
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
    ).then((resRegion: any) => {
      const regions = regionsMapper(
        resRegion?.payload?.data?.[0]?.roboticsClouds,
      );

      if (regions) {
        parameters?.setResponse && parameters?.setResponse(regions);

        parameters?.setItemCount && parameters?.setItemCount(regions?.length);
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
      const region = regionMapper(
        responseRoboticsClouds?.payload?.data?.[0]?.roboticsClouds,
        values?.roboticsCloudName,
      );

      if (region) {
        parameters?.isSetState &&
          setSelectedState((prevState: any) => {
            return {
              ...prevState,
              roboticsCloud: region,
            };
          });
        parameters?.setResponse && parameters?.setResponse(region);

        parameters?.setPages &&
          setPagesState((prevState: any) => {
            return {
              ...prevState,
              roboticsCloud: region,
            };
          });
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
      const instances = cloudInstancesMapper(
        responseInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances,
      );

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
      const instance = cloudInstanceMapper(
        responseInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances,
        values?.instanceName,
      );

      if (instance) {
        parameters?.isSetState &&
          (await setSelectedState((prevState: any) => {
            return {
              ...prevState,
              instance: instance,
            };
          }));
        parameters?.setResponse && (await parameters?.setResponse(instance));

        parameters?.setPages &&
          (await setPagesState((prevState: any) => {
            return {
              ...prevState,
              instance: instance,
            };
          }));
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function startInstance(instanceId: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          startInstanceDispatch({
            organizationId: pagesState?.organization?.id!,
            roboticsCloudName: pagesState?.roboticsCloud?.name!,
            region: pagesState?.roboticsCloud?.region!,
            instanceId: instanceId,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function stopInstance(instanceId: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          stopInstanceDispatch({
            organizationId: pagesState?.organization?.id!,
            roboticsCloudName: pagesState?.roboticsCloud?.name!,
            region: pagesState?.roboticsCloud?.region!,
            instanceId: instanceId,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function deleteInstance(instanceId: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          deleteInstanceDispatch({
            organizationId: pagesState?.organization?.id!,
            roboticsCloudName: pagesState?.roboticsCloud?.name!,
            region: pagesState?.roboticsCloud?.region!,
            instanceId: instanceId,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
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

  async function deleteFleet(fleetName: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          deleteFederatedFleetDispatch({
            organizationId: pagesState?.organization?.id!,
            roboticsCloudName: pagesState?.roboticsCloud?.name!,
            region: pagesState?.roboticsCloud?.region!,
            instanceId: pagesState?.instance?.id!,
            robolaunchFederatedFleetsName: fleetName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
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
        resNS?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.[0]
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

  async function deleteNamespace(nsName: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          deleteNamespaceDispatch({
            organizationId: pagesState?.organization?.id!,
            roboticsCloudName: pagesState?.roboticsCloud?.name!,
            region: pagesState?.roboticsCloud?.region!,
            instanceId: pagesState?.instance?.id!,
            namespaceName: nsName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
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
    ).then((resRobots: any) => {
      const robots = environmentsMapper(
        resRobots?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.robolaunchFederatedRobots,
      );

      if (robots) {
        parameters?.setResponse && parameters?.setResponse(robots || []);

        parameters?.setItemCount &&
          parameters?.setItemCount(robots?.length || 0);
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
    ).then((resRobot: any) => {
      const robot = environmentMapper(
        resRobot?.payload?.data?.[0].roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.robolaunchFederatedRobots?.[0],
      );

      if (robot) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step1: robot.step1,
              step2: robot.step2,
            };
          });

        parameters?.setResponse && parameters?.setResponse(robot);
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function deleteRobot(robotName: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          deleteRobotDispatch({
            organizationId: pagesState?.organization?.id!,
            roboticsCloudName: pagesState?.roboticsCloud?.name!,
            region: pagesState?.roboticsCloud?.region!,
            instanceId: pagesState?.instance?.id!,
            fleetName: pagesState?.fleet?.name!,
            robotName: robotName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getBuildManager(parameters?: IsingleGetBuildParameters) {
    await dispatch(
      getBuildManagerDispatch({
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
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
    ).then((resEnvironments: any) => {
      const environments = environmentsMapper(
        resEnvironments?.payload?.data?.[0]?.roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.environments,
      );

      if (environments) {
        parameters?.setResponse && parameters?.setResponse(environments);

        parameters?.setItemCount &&
          parameters?.setItemCount(environments?.length);
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
      const environment = environmentMapper(
        responseEnvironment?.payload?.data?.[0].roboticsClouds?.[0]
          ?.cloudInstances?.[0]?.environments?.[0],
      );

      if (environment) {
        parameters?.setRobotData &&
          setRobotData((prevState: any) => {
            return {
              ...prevState,
              step1: environment.step1,
              step2: environment.step2,
            };
          });

        parameters?.setResponse && parameters?.setResponse(environment);
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
      }
    });
  }

  async function deleteEnvironment(envName: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          deleteEnvironmentDispatch({
            organizationId: pagesState?.organization?.id!,
            roboticsCloudName: pagesState?.roboticsCloud?.name!,
            region: pagesState?.roboticsCloud?.region!,
            instanceId: pagesState?.instance?.id!,
            fleetName: pagesState?.fleet?.name!,
            environmentName: envName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
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
            instanceId: selectedState?.instance?.id,
            region: selectedState?.roboticsCloud?.region,
            robolaunchFederatedFleetsName: selectedState?.fleet?.name,
            robolaunchPhysicalInstancesName:
              robotData.step1.details?.physicalInstanceName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function getSystemStatus(): Promise<ISystemStatus> {
    return new Promise(async (resolve, reject) => {
      try {
        const resStatus: any = await dispatch(
          getSystemStatusDispatch({
            organizationId: pagesState?.organization?.id!,
            instanceId: pagesState?.instance?.id!,
            region: pagesState?.roboticsCloud?.region!,
            roboticsCloudName: pagesState?.roboticsCloud?.name!,
          }),
        );

        const systemStatus = systemStatusMapper(
          resStatus?.payload?.data?.[0]?.roboticsClouds?.[0]
            ?.cloudInstances?.[0]?.robolaunchPods,
        );

        resolve(systemStatus);
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
            instanceId: selectedState?.instance?.id!,
            fleetName: selectedState?.fleet?.name!,
            robotName: robotData?.step1?.details.name,
            physicalInstanceName: robotData?.step1?.details.isVirtualRobot
              ? undefined
              : robotData?.step1?.details?.physicalInstanceName!,
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
            instanceId: selectedState?.instance?.id!,
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
            organizationId: selectedState?.organization?.id!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            region: selectedState?.roboticsCloud?.region!,
            robotName: robotData?.step1?.details?.name,
            fleetName: selectedState?.fleet?.name!,
            physicalInstanceName:
              robotData?.step1?.details?.physicalInstanceName!,
            buildManagerName: robotData.step3!.name,
            robotBuildSteps: robotData.step3!.steps,
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
        region: selectedState.roboticsCloud?.name!,
        instanceId: selectedState.instance?.id!,
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
        region: selectedState.roboticsCloud?.name!,
        instanceId: selectedState.instance?.id!,
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
        region: selectedState.roboticsCloud?.name!,
        instanceId: selectedState.instance?.id!,
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
        getInstance,

        startInstance,
        stopInstance,
        deleteInstance,

        getPhysicalInstances,
        getPhysicalInstance,

        getFleets,
        getFleet,
        deleteFleet,

        getNamespaces,
        getNamespace,
        deleteNamespace,

        getPhysicalFleet,

        addPhysicalInstanceToFleet,

        getRobots,
        getRobot,
        deleteRobot,

        createBuildManager,
        getBuildManager,

        getLaunchManagers,

        createEnvironment,
        getEnvironments,
        getEnvironment,
        deleteEnvironment,

        getSystemStatus,
        createRobot,

        createDataScienceApp,
        getDataScienceApps,
        deleteDataScienceApp,

        getIP,
        getFilesFromFileManager,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
