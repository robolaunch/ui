import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInterceptor";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";

export const robotSlice = createSlice({
  name: "robot",
  initialState: {},
  reducers: {},
  extraReducers: {},
});
