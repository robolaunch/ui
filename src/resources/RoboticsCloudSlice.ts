import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createInstanceApi } from "../api/api";
import { toast } from "sonner";

export const createRoboticsCloud = createAsyncThunk(
  "roboticsCloud/createRoboticsCloud",
  async (values: any) => {
    const response = await createInstanceApi.createRoboticsCloud({
      name: values.name,
      organizationId: values.organizationId,
      roboticsClouds: [
        { name: values.roboticsCloudName, region: values.region },
      ],
    });
    return response.data;
  }
);

export const getRoboticsCloudsOfOrganization = createAsyncThunk(
  "roboticsCloud/getRoboticsCloudsOfOrganization",
  async (values: any) => {
    const response = await createInstanceApi.getRoboticsClouds({
      name: values.name,
      organizationId: values.organizationId,
    });
    return response.data;
  }
);

export const roboticsCloudSlice = createSlice({
  name: "roboticsCloud",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRoboticsCloud.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(createRoboticsCloud.rejected, () => {
        toast.error("Something went wrong of creating robotics cloud");
      })
      .addCase(getRoboticsCloudsOfOrganization.rejected, () => {
        toast.error("Something went wrong of getting robotics clouds");
      });
  },
});

export default roboticsCloudSlice.reducer;
