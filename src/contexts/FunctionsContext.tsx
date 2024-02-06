import {
  IgetEnvironments,
  IgetFleet,
  IgetFleets,
  IgetInstance,
  IgetInstances,
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
  getFederatedFleets as getFleetsDispatch,
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
  createBuildManager as createAppBuildManagerDispatch,
  getBuildManagers as getAppBuildManagerDispatch,
  deleteBuildManager as deleteAppBuildManagerDispatch,
  getTemplates as getTemplatesDispatch,
} from "../toolkit/EnvironmentSlice";
import { getRoboticsClouds as getRegionsDispatch } from "../toolkit/RoboticsCloudSlice";
import {
  getPhysicalInstances as getAllPhysicalInstances,
  addPhysicalInstanceToFleet as addPhysicalInstanceToFleetDispatch,
  getSystemStatus as getSystemStatusDispatch,
  startInstance as startInstanceDispatch,
  stopInstance as stopInstanceDispatch,
  terminateInstance as deleteInstanceDispatch,
} from "../toolkit/InstanceSlice";
import { getOrganizations as getOrganizationsDispatch } from "../toolkit/OrganizationSlice";
import { getInstances as getCloudInstancesDispatch } from "../toolkit/InstanceSlice";
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
import { buildMapper } from "../handler/build.handler";
import {
  IEnvironmentStep1,
  IEnvironmentStep1Cluster,
} from "../interfaces/environment/environment.step1.interface";
import { IEnvironmentStep3 } from "../interfaces/environment/environment.step3.interface";
import { templatesMapper } from "../handler/template.handler";
import { IRegion } from "../interfaces/region.interface";
import { ICloudInstance } from "../interfaces/cloudInstance.interface";
import { IFleet } from "../interfaces/fleet.interface";
import { IEnvironmentStep2 } from "../interfaces/environment/environment.step2.interface";
import { IOrganization } from "../interfaces/organization.interface";
import { IEnvironmentStep4 } from "../interfaces/environment/environment.step4.interface";
import { environmentGPUCoreUsagebility } from "../functions/environment.function";

