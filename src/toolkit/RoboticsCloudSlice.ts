import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createInstanceApi } from "../api/api";
import { toast } from "sonner";
import {
  ICreateRoboticsCloudRequest,
  IGetRoboticsCloudsRequest,
} from "../interfaces/roboticsCloudInterfaces";

export const createRoboticsCloud = createAsyncThunk(
  "roboticsCloud/createRoboticsCloud",
  async (values: ICreateRoboticsCloudRequest) => {
    const response = await createInstanceApi.createRoboticsCloud({
      name: "roboticsCloud/createRoboticsCloud",
      organizationId: values.organizationId,
      roboticsClouds: [
        { name: values.roboticsCloudName, region: values.region },
      ],
    });
    return response.data;
  },
);

export const getRoboticsClouds = createAsyncThunk(
  "roboticsCloud/getRoboticsCloudsOfOrganization",
  async (values: IGetRoboticsCloudsRequest) => {
    const response = await createInstanceApi.getRoboticsClouds({
      name: "roboticsCloud/getRoboticsCloudsOfOrganization",
      organizationId: values.organizationId,
    });
    return response.data;
  },
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
        toast.error("Something went wrong of creating region.");
      })
      .addCase(getRoboticsClouds.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getRoboticsClouds.rejected, () => {
        toast.error("Something went wrong of getting regions.");
      });
  },
});

export default roboticsCloudSlice.reducer;
