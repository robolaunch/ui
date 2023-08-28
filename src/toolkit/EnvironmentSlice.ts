import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { environmentApi } from "../api/api";
import {
  IcreateEnvironmentRequest,
  IgetEnvironmentRequest,
  IgetEnvironmentsRequest,
} from "../interfaces/environmentInterfaces";
import { toast } from "sonner";

export const getReadyEnvironments = createAsyncThunk(
  "environment/getReadyEnvironments",
  async () => {
    const response = await environmentApi.getRobolaunchReadyEnvironments({
      name: "environment/getReadyEnvironments",
    });
    return response.data;
  }
);

export const createEnvironment = createAsyncThunk(
  "environment/createEnvironment",
  async (values: IcreateEnvironmentRequest) => {
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
                  gpuEnabledForCloudInstance: true,
                  vdiEnabled: true,
                  vdiSessionCount: values?.vdiSessionCount,
                  ideEnabled: true,
                  ideGpuResource: values?.ideGpuResource,
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
  async (values: IgetEnvironmentsRequest) => {
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

export const getEnvironment = createAsyncThunk(
  "environment/getEnvironment",
  async (values: IgetEnvironmentRequest) => {
    const response = await environmentApi.getEnvironment({
      name: "environment/getEnvironment",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              environments: [
                { fleetName: values?.fleetName, name: values?.environmentName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const deleteEnvironment = createAsyncThunk(
  "environment/deleteEnvironment",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    environmentName: string;
  }) => {
    const response = await environmentApi.deleteEnvironment({
      name: "environment/deleteEnvironment",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              environments: [
                { fleetName: values?.fleetName, name: values?.environmentName },
              ],
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
  extraReducers: (builder) => {
    builder
      .addCase(createEnvironment.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createEnvironment.rejected, () => {
        toast.error("Something went wrong of creating application");
      })
      .addCase(getEnvironments.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getEnvironments.rejected, () => {
        toast.error("Something went wrong of getting applications");
      })
      .addCase(getEnvironment.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getEnvironment.rejected, () => {
        toast.error("Something went wrong of getting application");
      })
      .addCase(deleteEnvironment.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteEnvironment.rejected, () => {
        toast.error("Something went wrong of deleting application");
      });
  },
});

export default EnvironmentSlice.reducer;
