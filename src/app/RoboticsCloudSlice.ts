import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";

export const createRoboticsCloud = createAsyncThunk(
  "roboticsCloud/createRoboticsCloud",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/superCluster/${value.superClusterProcessId}/newRoboticsCloud`,
        {
          organization: {
            name: value.organization.name,
          },
          teamId: value.teamId,
          cloudInstanceName: value.cloudInstanceName,
          instanceType: value.instanceType,
          connectionHub: value.connectionHub,
        }
      );
      if (response.status === 200) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const roboticsCloudSlice = createSlice({
  name: "roboticsCloud",
  initialState: {
    isSuccessCreateRoboticsCloud: false,
    isPendingCreateRoboticsCloud: false,
    isErrorCreateRoboticsCloud: false,
  },
  reducers: {},
  extraReducers: {
    [createRoboticsCloud.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [createRoboticsCloud.pending.toString()]: (state: any) => {
      state.isPendingCreateRoboticsCloud = true;
    },
    [createRoboticsCloud.rejected.toString()]: (state: any) => {
      state.isPendingCreateRoboticsCloud = false;
      state.isErrorCreateRoboticsCloud = true;
    },
    //
    //
    //
  },
});

export default roboticsCloudSlice.reducer;
