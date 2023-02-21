import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptor from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/teams`,
        {
          name: values.name,
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

export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/teams`
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

export const teamSlice = createSlice({
  name: "team",
  initialState: {},
  reducers: {},
  extraReducers: {
    [createTeam.pending.type]: (state, action) => {
      console.log("createTeam.pending");
    },
    [createTeam.fulfilled.type]: (state, action) => {
      console.log("createTeam.fulfilled");
      if (action.payload.status) {
        toast.success(action?.payload?.data?.message, toastifyProperties);
      } else {
        toast.error(action?.payload?.data?.message, toastifyProperties);
      }
    },
    [createTeam.rejected.type]: (state, action) => {
      console.log("createTeam.rejected");
      toast.error("Error is fetcing data.", toastifyProperties);
    },
    //
    //
    //
    [getTeams.pending.type]: (state, action) => {
      console.log("getTeams.pending");
    },
    [getTeams.fulfilled.type]: (state, action) => {
      console.log("getTeams.fulfilled");
    },
    [getTeams.rejected.type]: (state, action) => {
      console.log("getTeams.rejected");
      toast.error("Error is fetcing data.", toastifyProperties);
    },
  },
});

export default teamSlice.reducer;
