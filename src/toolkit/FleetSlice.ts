import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { kubernetesApi } from "../api/api";
import { toast } from "sonner";
import {
  IgetNamespace,
  IgetNamespaces,
} from "../interfaces/useFunctionsInterfaces";

export const createFederatedFleet = createAsyncThunk(
  "fleet/createFederatedFleet",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    robolaunchFederatedFleetsName: string;
  }) => {
    const response = await kubernetesApi.createFederatedFleet({
      name: "fleet/createFederatedFleet",
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
  "fleet/getFederatedFleets",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    region: string;
    instanceId: string;
  }) => {
    const response = await kubernetesApi.getFederatedFleets({
      name: "fleet/getFederatedFleets",
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

export const deleteFederatedFleet = createAsyncThunk(
  "fleet/deleteFederatedFleet",
  async (values: any) => {
    const response = await kubernetesApi.deleteFederatedFleet({
      name: "fleet/deleteFederatedFleet",
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

export const createNamespace = createAsyncThunk(
  "fleet/createNamespace",
  async (values: IgetNamespace) => {
    const response = await kubernetesApi.createNamespace({
      name: "fleet/createNamespace",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchNamespaces: [{ name: values?.namespaceName }],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const getNamespaces = createAsyncThunk(
  "fleet/getNamespaces",
  async (values: IgetNamespaces) => {
    const response = await kubernetesApi.getNamespaces({
      name: "fleet/getNamespaces",
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

export const deleteNamespace = createAsyncThunk(
  "fleet/deleteNamespace",
  async (values: IgetNamespace) => {
    const response = await kubernetesApi.deleteNamespace({
      name: "fleet/deleteNamespace",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchNamespaces: [{ name: values?.namespaceName }],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const FleetSlice = createSlice({
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
      .addCase(createFederatedFleet.rejected, () => {
        toast.error("Something went wrong of creating fleet");
      })
      .addCase(getFederatedFleets.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getFederatedFleets.rejected, () => {
        toast.error(`Something went wrong of getting fleets`);
      })
      .addCase(deleteFederatedFleet.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteFederatedFleet.rejected, () => {
        toast.error("Something went wrong of deleting fleet");
      })
      .addCase(createNamespace.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createNamespace.rejected, () => {
        toast.error("Something went wrong of creating namespace");
      });
  },
});

export default FleetSlice.reducer;
