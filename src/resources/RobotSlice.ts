import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  robotApi,
  robotBuildManagerApi,
  robotLaunchManagerApi,
} from "../api/api";
import { toast } from "sonner";
import {
  IcreateRobotRequest,
  IdeleteRobotRequest,
  IgetRobotRequest,
  IgetRobotsRequest,
} from "../interfaces/robotInterfaces";

export const createRobot = createAsyncThunk(
  "robot/createFederatedRobot",
  async (values: IcreateRobotRequest) => {
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

export const getRobots = createAsyncThunk(
  "robot/getFederatedRobots",
  async (values: IgetRobotsRequest) => {
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
  }
);

export const getRobot = createAsyncThunk(
  "robot/getFederatedRobot",
  async (values: IgetRobotRequest) => {
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
  }
);

export const deleteRobot = createAsyncThunk(
  "robot/deleteFederatedRobot",
  async (values: IdeleteRobotRequest) => {
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
  }
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
    robotBuildSteps: any;
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

export const RobotSlice = createSlice({
  name: "robot",
  initialState: {
    urls: {
      vdi: "",
      ide: "",
      ros: "",
    },
  },
  reducers: {
    updateUrls: (state, action) => {
      state.urls = action.payload;
      return state;
    },
  },
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
      .addCase(getRobotBuildManagers.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getRobotBuildManagers.rejected, () => {
        toast.error("Something went wrong of getting build managers");
      })
      .addCase(deleteRobotBuildManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteRobotBuildManager.rejected, (_) => {
        toast.error("Something went wrong of deleting build manager");
      })
      .addCase(createRobotLaunchManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createRobotLaunchManager.rejected, () => {
        toast.error("Something went wrong of creating launch manager");
      })
      .addCase(deleteRobotLaunchManager.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteRobotLaunchManager.rejected, () => {
        toast.error("Something went wrong of deleting launch manager");
      });
  },
});

export const { updateUrls } = RobotSlice.actions;
export default RobotSlice.reducer;
