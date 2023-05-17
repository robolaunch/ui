import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createInstanceApi } from "../apis/api";
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
              instanceType: "g4dn.xlarge",
              name: values.cloudInstanceName,
              region: "eu-central-1",
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
      name: values.name,
      organizationId: values.organizationId,
      roboticsClouds: [{ name: values.roboticsCloudName }],
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
            { instanceId: values?.instanceId, region: "eu-central-1" },
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
      .addCase(getInstances.fulfilled, (state, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getInstances.rejected, (state, action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(createCloudInstance.fulfilled, (state, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(createCloudInstance.rejected, (state, action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(stopInstance.fulfilled, (state, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(stopInstance.rejected, (state, action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(startInstance.fulfilled, (state, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(startInstance.rejected, (state, action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(terminateInstance.fulfilled, (state, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(terminateInstance.rejected, (state, action: any) => {
        toast.error("Something went wrong");
      });
  },
});

export default instanceSlice.reducer;
