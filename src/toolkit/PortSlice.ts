import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { kubernetesApi } from "../api/api";

export const getPort = createAsyncThunk(
  "port/getFreeNodePort",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
  }) => {
    const response = await kubernetesApi.getFreeNodePort({
      name: "port/getFreeNodePort",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const PortSlice = createSlice({
  name: "port",
  initialState: {},
  reducers: {},
});

export default PortSlice.reducer;
