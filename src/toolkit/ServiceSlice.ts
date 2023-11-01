import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { kubernetesApi } from "../api/api";
import { toast } from "sonner";

export const restartService = createAsyncThunk(
  "service/restartService",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    environmentName: string;
    podName: string;
  }) => {
    const response = await kubernetesApi.restartPod({
      name: "service/restartService",
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
                  fleetName: values?.fleetName,
                  name: values?.environmentName,
                  podName: values?.podName,
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

export const vdiSoftReload = createAsyncThunk(
  "service/vdiSoftReload",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    environmentName: string;
    podName: string;
  }) => {
    const response = await kubernetesApi.vdiSoftReload({
      name: "service/vdiSoftReload",
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
                  fleetName: values?.fleetName,
                  name: values?.environmentName,
                  podName: values?.podName,
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

export const ServiceSlice = createSlice({
  name: "service",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(restartService.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(restartService.rejected, () => {
        toast.error("Something went wrong of restarting service");
      });
  },
});

export default ServiceSlice.reducer;
