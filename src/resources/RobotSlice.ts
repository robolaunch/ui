import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  robotApi,
  robotBuildManagerApi,
  robotLaunchManagerApi,
} from "../api/api";
import { toast } from "sonner";

export const createFederatedRobot = createAsyncThunk(
  "robot/createFederatedRobot",
  async (values: any) => {
    const response = await robotApi.createFederatedRobot({
      name: values.name,
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
                  distributions: values?.distributions,
                  bridgeEnabled: values?.bridgeEnabled,
                  vdiEnabled: values?.vdiEnabled,
                  vdiSessionCount: values?.vdiSessionCount,
                  ideEnabled: values?.ideEnabled,
                  storageAmount: values?.storageAmount,
                  gpuEnabledForCloudInstance:
                    values?.gpuEnabledForCloudInstance,
                  robotWorkspaces: values?.workspaces,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const getFederatedRobots = createAsyncThunk(
  "robot/getFederatedRobots",
  async (values: any) => {
    const response = await robotApi.getFederatedRobots({
      name: values?.name,
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
  }
);

export const getFederatedRobot = createAsyncThunk(
  "robot/getFederatedRobot",
  async (values: any) => {
    const response = await robotApi.getFederatedRobot({
      name: values?.name,
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
  }
);

export const deleteFederatedRobot = createAsyncThunk(
  "robot/deleteFederatedRobot",
  async (values: any) => {
    const response = await robotApi.deleteFederatedRobot({
      name: values?.name,
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
  }
);

export const createRobotBuildManager = createAsyncThunk(
  "robot/createRobotBuildManager",
  async (values: any) => {
    const response = await robotBuildManagerApi.createRobotBuildManager({
      name: values?.name,
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
  }
);

export const getRobotBuildManagers = createAsyncThunk(
  "robot/getRobotBuildManagers",
  async (values: any) => {
    const response = await robotBuildManagerApi.getRobotBuildManagers({
      name: values?.name,
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
  }
);

export const getRobotBuildManager = createAsyncThunk(
  "robot/getRobotBuildManager",
  async (values: any) => {
    const response = await robotBuildManagerApi.getRobotBuildManager({
      name: values?.name,
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
  }
);

export const deleteRobotBuildManager = createAsyncThunk(
  "robot/deleteRobotBuildManager",
  async (values: any) => {
    const response = await robotBuildManagerApi.deleteRobotBuildManager({
      name: values?.name,
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
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const createRobotLaunchManager = createAsyncThunk(
  "robot/createRobotLaunchManager",
  async (values: any) => {
    const response = await robotLaunchManagerApi.createRobotLaunchManager({
      name: values?.name,
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
  }
);

export const getRobotLaunchManagers = createAsyncThunk(
  "robot/getRobotLaunchManagers",
  async (values: any) => {
    const response = await robotLaunchManagerApi.getRobotLaunchManagers({
      name: values?.name,
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
  }
);

export const getRobotLaunchManager = createAsyncThunk(
  "robot/getRobotLaunchManager",
  async (values: any) => {
    const response = await robotLaunchManagerApi.getRobotLaunchManager({
      name: values?.name,
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
  }
);

export const deleteRobotLaunchManager = createAsyncThunk(
  "robot/deleteRobotLaunchManager",
  async (values: any) => {
    const response = await robotLaunchManagerApi.deleteRobotLaunchManager({
      name: values?.name,
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
  }
);

export const robotSlice = createSlice({
  name: "robot",
  initialState: {
    robots: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFederatedRobot.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createFederatedRobot.rejected, (_) => {
        toast.error("Something went wrong (createFederatedRobot)");
      })
      .addCase(getFederatedRobots.rejected, (_) => {
        toast.error("Something went wrong (getFederatedRobots)");
      })
      .addCase(getFederatedRobot.rejected, (_) => {
        toast.error("Something went wrong (getFederatedRobot)");
      })
      .addCase(deleteFederatedRobot.fulfilled, (_, action: any) => {
        console.log("!", action);
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteFederatedRobot.rejected, (_) => {
        toast.error("Something went wrong (deleteFederatedRobot)");
      })
      .addCase(createRobotBuildManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createRobotBuildManager.rejected, (_) => {
        toast.error("Something went wrong (createRobotBuildManager)");
      })
      .addCase(getRobotBuildManagers.rejected, (_) => {
        toast.error("Something went wrong (getRobotBuildManagers)");
      })
      .addCase(deleteRobotBuildManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteRobotBuildManager.rejected, (_) => {
        toast.error("Something went wrong (deleteRobotBuildManager)");
      })
      .addCase(createRobotLaunchManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createRobotLaunchManager.rejected, (_) => {
        toast.error("Something went wrong (createRobotLaunchManager)");
      });
  },
});
