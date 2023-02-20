import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInterceptor";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";

export const providerSlice = createSlice({
  name: "provider",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default providerSlice.reducer;
