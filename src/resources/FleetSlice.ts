import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { kubernetesApi } from "../api/api";
import { toast } from "sonner";

export const createFederatedFleet = createAsyncThunk(
  "instance/createFederatedFleet",
  async (values: any) => {
    const response = await kubernetesApi.createFederatedFleet({
      name: values?.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedFleets: [
                { name: values?.robolaunchFederatedFleetsName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const getFederatedFleets = createAsyncThunk(
  "instance/getFederatedFleets",
  async (values: any) => {
    const response = await kubernetesApi.getFederatedFleets({
      name: values?.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            { instanceId: values?.instanceId, region: values?.region },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const getFederatedFleetStatus = createAsyncThunk(
  "instance/getFederatedFleetStatus",
  async (values: any) => {
    const response = await kubernetesApi.getFederatedFleetStatus({
      name: values.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedFleets: [{ name: values?.fleetName }],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const deleteFederatedFleet = createAsyncThunk(
  "instance/deleteFederatedFleet",
  async (values: any) => {
    const response = await kubernetesApi.deleteFederatedFleet({
      name: values?.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedFleets: [
                { name: values?.robolaunchFederatedFleetsName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const fleetSlice = createSlice({
  name: "fleet",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFederatedFleet.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createFederatedFleet.rejected, (_) => {
        toast.error("Something went wrong (createFederatedFleet)");
      })
      .addCase(getFederatedFleets.rejected, (_) => {
        toast.error("Something went wrong (getFederatedFleets)");
      })
      .addCase(getFederatedFleetStatus.rejected, (_) => {
        toast.error("Something went wrong (getFederatedFleetStatus)");
      })
      .addCase(deleteFederatedFleet.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteFederatedFleet.rejected, (_) => {
        toast.error("Something went wrong (deleteFederatedFleet)");
      });
  },
});

export default fleetSlice.reducer;
