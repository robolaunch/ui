import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptor from "../utils/axios.interceptor";
import { toast } from "react-toastify";

export const getProviders = createAsyncThunk(
  "provider/getProviders",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/providers`
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

export const providerSlice = createSlice({
  name: "provider",
  initialState: {},
  reducers: {},
  extraReducers: {
    [getProviders.pending.type]: (state, action) => {
      console.log("getProviders.pending");
    },
    [getProviders.fulfilled.type]: (state, action) => {
      console.log("getProviders.fulfilled");
    },
    [getProviders.rejected.type]: (state, action) => {
      console.log("getProviders.rejected");
      toast.error("Error is fetcing data.");
    },
  },
});

export default providerSlice.reducer;
