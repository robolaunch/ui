import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptor from "../utils/axiosInterceptor";
import { toast } from "sonner";
// import { toastifyProperties } from "../tools/Toastify";
// import { toast } from "react-toastify";

export const createOrganization = createAsyncThunk(
  "organization/createOrganization",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/createOrganization`,
        {
          name: values.name,
        }
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

export const getOrganizations = createAsyncThunk(
  "organization/getOrganizations",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/getOrganizationsWithGroups`
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

export const OrganizationSlice = createSlice({
  name: "organization",
  initialState: {},
  reducers: {},
  extraReducers: {
    [createOrganization.pending.type]: (state, action) => {
      console.log("createOrganization.pending");
    },
    //
    [createOrganization.fulfilled.type]: (state, action) => {
      if (action.payload.data.success) {
        toast.success(action?.payload?.data?.message);
      } else {
        toast.error(action?.payload?.data?.message);
      }
    },
    //
    [createOrganization.rejected.type]: (state, action) => {
      console.log("createOrganization.rejected");
      toast.error("Error is fetcing data.");
    },
    //
    //
    //
    //
    //
    //
    //
    [getOrganizations.pending.type]: (state, action) => {
      console.log("getOrganizations.pending");
    },
    [getOrganizations.fulfilled.type]: (state, action) => {
      console.log("getOrganizations.fulfilled");
    },
    [getOrganizations.rejected.type]: (state, action) => {
      console.log("getOrganizations.rejected");
      toast.error("Error is fetcing data.");
    },
    //
    //
    //
    //
    //
    //
    //
  },
});

export default OrganizationSlice.reducer;
