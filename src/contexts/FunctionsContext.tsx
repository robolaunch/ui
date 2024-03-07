import {
  IgetPhysicalFleet,
  ImultipleGetLaunchParameters,
  IsingleGetBuildParameters,
  IsingleGetParameters,
} from "../interfaces/hook/functions.hook.interface";
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
  createFederatedFleet as createFleetDispatch,
  createNamespace as createNamespaceDispatch,
} from "../toolkit/FleetSlice";
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
import {
  getRoboticsClouds as getRegionsDispatch,
  createRoboticsCloud as createRegionDispatch,
} from "../toolkit/RoboticsCloudSlice";
import {
  getPhysicalInstances as getAllPhysicalInstances,
  addPhysicalInstanceToFleet as addPhysicalInstanceToFleetDispatch,
  getSystemStatus as getSystemStatusDispatch,
  startInstance as startInstanceDispatch,
  stopInstance as stopInstanceDispatch,
  terminateInstance as deleteInstanceDispatch,
  createCloudInstance as createCloudInstanceDispatch,
  addPhysicalInstance as addPhysicalInstanceDispatch,
} from "../toolkit/InstanceSlice";
import {
  getOrganizations as getOrganizationsDispatch,
  createOrganization as createOrganizationDispatch,
} from "../toolkit/OrganizationSlice";
import { getInstances as getCloudInstancesDispatch } from "../toolkit/InstanceSlice";
import { getIP as getCurrentIP } from "../toolkit/TrialSlice";
import { useAppDispatch } from "../hooks/redux";
import { useNavigate } from "react-router-dom";
import useMain from "../hooks/useMain";
import { createContext } from "react";
import { toast } from "sonner";
import { INamespace } from "../interfaces/global/namespace.interface";
import { getPort as getFreePortDispatch } from "../toolkit/PortSlice";

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
import { ISystemStatus } from "../interfaces/global/system.interface";
import { buildMapper } from "../handler/build.handler";
import {
  IEnvironmentStep1,
  IEnvironmentStep1Cluster,
} from "../interfaces/environment/environment.step1.interface";
import { IEnvironmentStep3 } from "../interfaces/environment/environment.step3.interface";
import { templatesMapper } from "../handler/template.handler";
import { IRegion } from "../interfaces/global/region.interface";
import { ICloudInstance } from "../interfaces/global/cloudInstance.interface";
import { IFleet } from "../interfaces/global/fleet.interface";
import { IEnvironmentStep2 } from "../interfaces/environment/environment.step2.interface";
import { IOrganization } from "../interfaces/global/organization.interface";
import { IEnvironmentStep4 } from "../interfaces/environment/environment.step4.interface";
import { environmentGPUCoreUsagebility } from "../functions/environment.function";
import {
  physicalInstanceMapper,
  physicalInstancesMapper,
} from "../handler/physicalInstance.handler";
import { IPhysicalInstance } from "../interfaces/global/physicalInstance.interface";
import { dataScienceAppsMapper } from "../handler/dataScience.handler";
import { IDataScienceApp } from "../interfaces/global/dataSciende.interface";
import { ITemplate } from "../interfaces/global/template.interface";
import {
  createDeploy,
  deleteDeploy,
  getDeploy,
  getDeploys,
} from "../toolkit/DeploySlice";
import { deployMapper, deploysMapper } from "../handler/deploy.handler";

