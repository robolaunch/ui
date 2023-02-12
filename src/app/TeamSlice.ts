import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post("/createTeam", {
        organization: {
          name: values.organization.name,
        },
        teamName: values.teamName,
      });
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post("/getTeams", {
        organization: {
          name: values.organization.name,
        },
      });
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    isSuccessCreateTeam: false,
    isPendingCreateTeam: false,
    isErrorCreateTeam: false,

    isSuccessGetTeams: false,
    isPendingGetTeams: false,
    isErrorGetTeams: false,
  },
  reducers: {},
  extraReducers: {
    [getTeams.fulfilled.toString()]: (state, { payload }) => {
      state.isPendingGetTeams = false;
      if (payload?.data?.teams?.success) {
        state.isSuccessGetTeams = true;
      } else {
        state.isErrorGetTeams = true;
      }
    },
    [getTeams.pending.toString()]: (state) => {
      state.isPendingGetTeams = true;
    },
    [getTeams.rejected.toString()]: (state) => {
      state.isPendingGetTeams = false;
      state.isErrorGetTeams = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [createTeam.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
      if (payload?.data?.plainResponse?.success) {
        state.isSuccessCreateTeam = true;
        toast.success(payload.data.plainResponse.message, toastifyProperties);
      } else {
        state.isErrorCreateTeam = true;
        toast.error(payload.data.plainResponse.message, toastifyProperties);
      }
    },
    [createTeam.pending.toString()]: (state) => {
      state.isPendingCreateTeam = true;
    },
    [createTeam.rejected.toString()]: (state) => {
      state.isPendingCreateTeam = false;
      state.isErrorCreateTeam = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
  },
});

export default teamSlice.reducer;
