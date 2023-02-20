import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";
import axiosInstanceOrganization from "../utils/axiosInterceptor";

export const UserSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {},
  extraReducers: {},
});

export default UserSlice.reducer;