export const FunctionsContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const dispatch = useAppDispatch();
  const {
    selectedState,
    setItemCount,
    setSelectedState,
    pagesState,
    setPagesState,
    robotData,
    setRobotData,
  } = useMain();
  const navigate = useNavigate();

  async function getPhysicalInstancesFC(
    fromPage: boolean,
    ErrorNav404: boolean,
    filter?: string,
  ): Promise<IPhysicalInstance | IPhysicalInstance[] | null> {
    return new Promise<IPhysicalInstance | IPhysicalInstance[] | null>(
      (resolve, reject) => {
        dispatch(
          getAllPhysicalInstances({
            organizationId: selectedState?.organization?.id!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            region: selectedState?.roboticsCloud?.region!,
            instanceId: selectedState?.instance?.id!,
          }),
        )
          .then((resPhyInstances: any) => {
            const phyInstances = physicalInstancesMapper(
              resPhyInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
                ?.cloudInstances?.[0]?.robolaunchPhysicalInstances,
            );

            const physicalInstance =
              (filter &&
                physicalInstanceMapper(
                  resPhyInstances?.payload?.data?.[0]?.roboticsClouds?.[0]
                    ?.cloudInstances?.[0]?.robolaunchPhysicalInstances,
                  filter,
                )) ||
              null;

            filter &&
              !physicalInstance &&
              handleThrowError(fromPage, ErrorNav404);

            !fromPage && setItemCount(phyInstances.length);
            resolve(filter ? physicalInstance : phyInstances);
          })
          .catch((error: any) => {
            handleThrowError(fromPage, ErrorNav404);
            reject(error);
          });
      },
    );
  }

  async function startInstanceFC(instanceId: string): Promise<void> {
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

  async function stopInstanceFC(instanceId: string): Promise<void> {
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

  async function deleteInstanceFC(instanceId: string): Promise<void> {
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

  async function deleteFleetFC(fleetName: string): Promise<void> {
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

  async function deleteNamespaceFC(nsName: string): Promise<void> {
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

  async function deleteRobotFC(robotName: string): Promise<void> {
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

  async function deleteApplicationFC(envName: string): Promise<void> {
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
            buildManagerName: `build-manager-${Math.floor(Date.now() / 1000)}`,
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

  function addPhysicalInstanceToFleetFC(): Promise<void> {
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

  function getSystemStatusFC(): Promise<ISystemStatus> {
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

  function createRobotFC() {
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
            vdiGpuResource: environmentGPUCoreUsagebility(
              selectedState?.instance?.resources?.hardware?.gpu?.hardware || [],
            ),
            ideGpuResource: robotData?.step1?.services.ide.gpuAllocation,
            ideGpuResourceType: robotData?.step1?.services.ide.gpuModelName,
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

  function createApplicationFC(withoutWorkspaces: boolean): Promise<void> {
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
              selectedState?.instance?.resources?.hardware?.gpu?.hardware || [],
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
            buildManagerName: `build-manager-${Math.floor(Date.now() / 1000)}`,
            robotBuildSteps: robotData.step3!.steps,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function deleteDataScienceAppFC(values: {
    applicationName: string;
  }): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        dispatch(
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
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function createDataScienceAppFC(values: {
    applicationName: string;
  }): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        dispatch(
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
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getDataScienceAppsFC(
    fromPage: boolean,
    ErrorNav404: boolean,
  ): Promise<IDataScienceApp[]> {
    return new Promise<IDataScienceApp[]>(async (resolve, reject) => {
      try {
        const response: any = await dispatch(
          getDataScienceAppsDispatch({
            organizationId: selectedState.organization?.id!,
            roboticsCloudName: selectedState.roboticsCloud?.name!,
            region: selectedState.roboticsCloud?.name!,
            instanceId: selectedState.instance?.id!,
            fleetName: selectedState.fleet?.name!,
          }),
        );

        const apps = dataScienceAppsMapper(
          response?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
            ?.environments,
        );

        !apps && handleThrowError(fromPage, ErrorNav404);

        resolve(apps);
      } catch (error) {
        handleThrowError(fromPage, ErrorNav404);
        reject(error);
      }
    });
  }

  async function getIP() {
    await dispatch(getCurrentIP()).then((response: any) => {});
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

  async function getTemplatesFC(): Promise<ITemplate[]> {
    return new Promise<ITemplate[]>(async (resolve, reject) => {
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

  async function createOrganizationFC(orgName: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createOrganizationDispatch({
            name: orgName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function createRegionFC(
    providerRegion: string,
    regionName: string,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createRegionDispatch({
            organizationId: selectedState?.organization?.id!,
            provider: "aws",
            region: providerRegion,
            roboticsCloudName: regionName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function createCloudInstanceFC(
    type: string,
    instanceName: string,
    devMode: boolean,
  ): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createCloudInstanceDispatch({
            organizationId: selectedState?.organization?.id!,
            region: selectedState?.roboticsCloud?.region!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceType: type,
            cloudInstanceName: instanceName,
            developmentMode: devMode,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function createFleetFC(fleetName: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createFleetDispatch({
            organizationId: selectedState?.organization?.id!,
            region: selectedState?.roboticsCloud?.region!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            robolaunchFederatedFleetsName: fleetName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function createNamespaceFC(namespaceName: string): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createNamespaceDispatch({
            organizationId: selectedState?.organization?.id!,
            region: selectedState?.roboticsCloud?.region!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            namespaceName: namespaceName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function createDeployFC(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          createDeploy({
            orgId: selectedState?.organization?.id!,
            regionName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            providerRegion: selectedState?.roboticsCloud?.region!,
            fleetName: selectedState?.fleet?.name!,
            bridgeDistro:
              robotData?.step1?.services?.ros?.bridgeDistro.toLocaleUpperCase()!,
            bridgeEnabled: robotData?.step1?.services?.ros?.isEnabled!,
            instanceName:
              robotData?.step1?.details?.physicalInstanceName ||
              selectedState?.instance?.name!,
            isPhysicalInstance: robotData?.step1?.details?.physicalInstanceName
              ? true
              : false,
            robotName: robotData?.step1?.details?.name,
            volumeClaimTemplates: robotData?.step1?.volumes?.map((volume) => {
              return {
                name: volume.name,
                capacity: String(volume.capacity) + "Gi",
              };
            }),
            launchContainers: robotData?.step1?.launchContainers?.map(
              (container) => {
                return {
                  replicas: container.replicaCount,
                  container: {
                    name: container.container.name,
                    image: container.container.image,
                    command: container.container.command,
                    volumeMounts: container.container.mountedVolumes?.map(
                      (volume) => {
                        return {
                          name: volume.name,
                          mountPath: volume.mountPath,
                        };
                      },
                    ),
                    envs: container.container.environmentVariables,
                  },
                };
              },
            ),
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getDeploysFC(
    fromPage: boolean,
    ErrorNav404: boolean,
  ): Promise<
    {
      step1: IEnvironmentStep1;
      step2: IEnvironmentStep2;
    }[]
  > {
    return new Promise<
      {
        step1: IEnvironmentStep1;
        step2: IEnvironmentStep2;
      }[]
    >(async (resolve, reject) => {
      try {
        const response: any = await dispatch(
          getDeploys({
            orgId: fromPage
              ? pagesState.organization?.id!
              : selectedState.organization?.id!,
            regionName: fromPage
              ? pagesState.roboticsCloud?.name!
              : selectedState.roboticsCloud?.name!,
            instanceId: fromPage
              ? pagesState.instance?.id!
              : selectedState.instance?.id!,
            providerRegion: fromPage
              ? pagesState.roboticsCloud?.region!
              : selectedState.roboticsCloud?.region!,
            fleetName: fromPage
              ? pagesState.fleet?.name!
              : selectedState.fleet?.name!,
          }),
        );

        const deploys: {
          step1: IEnvironmentStep1;
          step2: IEnvironmentStep2;
        }[] = deploysMapper(
          response?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
            ?.robolaunchFederatedRos2Workloads,
        );

        resolve(deploys);
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getDeployFC(
    ErrorNav404: boolean,
    deployName: string,
  ): Promise<{
    step1: IEnvironmentStep1;
    step2: IEnvironmentStep2;
  }> {
    return new Promise<{
      step1: IEnvironmentStep1;
      step2: IEnvironmentStep2;
    }>(async (resolve, reject) => {
      try {
        const response: any = await dispatch(
          getDeploy({
            orgId: selectedState?.organization?.id!,
            regionName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            providerRegion: selectedState?.roboticsCloud?.region!,
            fleetName: selectedState?.fleet?.name!,
            deployName: deployName,
          }),
        );

        console.log(response);

        const deploy: {
          step1: IEnvironmentStep1;
          step2: IEnvironmentStep2;
        } = deployMapper(
          response?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
            ?.robolaunchFederatedRos2Workloads?.[0],
        );

        !deploy && handleThrowError(true, ErrorNav404);
        deploy && handleEnvironmentSetter("step1", deploy.step1);
        deploy && handleEnvironmentSetter("step2", deploy.step2);

        deploy && resolve(deploy);
      } catch (error) {
        handleThrowError(true, ErrorNav404);
        reject(error);
      }
    });
  }
  async function deleteDeployFC(values: { deployName: string }): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await dispatch(
          deleteDeploy({
            orgId: selectedState?.organization?.id!,
            regionName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            providerRegion: selectedState?.roboticsCloud?.region!,
            fleetName: selectedState?.fleet?.name!,
            deployName: values.deployName,
          }),
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async function getFreePortFC(): Promise<number | undefined> {
    return new Promise(async (resolve, reject) => {
      try {
        const { payload: port } = await dispatch(
          getFreePortDispatch({
            organizationId: selectedState?.organization?.id!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            region: selectedState?.roboticsCloud?.region!,
            instanceId: selectedState?.instance?.id!,
          }),
        );

        if (typeof port !== "number") {
          return reject();
        } else if (
          robotData.step1.services.ide.customPorts
            ?.map((port: any) => port.backendPort)
            .includes(port) ||
          robotData.step1.services.vdi.customPorts
            ?.map((port: any) => port.backendPort)
            .includes(port) ||
          robotData.step1.services.jupyterNotebook.customPorts
            ?.map((port: any) => port.backendPort)
            .includes(port)
        ) {
          getFreePortFC();
        }

        resolve(port);
      } catch (error) {
        toast.error(
          "Error getting port. If Please remove a port and try again.",
        );
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

  async function addPhysicalInstanceToCloudInstanceFC(
    phyName: string,
  ): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const response: any = await dispatch(
          addPhysicalInstanceDispatch({
            organizationId: selectedState?.organization?.id!,
            roboticsCloudName: selectedState?.roboticsCloud?.name!,
            instanceId: selectedState?.instance?.id!,
            region: selectedState?.roboticsCloud?.region!,
            robolaunchPhysicalInstancesName: phyName,
          }),
        );
        resolve(response.payload);
      } catch (error) {
        reject(error);
      }
    });
  }

  return (
    <FunctionsContext.Provider
      value={{
        //// Organizations ////
        createOrganizationFC,
        getOrganizationsFC,
        //// Regions ////
        createRegionFC,
        getRegionsFC,
        //// Cloud Instances ////
        createCloudInstanceFC,
        getCloudInstancesFC,
        startInstanceFC,
        stopInstanceFC,
        deleteInstanceFC,
        //// Physical Instances ////
        addPhysicalInstanceToCloudInstanceFC,
        addPhysicalInstanceToFleetFC,
        getPhysicalInstancesFC,
        //// Fleets ////
        createFleetFC,
        getFleetsFC,
        deleteFleetFC,
        //// Namespaces ////
        createNamespaceFC,
        getNamespacesFC,
        deleteNamespaceFC,
        //// Applications ////
        createApplicationFC,
        getApplicationsFC,
        getApplicationFC,
        deleteApplicationFC,
        //// Data Science Apps ////
        createDataScienceAppFC,
        getDataScienceAppsFC,
        deleteDataScienceAppFC,
        //// Robots ////
        createRobotFC,
        getRobotsFC,
        getRobotFC,
        deleteRobotFC,
        //// Deploy ////
        createDeployFC,
        getDeploysFC,
        getDeployFC,
        deleteDeployFC,
        //// Tools ////
        getSystemStatusFC,
        getTemplatesFC,
        getFreePortFC,
        ////
        ////
        ////
        ////

        getPhysicalFleet,

        createAppBuildManager,
        getAppBuildManager,
        deleteAppBuildManager,

        createBuildManager,
        getBuildManager,

        getLaunchManagers,

        getIP,
        getFilesFromFileManager,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
