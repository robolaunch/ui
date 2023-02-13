import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";

export const getRegions = createAsyncThunk(
  "cloud/getRegions",
  async (value: any, thunkAPI) => {
    console.log("slice", value.provider);
    try {
      const response = await axiosInstanceOrganization.post("/getRegions", {
        provider: value.provider,
      });
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

export const regionSlice = createSlice({
  name: "provider",
  initialState: {
    isSuccessGetRegions: false,
    isPendingGetRegions: false,
    isErrorGetRegions: false,
  },
  reducers: {},
  extraReducers: {
    [getRegions.fulfilled.toString()]: (state: any, { payload }: any) => {
      console.log(payload);
    },
    [getRegions.pending.toString()]: (state: any) => {
      state.isPendingGetRegions = true;
    },
    [getRegions.rejected.toString()]: (state: any, { payload }: any) => {
      state.isErrorGetRegions = true;
      state.isPendingGetRegions = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
  },
});

export default regionSlice.reducer;