export const FunctionsContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const dispatch = useAppDispatch();
  const {
    setTrialState,
    selectedState,
    setItemCount,
    setSelectedState,
    pagesState,
    setPagesState,
  } = useMain();
  const navigate = useNavigate();
  const { robotData, setRobotData } = useCreateRobot();

  async function getOrganizations(parameters?: ImultipleGetParameters) {
    await dispatch(getOrganizationsDispatch()).then((resOrgs: any) => {
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
    await dispatch(getOrganizationsDispatch()).then(async (resOrg: any) => {
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
      getRegionsDispatch({
        organizationId: values?.organizationId,
      }),
    ).then((resRegions: any) => {
      const regions = regionsMapper(
        resRegions?.payload?.data?.[0]?.roboticsClouds,
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
      getRegionsDispatch({
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
      getCloudInstancesDispatch({
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
      getCloudInstancesDispatch({
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
      getFleetsDispatch({
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
      getFleetsDispatch({
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
        resNS?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
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
      getFleetsDispatch({
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
              step1: {
                ...robot?.step1,
                clusters: {
                  ...prevState.step1.clusters,
                  environment: robot?.step1?.clusters?.environment,
                },
              },
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
    ).then((resBuild: any) => {
      if (
        resBuild?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.robolaunchFederatedRobots?.[0]
      ) {
        const robotBuild =
          resBuild?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
            ?.robolaunchFederatedRobots?.[0];

        const robot: {
          step1: {
            clusters: {
              launch: IEnvironmentStep1Cluster[];
            };
          };
          step3: IEnvironmentStep3;
        } = buildMapper(
          resBuild?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
            ?.robolaunchFederatedRobots?.[0],
        );

        parameters?.setRobotData &&
          setRobotData((prevState) => {
            return {
              ...prevState,
              step1: {
                ...prevState.step1,
                clusters: {
                  ...prevState.step1.clusters,
                  launch: robot.step1.clusters.launch,
                },
              },
              step3: robot.step3,
            };
          });

        parameters?.setResponse && parameters?.setResponse(robotBuild || {});
      } else {
        parameters?.ifErrorNavigateTo404 && navigateTo404();
        parameters?.setResponse && parameters?.setResponse({});
        parameters?.setRobotData &&
          setRobotData((prevState) => {
            return {
              ...prevState,
              step3: {
                name: "",
                steps: [],
              },
            };
          });
      }
    });
  }

  async function getLaunchManagers(parameters?: ImultipleGetLaunchParameters) {
    await dispatch(
      getLaunchManagerDispatch({
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.region!,
        fleetName: selectedState?.fleet?.name!,
        robotName: robotData?.step1?.details.name,
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
    ).then((resEnv: any) => {
      const environment = environmentMapper(
        resEnv?.payload?.data?.[0].roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.environments?.[0],
      );

      if (environment) {
        parameters?.setRobotData &&
          setRobotData((prevState) => {
            return {
              ...prevState,
              step1: {
                ...environment?.step1,
                clusters: {
                  ...prevState.step1.clusters,
                  environment: environment?.step1?.clusters?.environment,
                },
              },
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

  async function createAppBuildManager(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createAppBuildManagerDispatch({
            organizationId: selectedState?.organization?.id!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            region: selectedState?.roboticsCloud?.region!,
            fleetName: selectedState?.fleet?.name!,
            environmentName: robotData?.step1?.details?.name,
            buildManagerName: robotData?.step3?.name,
            steps: robotData?.step3?.steps,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getAppBuildManager(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          getAppBuildManagerDispatch({
            organizationId: selectedState?.organization?.id!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            region: selectedState?.roboticsCloud?.region!,
            fleetName: selectedState?.fleet?.name!,
            environmentName: robotData?.step1?.details?.name,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function deleteAppBuildManager(envName: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          deleteAppBuildManagerDispatch({
            organizationId: selectedState?.organization?.id!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            region: selectedState?.roboticsCloud?.region!,
            fleetName: selectedState?.fleet?.name!,
            environmentName: robotData?.step1?.details?.name,
            buildManagerName: robotData?.step3?.name,
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
              ? ""
              : robotData?.step1?.details?.physicalInstanceName ?? "",
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
            templateAlias: robotData?.step1?.sharing?.alias,
            applicationObject: robotData,
            templatePrivateSharing: robotData?.step1?.sharing?.private,
            templateOrganizationSharing:
              robotData?.step1?.sharing?.organization,
            templatePublicSharing: robotData?.step1?.sharing?.public,
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
            vdiGpuResource: environmentGPUCoreUsagebility(
              selectedState?.instance?.resources?.hardware?.gpu?.hardware!,
            ),
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
            templateAlias: robotData?.step1?.sharing?.alias,
            applicationObject: JSON.stringify(robotData),
            templatePrivateSharing: robotData?.step1?.sharing?.private,
            templateOrganizationSharing:
              robotData?.step1?.sharing?.organization,
            templatePublicSharing: robotData?.step1?.sharing?.public,
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

  async function getTemplates(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response: any = await dispatch(
          getTemplatesDispatch({
            organizationId: selectedState.organization?.id!,
            roboticsCloudName: selectedState.roboticsCloud?.name!,
            region: selectedState.roboticsCloud?.region!,
            instanceId: selectedState.instance?.id!,
            fleetName: selectedState.fleet?.name!,
          }),
        );

        resolve(
          templatesMapper(
            response?.payload?.data?.[0]?.roboticsClouds?.[0]
              ?.cloudInstances?.[0]?.templates,
          ) || [],
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  function navigateTo404() {
    toast.error("The current page does not exist or is not available to you.");
    navigate("/404");
  }

  function handleObjectSetter(
    type: "organization" | "roboticsCloud" | "instance" | "fleet",
    data: IOrganization | IRegion | ICloudInstance | IFleet | INamespace,
  ) {
    setPagesState((prev) => {
      return {
        ...prev,
        [type]: data,
      };
    });

    setSelectedState((prev) => {
      return {
        ...prev,
        [type]: data,
      };
    });
  }

  function handleEnvironmentSetter(
    step: "step1" | "step2" | "step3" | "step4",
    data:
      | IEnvironmentStep1
      | IEnvironmentStep2
      | IEnvironmentStep3
      | IEnvironmentStep4,
  ) {
    setRobotData((prevState) => {
      return {
        ...prevState,
        [step]: data,
      };
    });
  }

  function handleThrowError(fromPage: boolean, ErrorNav404: boolean) {
    ErrorNav404 && navigateTo404();
    !fromPage && setItemCount(0);
    return;
  }

  function getOrganizationsFC(
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ): Promise<IOrganization[]> {
    return new Promise((resolve, reject) => {
      dispatch(getOrganizationsDispatch())
        .then((resOrgs: any) => {
          const organizations = orgsMapper(resOrgs?.payload?.data);
          const organization =
            filter && orgMapper(resOrgs?.payload?.data, filter);

          filter &&
            organization &&
            handleObjectSetter("organization", organization);
          filter && !organization && handleThrowError(fromPage, ErrorNav404);

          !fromPage && setItemCount(organizations.length);

          resolve(organizations);
        })
        .catch((error: any) => {
          handleThrowError(fromPage, ErrorNav404);
          reject(error);
        });
    });
  }

  function getRegionsFC(
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ): Promise<IRegion[]> {
    return new Promise((resolve, reject) => {
      dispatch(
        getRegionsDispatch({
          organizationId: fromPage
            ? pagesState.organization?.id!
            : selectedState.organization?.id!,
        }),
      )
        .then((resRegions: any) => {
          const regions = regionsMapper(
            resRegions?.payload?.data?.[0]?.roboticsClouds,
          );
          const region =
            filter &&
            regionMapper(
              resRegions?.payload?.data?.[0]?.roboticsClouds,
              filter,
            );

          filter && region && handleObjectSetter("roboticsCloud", region);
          filter && !region && handleThrowError(fromPage, ErrorNav404);

          !fromPage && setItemCount(regions.length);
          resolve(regions);
        })
        .catch((error: any) => {
          handleThrowError(fromPage, ErrorNav404);
          reject(error);
        });
    });
  }

  function getCloudInstancesFC(
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ): Promise<ICloudInstance[]> {
    return new Promise((resolve, reject) => {
      dispatch(
        getCloudInstancesDispatch({
          organizationId: fromPage
            ? pagesState.organization?.id!
            : selectedState.organization?.id!,
          roboticsCloudName: fromPage
            ? pagesState.roboticsCloud?.name!
            : selectedState.roboticsCloud?.name!,
          region: fromPage
            ? pagesState.roboticsCloud?.region!
            : selectedState.roboticsCloud?.region!,
          details: true,
        }),
      )
        .then((resCloudInstances: any) => {
          const cloudInstances = cloudInstancesMapper(
            resCloudInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
              ?.cloudInstances,
          );
          const cloudInstance =
            filter &&
            cloudInstanceMapper(
              resCloudInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
                ?.cloudInstances,
              filter,
            );

          filter &&
            cloudInstance &&
            handleObjectSetter("instance", cloudInstance);
          filter && !cloudInstance && handleThrowError(fromPage, ErrorNav404);

          !fromPage && setItemCount(cloudInstances.length);
          resolve(cloudInstances);
        })
        .catch((error: any) => {
          handleThrowError(fromPage, ErrorNav404);
          reject(error);
        });
    });
  }

  function getFleetsFC(
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ): Promise<IFleet[]> {
    return new Promise((resolve, reject) => {
      dispatch(
        getFleetsDispatch({
          instanceId: fromPage
            ? pagesState.instance?.id!
            : selectedState.instance?.id!,
          organizationId: fromPage
            ? pagesState.organization?.id!
            : selectedState.organization?.id!,
          region: fromPage
            ? pagesState.roboticsCloud?.region!
            : selectedState.roboticsCloud?.region!,
          roboticsCloudName: fromPage
            ? pagesState.roboticsCloud?.name!
            : selectedState.roboticsCloud?.name!,
        }),
      )
        .then((resFleets: any) => {
          const fleets = fleetsMapper(
            resFleets?.payload?.data?.[0].roboticsClouds?.[0]
              ?.cloudInstances?.[0]?.robolaunchFederatedFleets,
            resFleets?.payload?.data?.[0].roboticsClouds?.[0]
              ?.cloudInstances?.[0]?.robolaunchPhysicalInstances,
          );

          const fleet =
            filter &&
            fleetMapper(
              resFleets?.payload?.data?.[0].roboticsClouds?.[0]
                ?.cloudInstances?.[0]?.robolaunchFederatedFleets,
              resFleets?.payload?.data?.[0].roboticsClouds?.[0]
                ?.cloudInstances?.[0]?.robolaunchPhysicalInstances,
              filter,
            );

          filter && fleet && handleObjectSetter("fleet", fleet);
          filter && !fleet && handleThrowError(fromPage, ErrorNav404);

          !fromPage && setItemCount(fleets.length);
          resolve(fleets);
        })
        .catch((error: any) => {
          handleThrowError(fromPage, ErrorNav404);
          reject(error);
        });
    });
  }

  function getNamespacesFC(
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ): Promise<INamespace[]> {
    return new Promise((resolve, reject) => {
      dispatch(
        getNamespacesDispatch({
          instanceId: fromPage
            ? pagesState.instance?.id!
            : selectedState.instance?.id!,
          organizationId: fromPage
            ? pagesState.organization?.id!
            : selectedState.organization?.id!,
          region: fromPage
            ? pagesState.roboticsCloud?.region!
            : selectedState.roboticsCloud?.region!,
          roboticsCloudName: fromPage
            ? pagesState.roboticsCloud?.name!
            : selectedState.roboticsCloud?.name!,
        }),
      )
        .then((resNamespaces: any) => {
          const namespaces = namespacesMapper(
            resNamespaces?.payload?.data?.[0].roboticsClouds?.[0]
              ?.cloudInstances?.[0]?.robolaunchNamespaces,
          );
          const namespace =
            filter &&
            namespaceMapper(
              resNamespaces?.payload?.data?.[0].roboticsClouds?.[0]
                ?.cloudInstances?.[0]?.robolaunchNamespaces,
              filter,
            );

          filter && namespace && handleObjectSetter("fleet", namespace);
          filter && !namespace && handleThrowError(fromPage, ErrorNav404);

          !fromPage && setItemCount(namespaces.length);
          resolve(namespaces);
        })
        .catch((error: any) => {
          handleThrowError(fromPage, ErrorNav404);
          reject(error);
        });
    });
  }

  function getRobotsFC(
    fromPage: boolean,
    ErrorNav404: boolean,
  ): Promise<
    {
      step1: IEnvironmentStep1;
      step2: IEnvironmentStep2;
    }[]
  > {
    return new Promise((resolve, reject) => {
      dispatch(
        getRobotsDispatch({
          instanceId: fromPage
            ? pagesState.instance?.id!
            : selectedState.instance?.id!,
          organizationId: fromPage
            ? pagesState.organization?.id!
            : selectedState.organization?.id!,
          region: fromPage
            ? pagesState.roboticsCloud?.region!
            : selectedState.roboticsCloud?.region!,
          roboticsCloudName: fromPage
            ? pagesState.roboticsCloud?.name!
            : selectedState.roboticsCloud?.name!,
          fleetName: fromPage
            ? pagesState.fleet?.name!
            : selectedState.fleet?.name!,
        }),
      )
        .then((resRobots: any) => {
          const robots = environmentsMapper(
            resRobots?.payload?.data?.[0]?.roboticsClouds?.[0]
              ?.cloudInstances?.[0]?.robolaunchFederatedRobots,
          );
          !fromPage && setItemCount(robots.length);

          resolve(robots);
        })
        .catch((error: any) => {
          handleThrowError(fromPage, ErrorNav404);
          reject(error);
        });
    });
  }

  function getApplicationsFC(
    fromPage: boolean,
    ErrorNav404: boolean,
  ): Promise<
    {
      step1: IEnvironmentStep1;
      step2: IEnvironmentStep2;
    }[]
  > {
    return new Promise((resolve, reject) => {
      dispatch(
        getEnvironmentsDispatch({
          instanceId: fromPage
            ? pagesState.instance?.id!
            : selectedState.instance?.id!,
          organizationId: fromPage
            ? pagesState.organization?.id!
            : selectedState.organization?.id!,
          region: fromPage
            ? pagesState.roboticsCloud?.region!
            : selectedState.roboticsCloud?.region!,
          roboticsCloudName: fromPage
            ? pagesState.roboticsCloud?.name!
            : selectedState.roboticsCloud?.name!,
          fleetName: fromPage
            ? pagesState.fleet?.name!
            : selectedState.fleet?.name!,
        }),
      )
        .then((resApps: any) => {
          const apps = environmentsMapper(
            resApps?.payload?.data?.[0]?.roboticsClouds?.[0]
              ?.cloudInstances?.[0]?.environments,
          );
          !fromPage && setItemCount(apps.length);

          resolve(apps);
        })
        .catch((error: any) => {
          handleThrowError(fromPage, ErrorNav404);
          reject(error);
        });
    });
  }

  function getRobotFC(
    ErrorNav404: boolean,
    robotName: string,
  ): Promise<{
    step1: IEnvironmentStep1;
    step2: IEnvironmentStep2;
  }> {
    return new Promise((resolve, reject) => {
      dispatch(
        getRobotDispatch({
          instanceId: selectedState.instance?.id!,
          organizationId: selectedState.organization?.id!,
          region: selectedState.roboticsCloud?.region!,
          roboticsCloudName: selectedState.roboticsCloud?.name!,
          fleetName: selectedState.fleet?.name!,
          robotName: robotName,
        }),
      )
        .then((resRobot: any) => {
          const robot = environmentMapper(
            resRobot?.payload?.data?.[0].roboticsClouds?.[0]
              ?.cloudInstances?.[0]?.robolaunchFederatedRobots?.[0],
          );

          !robot && handleThrowError(true, ErrorNav404);
          robot && handleEnvironmentSetter("step1", robot.step1);
          robot && handleEnvironmentSetter("step2", robot.step2);

          robot && resolve(robot);
        })
        .catch((error: any) => {
          handleThrowError(true, ErrorNav404);
          reject(error);
        });
    });
  }

  function getApplicationFC(
    ErrorNav404: boolean,
    appName: string,
  ): Promise<{
    step1: IEnvironmentStep1;
    step2: IEnvironmentStep2;
  }> {
    return new Promise((resolve, reject) => {
      dispatch(
        getEnvironmentDispatch({
          instanceId: selectedState.instance?.id!,
          organizationId: selectedState.organization?.id!,
          region: selectedState.roboticsCloud?.region!,
          roboticsCloudName: selectedState.roboticsCloud?.name!,
          fleetName: selectedState.fleet?.name!,
          environmentName: appName,
        }),
      )
        .then((resApp: any) => {
          const app = environmentMapper(
            resApp?.payload?.data?.[0].roboticsClouds?.[0]?.cloudInstances?.[0]
              ?.environments?.[0],
          );

          !app && handleThrowError(true, ErrorNav404);
          app && handleEnvironmentSetter("step1", app.step1);
          app && handleEnvironmentSetter("step2", app.step2);

          app && resolve(app);
        })
        .catch((error: any) => {
          handleThrowError(true, ErrorNav404);
          reject(error);
        });
    });
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

        addPhysicalInstanceToFleet,

        getPhysicalInstances,
        getPhysicalInstance,

        getFleets,
        getFleet,
        deleteFleet,

        getNamespaces,
        getNamespace,
        deleteNamespace,

        getPhysicalFleet,

        createEnvironment,
        getEnvironments,
        getEnvironment,
        deleteEnvironment,

        createAppBuildManager,
        getAppBuildManager,
        deleteAppBuildManager,

        createRobot,
        getRobots,
        getRobot,
        deleteRobot,

        createBuildManager,
        getBuildManager,

        getLaunchManagers,

        getSystemStatus,

        createDataScienceApp,
        getDataScienceApps,
        deleteDataScienceApp,

        getIP,
        getFilesFromFileManager,

        getTemplates,

        getOrganizationsFC,
        getRegionsFC,
        getCloudInstancesFC,
        getFleetsFC,
        getNamespacesFC,
        getRobotsFC,
        getApplicationsFC,
        getRobotFC,
        getApplicationFC,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
