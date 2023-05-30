import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { robotApi } from "../api/api";

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

export const robotSlice = createSlice({
  name: "robot",
  initialState: {
    robots: [],
  },
  reducers: {},
});
