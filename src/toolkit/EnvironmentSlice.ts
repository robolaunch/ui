import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { environmentApi } from "../api/api";

export const createEnvironment = createAsyncThunk(
  "environment/createEnvironment",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    environmentName: string;
    domainName: string;
    fleetName: string;
    gpuEnabledForCloudInstance: boolean;
    vdiEnabled: boolean;
    vdiSessionCount: number;
    ideEnabled: boolean;
    storageAmount: number;
    applicationName: string;
    applicationVersion: string;
    devspaceUbuntuDistro: string;
    devspaceDesktop: string;
    devspaceVersion: string;
    workspaces: any;
  }) => {
    const response = await environmentApi.createEnvironment({
      name: "environment/createEnvironment",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              environments: [
                {
                  name: values?.environmentName,
                  domainName: values?.domainName,
                  fleetName: values?.fleetName,
                  gpuEnabledForCloudInstance:
                    values?.gpuEnabledForCloudInstance,
                  vdiEnabled: values?.vdiEnabled,
                  vdiSessionCount: values?.vdiSessionCount,
                  ideEnabled: values?.ideEnabled,
                  storageAmount: values?.storageAmount,
                  application: {
                    name: values?.applicationName,
                    version: values?.applicationVersion,
                  },
                  devspace: {
                    ubuntuDistro: values?.devspaceUbuntuDistro,
                    desktop: values?.devspaceDesktop,
                    version: values?.devspaceVersion,
                  },
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

export const getEnvironments = createAsyncThunk(
  "environment/getEnvironments",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
  }) => {
    const response = await environmentApi.getEnvironments({
      name: "environment/getEnvironments",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              environments: [{ fleetName: values?.fleetName }],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const EnvironmentSlice = createSlice({
  name: "environment",
  initialState: {},
  reducers: {},
});

export default EnvironmentSlice.reducer;
