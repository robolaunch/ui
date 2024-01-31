import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createInstanceApi, kubernetesApi } from "../api/api";
import { toast } from "sonner";

export const createCloudInstance = createAsyncThunk(
  "instance/createCloudInstance",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceType: string;
    cloudInstanceName: string;
    region: string;
    developmentMode: boolean;
  }) => {
    const response = await createInstanceApi.createInstance({
      name: "instance/createCloudInstance",
      organizationId: values.organizationId,
      roboticsClouds: [
        {
          name: values.roboticsCloudName,
          cloudInstances: [
            {
              instanceType: values.instanceType,
              name: values.cloudInstanceName,
              region: values.region,
              developmentMode: values.developmentMode,
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getInstances = createAsyncThunk(
  "instance/getInstances",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    region: string;
    details: boolean;
  }) => {
    const response = await createInstanceApi.getAllInstancesOfRoboticsCloud({
      name: "instance/getInstances",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          region: values?.region,
          details: values?.details,
        },
      ],
    });
    return response.data;
  },
);

export const stopInstance = createAsyncThunk(
  "instance/stopInstance",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
  }) => {
    const response = await createInstanceApi.stopInstance({
      name: "instance/stopInstance",
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
  },
);

export const startInstance = createAsyncThunk(
  "instance/startInstance",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
  }) => {
    const response = await createInstanceApi.startInstance({
      name: "instance/startInstance",
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
  },
);

export const terminateInstance = createAsyncThunk(
  "instance/terminateInstance",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
  }) => {
    const response = await createInstanceApi.terminateInstance({
      name: "instance/terminateInstance",
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
  },
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
  },
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
  },
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
  },
);

export const getSystemStatus = createAsyncThunk(
  "instance/getSystemStatus",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
  }) => {
    const response = await kubernetesApi.getSystemStatus({
      name: "instance/getSystemStatus",
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
  },
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
        toast.error("Something went wrong of creating instance");
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
      // .addCase(getInstanceState.fulfilled, (_, action: any) => {
      //   if (!action?.payload?.success) {
      //     toast.error(action?.payload?.message);
      //   }
      // })
      // .addCase(getInstanceState.rejected, () => {
      //   toast.error("Something went wrong of getting instance state");
      // })
      .addCase(addPhysicalInstance.fulfilled, () => {
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
          "Something went wrong of adding physical instance to fleet",
        );
      })
      .addCase(getSystemStatus.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getSystemStatus.rejected, () => {
        toast.error("Something went wrong of getting system status");
      });
  },
});

export default instanceSlice.reducer;
