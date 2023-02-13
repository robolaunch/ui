import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";

export const getProviders = createAsyncThunk(
  "provider/getProviders",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        "/getProviders",
        {}
      );
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const providerSlice = createSlice({
  name: "provider",
  initialState: {
    isSuccessGetProviders: false,
    isPendingGetProviders: false,
    isErrorGetProviders: false,
  },
  reducers: {},
  extraReducers: {
    [getProviders.fulfilled.toString()]: (state: any, { payload }: any) => {
      console.log(payload);
    },
    [getProviders.pending.toString()]: (state: any) => {
      state.isPendingGetProviders = true;
    },
    [getProviders.rejected.toString()]: (state: any, { payload }: any) => {
      state.isErrorGetProviders = true;
      state.isPendingGetProviders = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
  },
});

export default providerSlice.reducer;
