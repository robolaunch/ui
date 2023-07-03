import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createInstanceApi, kubernetesApi } from "../api/api";
import { toast } from "sonner";

export const createCloudInstance = createAsyncThunk(
  "instance/createCloudInstance",
  async (values: any) => {
    const response = await createInstanceApi.createInstance({
      name: values.name,
      organizationId: values.organizationId,
      roboticsClouds: [
        {
          name: values.roboticsCloudName,
          cloudInstances: [
            {
              instanceType: values.instanceType,
              name: values.cloudInstanceName,
              region: values.region,
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const getInstances = createAsyncThunk(
  "instance/getInstances",
  async (values: any) => {
    const response = await createInstanceApi.getAllInstancesOfRoboticsCloud({
      name: values?.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        { name: values?.roboticsCloudName, region: values?.region },
      ],
    });
    return response.data;
  }
);

export const getInstanceState = createAsyncThunk(
  "instance/getInstancestate",
  async (values: any) => {
    const response = await createInstanceApi.getCloudState({
      name: values?.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            { instanceId: values?.instanceId, region: "eu-central-1" },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const stopInstance = createAsyncThunk(
  "instance/stopInstance",
  async (values: any) => {
    const response = await createInstanceApi.stopInstance({
      name: values.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            { instanceId: values?.instanceId, region: "eu-central-1" },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const startInstance = createAsyncThunk(
  "instance/startInstance",
  async (values: any) => {
    const response = await createInstanceApi.startInstance({
      name: values.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            { instanceId: values?.instanceId, region: "eu-central-1" },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const terminateInstance = createAsyncThunk(
  "instance/terminateInstance",
  async (values: any) => {
    const response = await createInstanceApi.terminateInstance({
      name: values.name,
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

export const addPhysicalInstance = createAsyncThunk(
  "instance/addPhysicalInstance",
  async (values: any) => {
    const response = await kubernetesApi.addPhysicalInstance({
      name: values?.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchPhysicalInstances: [
                { name: values?.robolaunchPhysicalInstancesName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const getPhysicalInstances = createAsyncThunk(
  "instance/getPhysicalInstances",
  async (values: any) => {
    const response = await kubernetesApi.getPhysicalInstances({
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

export const addPhysicalInstanceToFleet = createAsyncThunk(
  "instance/addPhysicalInstanceToFleet",
  async (values: any) => {
    const response = await kubernetesApi.addPhysicalInstanceToFleet({
      name: values?.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchPhysicalInstances: [
                { name: values?.robolaunchPhysicalInstancesName },
              ],
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

export const instanceSlice = createSlice({
  name: "instance",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCloudInstance.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(createCloudInstance.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(getInstances.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getInstances.rejected, () => {
        toast.error("Something went wrong of getting instances");
      })
      .addCase(stopInstance.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(stopInstance.rejected, () => {
        toast.error("Something went wrong of stopping instance");
      })
      .addCase(startInstance.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(startInstance.rejected, () => {
        toast.error("Something went wrong of starting instance");
      })
      .addCase(terminateInstance.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(terminateInstance.rejected, () => {
        toast.error("Something went wrong of terminating instance");
      })
      .addCase(getInstanceState.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getInstanceState.rejected, () => {
        toast.error("Something went wrong of getting instance state");
      })
      .addCase(addPhysicalInstance.fulfilled, (_, action: any) => {
        toast.success("Physical instance added successfully");
      })
      .addCase(addPhysicalInstance.rejected, () => {
        toast.error("Something went wrong of adding physical instance");
      })
      .addCase(addPhysicalInstanceToFleet.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(addPhysicalInstanceToFleet.rejected, () => {
        toast.error(
          "Something went wrong of adding physical instance to fleet"
        );
      });
  },
});

export default instanceSlice.reducer;
