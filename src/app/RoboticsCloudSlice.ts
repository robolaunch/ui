import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptor from "../utils/axiosInterceptor";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";

export const createRoboticsCloud = createAsyncThunk(
  "roboticsCloud/createRoboticsCloud",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/roboticsClouds`,
        {
          teamName: values.teamName,
          provider: values.provider,
          region: values.region,
          name: values.name,
          instanceType: values.instanceType,
          connectionHub: values.connectionHub,
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

export const getRoboticsClouds = createAsyncThunk(
  "roboticsCloud/getRoboticsClouds",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/roboticsClouds`
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

export const getRoboticsCloudsByTeam = createAsyncThunk(
  "roboticsCloud/getRoboticsCloudsByTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/roboticsClouds/${values.teamName}`
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
  initialState: {},
  reducers: {},
  extraReducers: {
    [createRoboticsCloud.pending.type]: (state, action) => {
      console.log("createRoboticsCloud.pending");
    },
    [createRoboticsCloud.fulfilled.type]: (state, action) => {
      console.log("createRoboticsCloud.fulfilled");
      if (action.payload.status) {
        toast.success(action?.payload?.data?.message, toastifyProperties);
      } else {
        toast.error(action?.payload?.data?.message, toastifyProperties);
      }
    },
    [createRoboticsCloud.rejected.type]: (state, action) => {
      console.log("createRoboticsCloud.rejected");
      toast.error("Error is creating data.", toastifyProperties);
    },
    //
    //
    //
    [getRoboticsClouds.pending.type]: (state, action) => {
      console.log("getRoboticsClouds.pending");
    },
    [getRoboticsClouds.fulfilled.type]: (state, action) => {
      console.log("getRoboticsClouds.fulfilled");
    },
    [getRoboticsClouds.rejected.type]: (state, action) => {
      console.log("getRoboticsClouds.rejected");
      toast.error("Error is fetcing data.", toastifyProperties);
    },
    //
    //
    //
    [getRoboticsCloudsByTeam.pending.type]: (state, action) => {
      console.log("getRoboticsCloudsByTeamName.pending");
    },
    [getRoboticsCloudsByTeam.fulfilled.type]: (state, action) => {
      console.log("getRoboticsCloudsByTeamName.fulfilled");
    },
    [getRoboticsCloudsByTeam.rejected.type]: (state, action) => {
      console.log("getRoboticsCloudsByTeamName.rejected");
      toast.error("Error is fetcing data.", toastifyProperties);
    },
  },
});

export default roboticsCloudSlice.reducer;
