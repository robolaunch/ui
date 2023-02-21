import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptor from "../utils/axiosInterceptor";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";

export const createOrganization = createAsyncThunk(
  "organization/createOrganization",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/organizations`,
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
        `${process.env.REACT_APP_BACKEND_URL}/organizations`
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
  initialState: {
    organizations: [],
    currentOrganization: {
      name: "Organization1",
    },
  },
  reducers: {},
  extraReducers: {
    [createOrganization.pending.type]: (state, action) => {
      console.log("createOrganization.pending");
    },
    [createOrganization.fulfilled.type]: (state, action) => {
      console.log("createOrganization.fulfilled");
      if (action.payload.status) {
        toast.success(action?.payload?.data?.message, toastifyProperties);
      } else {
        toast.error(action?.payload?.data?.message, toastifyProperties);
      }
    },
    [createOrganization.rejected.type]: (state, action) => {
      console.log("createOrganization.rejected");
      toast.error("Error is fetcing data.", toastifyProperties);
    },
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
      toast.error("Error is fetcing data.", toastifyProperties);
    },
    //
    //
    //
  },
});

export default OrganizationSlice.reducer;
