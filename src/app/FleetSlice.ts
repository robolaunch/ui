import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";

export const fleetSlice = createSlice({
  name: "fleet",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default fleetSlice.reducer;
