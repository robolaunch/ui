import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";
import axiosInstanceOrganization from "../utils/axiosInterceptor";

export const OrganizationSlice = createSlice({
  name: "organization",
  initialState: {
    organizations: [],
    currentOrganization: {
      name: "mockOrganization",
    },
  },
  reducers: {},
  extraReducers: {},
});

export default OrganizationSlice.reducer;
