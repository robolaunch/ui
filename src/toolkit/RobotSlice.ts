import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  robotApi,
  robotBuildManagerApi,
  robotLaunchManagerApi,
} from "../api/api";
import { toast } from "sonner";
import { isProduction } from "../helpers/envProvider";
import axios from "axios";
import getCookies from "../functions/getCookies";

export const createRobot = createAsyncThunk(
  "robot/createFederatedRobot",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    robotName: string;
    fleetName: string;
    workspaceUpdated?: boolean;
    physicalInstanceName: string;
    distributions: string[];
    bridgeEnabled: boolean;
    vdiEnabled: boolean;
    vdiSessionCount: number;
    ideEnabled: boolean;
    storageAmount: number;
    gpuEnabledForCloudInstance: boolean;
    marketPlaceEnabled?: boolean;
    imageUser?: string;
    imageRepository?: string;
    imageTag?: string;
    workspaces: any[];
    permittedDirectories: string;
    persistentDirectories: string;
    hostDirectories: string;
    ideCustomPorts: string;
    vdiCustomPorts: string;
    templateAlias: string;
    applicationObject: any;
    templatePrivateSharing: boolean;
    templateOrganizationSharing: boolean;
    templatePublicSharing: boolean;
    vdiGpuResource: number;
  }) => {
    const response = await robotApi.createFederatedRobot({
      name: "robot/createFederatedRobot",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                {
                  name: values?.robotName,
                  fleetName: values?.fleetName,
                  workspaceUpdated: values?.workspaceUpdated,
                  physicalInstance: values?.physicalInstanceName,
                  distributions: values?.distributions,
                  bridgeEnabled: values?.bridgeEnabled,
                  vdiEnabled: values?.vdiEnabled,
                  vdiSessionCount: values?.vdiSessionCount,
                  ideEnabled: values?.ideEnabled,
                  storageAmount: values?.storageAmount,
                  gpuEnabledForCloudInstance:
                    values?.gpuEnabledForCloudInstance,
                  marketPlaceEnabled: values?.marketPlaceEnabled,
                  robotWorkspaces: values?.workspaces,
                  permittedDirectories: values?.permittedDirectories,
                  persistentDirectories: values?.persistentDirectories,
                  hostDirectories: values?.hostDirectories,
                  ideCustomPorts: values?.ideCustomPorts,
                  vdiCustomPorts: values?.vdiCustomPorts,
                  // templateContent: values?.applicationObject,
                  // templateName: values?.templateAlias,
                  // templatePrivate: values?.templatePrivateSharing,
                  // templateOrganizationLevelAvailable:
                  //   values?.templateOrganizationSharing,
                  // templatePublicLevelAvailable: values?.templatePublicSharing,
                  vdiGpuResource: values?.vdiGpuResource,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getRobots = createAsyncThunk(
  "robot/getFederatedRobots",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
  }) => {
    const response = await robotApi.getFederatedRobots({
      name: "robot/getFederatedRobots",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [{ fleetName: values?.fleetName }],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getRobot = createAsyncThunk(
  "robot/getFederatedRobot",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    robotName: string;
  }) => {
    const response = await robotApi.getFederatedRobot({
      name: "robot/getFederatedRobot",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                { fleetName: values?.fleetName, name: values?.robotName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const deleteRobot = createAsyncThunk(
  "robot/deleteFederatedRobot",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    robotName: string;
  }) => {
    const response = await robotApi.deleteFederatedRobot({
      name: "robot/deleteFederatedRobot",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                { name: values?.robotName, fleetName: values?.fleetName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const createBuildManager = createAsyncThunk(
  "robot/createRobotBuildManager",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    robotName: string;
    fleetName: string;
    physicalInstanceName: string;
    buildManagerName: string;
    robotBuildSteps: any[];
  }) => {
    const response = await robotBuildManagerApi.createRobotBuildManager({
      name: "robot/createRobotBuildManager",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                {
                  name: values?.robotName,
                  fleetName: values?.fleetName,
                  physicalInstance: values?.physicalInstanceName,
                  buildManagerName: values?.buildManagerName,
                  robotBuildSteps: values?.robotBuildSteps,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getBuildManagers = createAsyncThunk(
  "robot/getRobotBuildManagers",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    robotName: string;
  }) => {
    const response = await robotBuildManagerApi.getRobotBuildManagers({
      name: "robot/getRobotBuildManagers",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                { fleetName: values?.fleetName, name: values?.robotName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getBuildManager = createAsyncThunk(
  "robot/getRobotBuildManager",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    robotName: string;
    buildManagerName: string;
  }) => {
    const response = await robotBuildManagerApi.getRobotBuildManager({
      name: "robot/getRobotBuildManager",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                {
                  fleetName: values?.fleetName,
                  name: values?.robotName,
                  buildManagerName: values?.buildManagerName,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const deleteBuildManager = createAsyncThunk(
  "robot/deleteRobotBuildManager",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    robotName: string;
    fleetName: string;
    physicalInstanceName: string;
  }) => {
    const response = await robotBuildManagerApi.deleteRobotBuildManager({
      name: "robot/deleteRobotBuildManager",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                {
                  name: values?.robotName,
                  fleetName: values?.fleetName,
                  physicalInstance: values?.physicalInstanceName,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const createLaunchManager = createAsyncThunk(
  "robot/createRobotLaunchManager",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    robotName: string;
    fleetName: string;
    physicalInstanceName: string;
    launchManagerName: string;
    robotLaunchSteps: any[];
  }) => {
    const response = await robotLaunchManagerApi.createRobotLaunchManager({
      name: "robot/createRobotLaunchManager",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                {
                  name: values?.robotName,
                  fleetName: values?.fleetName,
                  physicalInstance: values?.physicalInstanceName,
                  launchManagerName: values?.launchManagerName,
                  robotLaunchSteps: values?.robotLaunchSteps,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getLaunchManagers = createAsyncThunk(
  "robot/getRobotLaunchManagers",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    robotName: string;
  }) => {
    const response = await robotLaunchManagerApi.getRobotLaunchManagers({
      name: "robot/getRobotLaunchManagers",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                { fleetName: values?.fleetName, name: values?.robotName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getLaunchManager = createAsyncThunk(
  "robot/getRobotLaunchManager",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    robotName: string;
    buildManagerName: string;
  }) => {
    const response = await robotLaunchManagerApi.getRobotLaunchManager({
      name: "robot/getRobotLaunchManager",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                {
                  fleetName: values?.fleetName,
                  name: values?.robotName,
                  buildManagerName: values?.buildManagerName,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const deleteLaunchManager = createAsyncThunk(
  "robot/deleteRobotLaunchManager",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    robotName: string;
    fleetName: string;
    physicalInstanceName: string;
    launchManagerName: string;
  }) => {
    const response = await robotLaunchManagerApi.deleteRobotLaunchManager({
      name: "robot/deleteRobotLaunchManager",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedRobots: [
                {
                  name: values?.robotName,
                  fleetName: values?.fleetName,
                  physicalInstance: values?.physicalInstanceName,
                  launchManagerName: values?.launchManagerName,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getFilesFromFileManager = createAsyncThunk(
  "robot/getFilesFromFileManager",
  async (values: { instanceIP: string; paths?: string[] }) => {
    async function getTokenFromCookies(): Promise<string | null> {
      return (
        (await getCookies()).find(
          (cookie: { name: string; value: string }) =>
            cookie.name === "fileManager",
        )?.value || null
      );
    }

    if ((await getTokenFromCookies()) === null) {
      const { data: token } = await axios.get(`${values.instanceIP}/api/login`);
      document.cookie = `fileManager=${token}; expires=${new Date(new Date().getTime() + 2 * 60 * 60 * 1000).toUTCString()}; path=*`;
    }

    const response = await axios.get(
      `${values.instanceIP}/api/resources${values?.paths?.join("") || "/"}?auth=${await getTokenFromCookies()}`,
    );
    return response.data;
  },
);

export const RobotSlice = createSlice({
  name: "robot",
  initialState: {
    urls: {
      vdi: isProduction ? "" : "ws://localhost:8080/",
      ide: isProduction ? "" : "http://localhost:3000/",
      ros: isProduction ? "" : "ws://172.16.44.198:9090",
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRobot.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createRobot.rejected, () => {
        toast.error("Something went wrong of creating robot");
      })
      .addCase(getRobots.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getRobots.rejected, () => {
        toast.error("Something went wrong of getting robots");
      })
      .addCase(getRobot.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getRobot.rejected, () => {
        toast.error("Something went wrong of getting robot");
      })
      .addCase(deleteRobot.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteRobot.rejected, () => {
        toast.error("Something went wrong of deleting robot");
      })
      .addCase(createBuildManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createBuildManager.rejected, () => {
        toast.error("Something went wrong of creating build manager");
      })
      .addCase(getBuildManagers.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getBuildManagers.rejected, () => {
        toast.error("Something went wrong of getting build managers");
      })
      .addCase(getBuildManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getBuildManager.rejected, () => {
        toast.error("Something went wrong of getting build manager");
      })
      .addCase(deleteBuildManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteBuildManager.rejected, (_) => {
        toast.error("Something went wrong of deleting build manager");
      })
      .addCase(createLaunchManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createLaunchManager.rejected, () => {
        toast.error("Something went wrong of creating launch manager");
      })
      .addCase(getLaunchManagers.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getLaunchManagers.rejected, () => {
        toast.error("Something went wrong of getting launch managers");
      })
      .addCase(getLaunchManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getLaunchManager.rejected, () => {
        toast.error("Something went wrong of getting launch manager");
      })
      .addCase(deleteLaunchManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteLaunchManager.rejected, () => {
        toast.error("Something went wrong of deleting launch manager");
      });
  },
});

export default RobotSlice.reducer;
