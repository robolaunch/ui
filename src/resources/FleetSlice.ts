import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptor from "../utils/axios.interceptor";
import { toast } from "react-toastify";

export const createFleet = createAsyncThunk(
  "fleet/createFleets",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/fleets`,
        {
          teamName: values.teamName,
          roboticsCloudName: values.roboticsCloudName,
          name: values.name,
          isFederated: values.isFederated,
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

export const getFleets = createAsyncThunk(
  "fleet/getFleets",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/fleets`
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

export const getFleetsByTeam = createAsyncThunk(
  "fleet/getFleetsByTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/fleets/${values.teamName}`
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

export const getFleetsByRoboticsCloud = createAsyncThunk(
  "fleet/getFleetsByRoboticsCloud",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/fleets/${values.teamName}/${values.roboticsCloudName}`
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

export const fleetSlice = createSlice({
  name: "fleet",
  initialState: {},
  reducers: {},
  extraReducers: {
    [createFleet.pending.type]: (state, action) => {
      console.log("createFleet.pending");
    },
    [createFleet.fulfilled.type]: (state, action) => {
      console.log("createFleet.fulfilled");
      if (action.payload.status) {
        toast.success(action?.payload?.data?.message);
      } else {
        toast.error(action?.payload?.data?.message);
      }
    },
    [createFleet.rejected.type]: (state, action) => {
      console.log("createFleet.rejected");
      toast.error("Error is fetcing data.");
    },
    //
    //
    //
    [getFleets.pending.type]: (state, action) => {
      console.log("getFleets.pending");
    },
    [getFleets.fulfilled.type]: (state, action) => {
      console.log("getFleets.fulfilled");
    },
    [getFleets.rejected.type]: (state, action) => {
      console.log("getFleets.rejected");
      toast.error("Error is fetcing data.");
    },
    //
    //
    //
    [getFleetsByTeam.pending.type]: (state, action) => {
      console.log("getFleetsByTeamName.pending");
    },
    [getFleetsByTeam.fulfilled.type]: (state, action) => {
      console.log("getFleetsByTeamName.fulfilled");
    },
    [getFleetsByTeam.rejected.type]: (state, action) => {
      console.log("getFleetsByTeamName.rejected");
      toast.error("Error is fetcing data.");
    },
    //
    //
    //
    [getFleetsByRoboticsCloud.pending.type]: (state, action) => {
      console.log("getFleetsByRoboticsCloudName.pending");
    },
    [getFleetsByRoboticsCloud.fulfilled.type]: (state, action) => {
      console.log("getFleetsByRoboticsCloudName.fulfilled");
    },
    [getFleetsByRoboticsCloud.rejected.type]: (state, action) => {
      console.log("getFleetsByRoboticsCloudName.rejected");
      toast.error("Error is fetcing data.");
    },
  },
});

export default fleetSlice.reducer;
