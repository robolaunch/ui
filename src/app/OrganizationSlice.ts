import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";

export const createOrganization = createAsyncThunk(
  "organizations/createOrganization",
  async (value: any, thunkAPI) => {
    try {
      console.log("createOrg", value);
      const response = await axiosInstance.post(`/createOrganization`, {
        organization: {
          name: value.organization.name,
          enterprise: value.organization.enterprise,
        },
      });
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const loginOrganization = createAsyncThunk(
  "organizations/userLoginOrganization",
  async (values: any, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/userLoginOrganization`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginRequestOrganization: {
              username: values.username,
              password: values.password,
              organization: values.organization,
            },
          }),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (error) {}
  }
);

export const getOrganizations = createAsyncThunk(
  "organizations/getUserOrganizations",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/getUserOrganizations", {});
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getOrganizationUsers = createAsyncThunk(
  "organizations/getOrganizationUsers",
  async (value: any, thunkAPI) => {
    console.log("istek bu ", value);
    try {
      const response = await axiosInstanceOrganization.post(
        "/getOrganizationUsers",
        {
          organization: {
            name: value.organization.name,
          },
        }
      );
      console.log("slices", response);
      if (response.status === 201) {
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
      name: "",
    },

    isSuccessLoginOrganization: false,
    isPendingLoginOrganization: false,
    isErrorLoginOrganization: false,

    isSuccessCreateOrganization: false,
    isPendingCreateOrganization: false,
    isErrorCreateOrganization: false,

    isSuccessGetOrganizations: false,
    isErrorGetOrganizations: false,
    isPendingGetOrganizations: false,

    isSuccessGetOrganizationUsers: false,
    isErrorGetOrganizationUsers: false,
    isPendingGetOrganizationUsers: false,
  },
  reducers: {
    clearStateCreateOrganization: (state) => {
      state.isSuccessCreateOrganization = false;
      state.isPendingCreateOrganization = false;
      state.isErrorCreateOrganization = false;
    },
  },
  extraReducers: {
    [loginOrganization.fulfilled.toString()]: (state, { payload }) => {
      console.log("loginOrganization fulfilled: ", payload);
      state.isPendingLoginOrganization = false;
      if (payload.responseLogin.success) {
        state.isSuccessLoginOrganization = true;
        localStorage.setItem(
          "authTokens_organization",
          JSON.stringify(payload.responseLogin.data)
        );
        state.currentOrganization.name =
          payload.responseLogin.data.organization;
        window.location.reload();
      } else {
        toast.error(payload.responseLogin.message, toastifyProperties);
      }
    },
    [loginOrganization.pending.toString()]: (state) => {
      console.log("loginOrganization pending");
      state.isPendingLoginOrganization = true;
    },
    [loginOrganization.rejected.toString()]: (state, { payload }) => {
      console.log("loginOrganization rejected: ", payload);
      state.isPendingLoginOrganization = false;
      state.isErrorLoginOrganization = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getOrganizations.fulfilled.toString()]: (state: any, { payload }: any) => {
      console.log(payload);
      if (payload?.data?.responseUserOrganizations?.success) {
        state.isSuccessGetOrganizations = true;
        state.organizations = payload.data.responseUserOrganizations.data;
      } else {
        state.isSuccessGetOrganizations = false;
        state.isErrorGetOrganizations = true;
        toast.error(
          payload?.data?.responseUserOrganizations?.message,
          toastifyProperties
        );
      }
    },
    [getOrganizations.pending.toString()]: (state: any) => {
      state.isPendingGetOrganizations = true;
    },
    [getOrganizations.rejected.toString()]: (state: any) => {
      state.isPendingGetOrganizations = false;
      state.isErrorGetOrganizations = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [createOrganization.fulfilled.toString()]: (
      state: any,
      { payload }: any
    ) => {
      if (payload.data.plainResponse.success) {
        state.isSuccessCreateOrganization = true;
        toast.success(payload.data.plainResponse.message, toastifyProperties);
      } else {
        state.isSuccessCreateOrganization = false;
        state.isErrorCreateOrganization = true;
        toast.error(payload.data.plainResponse.message, toastifyProperties);
      }
    },
    [createOrganization.pending.toString()]: (state: any) => {
      state.isPendingCreateOrganization = true;
    },
    [createOrganization.rejected.toString()]: (
      state: any,
      { payload }: any
    ) => {
      state.isPendingCreateOrganization = false;
      state.isErrorCreateOrganization = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getOrganizationUsers.fulfilled.toString()]: (
      state: any,
      { payload }: any
    ) => {
      console.log(payload);
    },
    [getOrganizationUsers.pending.toString()]: (state: any) => {
      state.isPendingGetOrganizationUsers = true;
    },
    [getOrganizationUsers.rejected.toString()]: (
      state: any,
      { payload }: any
    ) => {
      state.isPendingGetOrganizationUsers = false;
      state.isErrorGetOrganizationUsers = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
  },
});

export const { clearStateCreateOrganization } = OrganizationSlice.actions;
export default OrganizationSlice.reducer;
