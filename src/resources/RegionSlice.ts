import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptor from "../utils/axios.interceptor";
import { toast } from "react-toastify";

export const getRegions = createAsyncThunk(
  "provider/getRegions",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/regions/${values.providerName}`
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

export const regionSlice = createSlice({
  name: "region",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getRegions.pending.type]: (state, action) => {
      console.log("getRegions.pending");
    },
    [getRegions.fulfilled.type]: (state, action) => {
      console.log("getRegions.fulfilled");
    },
    [getRegions.rejected.type]: (state, action) => {
      console.log("getRegions.rejected");
      toast.error("Error is fetcing data.");
    },
  },
});

export default regionSlice.reducer;
