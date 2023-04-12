import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axios.interceptor";

export const getRobots = createAsyncThunk(
  "robot/getRobots",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.get(
        `${process.env.REACT_APP_BACKEND_URL}/robots`
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

export const getRobotsByTeam = createAsyncThunk(
  "robot/getRobotsByTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.get(
        `${process.env.REACT_APP_BACKEND_URL}/robots/${values.teamName}`
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

export const getRobotsByRoboticsCloud = createAsyncThunk(
  "robot/getRobotsByRoboticsCloud",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.get(
        `${process.env.REACT_APP_BACKEND_URL}/robots/${values.teamName}/${values.roboticsCloudName}`
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

export const getRobotsByFleet = createAsyncThunk(
  "robot/getRobotsByFleet",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.get(
        `${process.env.REACT_APP_BACKEND_URL}/robots/${values.teamName}/${values.roboticsCloudName}/${values.fleetName}`
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

export const robotSlice = createSlice({
  name: "robot",
  initialState: {
    robots: [],
  },
  reducers: {},
  extraReducers: {
    [getRobots.pending.type]: (state, action) => {
      console.log("getRobots.pending");
    },
    [getRobots.fulfilled.type]: (state, action) => {
      console.log("getRobots.fulfilled");
    },
    [getRobots.rejected.type]: (state, action) => {
      console.log("getRobots.rejected");
    },
    //
    //
    //
    [getRobotsByTeam.pending.type]: (state, action) => {
      console.log("getRobotsByTeam.pending");
    },
    [getRobotsByTeam.fulfilled.type]: (state, action) => {
      console.log("getRobotsByTeam.fulfilled");
    },
    [getRobotsByTeam.rejected.type]: (state, action) => {
      console.log("getRobotsByTeam.rejected");
    },
    //
    //
    //
    [getRobotsByRoboticsCloud.pending.type]: (state, action) => {
      console.log("getRobotsByRoboticsCloud.pending");
    },
    [getRobotsByRoboticsCloud.fulfilled.type]: (state, action) => {
      console.log("getRobotsByRoboticsCloud.fulfilled");
    },
    [getRobotsByRoboticsCloud.rejected.type]: (state, action) => {
      console.log("getRobotsByRoboticsCloud.rejected");
    },
    //
    //
    //
    [getRobotsByFleet.pending.type]: (state, action) => {
      console.log("getRobotsByFleet.pending");
    },
    [getRobotsByFleet.fulfilled.type]: (state, action) => {
      console.log("getRobotsByFleet.fulfilled");
    },
    [getRobotsByFleet.rejected.type]: (state, action) => {
      console.log("getRobotsByFleet.rejected");
    },
  },
});
