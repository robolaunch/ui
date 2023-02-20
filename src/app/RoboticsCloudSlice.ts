import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInterceptor";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";

export const roboticsCloudSlice = createSlice({
  name: "roboticsCloud",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default roboticsCloudSlice.reducer;
