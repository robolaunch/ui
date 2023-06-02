import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { robotApi, robotBuildManagerApi } from "../api/api";
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
                  distributions: values?.distributions, // "HUMBLE",
                  bridgeEnabled: values?.bridgeEnabled, // true,
                  vdiEnabled: values?.vdiEnabled, // true,
                  vdiSessionCount: values?.vdiSessionCount, // 1
                  ideEnabled: values?.ideEnabled, // true,
                  storageAmount: values?.storageAmount, // 10000,
                  gpuEnabledForCloudInstance:
                    values?.gpuEnabledForCloudInstance, // true,
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
                  buildManagerName: "test-robot-bm",
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
      .addCase(getFederatedRobots.rejected, (_) => {
        toast.error("Something went wrong (getFederatedRobots)");
      })
      .addCase(createFederatedRobot.rejected, (_) => {
        toast.error("Something went wrong (createFederatedRobot)");
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
      });
  },
});
