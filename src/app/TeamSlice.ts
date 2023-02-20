import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";

export const teamSlice = createSlice({
  name: "team",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default teamSlice.reducer;
