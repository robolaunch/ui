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

export const inviteUser = createAsyncThunk(
  "/inviteUser",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post("/inviteUser", {
        organization: {
          name: values.organization.name,
        },
        email: values.email,
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

export const addUserToOrganizationAsManager = createAsyncThunk(
  "/addUserToOrganizationAsManager",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/addUserToOrganizationAsManager",
        {
          organization: {
            name: value.organization.name,
          },
          user: {
            username: value.user.username,
          },
        }
      );
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

export const deleteUserManagershipFromOrganization = createAsyncThunk(
  "/deleteUserManagershipFromOrganization",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/deleteUserManagershipFromOrganization",
        {
          organization: {
            name: value.organization.name,
          },
          user: {
            username: value.user.username,
          },
        }
      );
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

export const invitedUserRegistration = createAsyncThunk(
  "organizations/invitedUserRegistration",
  async (value: any, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/invitedUserRegistration`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );
      const data = await response.json();
      if (response.status === 201) {
        return data.user;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const invitedUserAccepted = createAsyncThunk(
  "/invitedUserAccepted",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/invitedUserAccepted", value);
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

export const invitedUserRejected = createAsyncThunk(
  "/invitedUserRejected",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/invitedUserRejected", value);
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

export const deleteUserFromOrganization = createAsyncThunk(
  "/deleteUserFromOrganization",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/deleteUserFromOrganization", {
        organization: {
          name: value.organization.name,
        },
        user: {
          username: value.user.username,
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

    isSuccessInviteUser: false,
    isErrorInviteUser: false,
    isPendingInviteUser: false,

    isSuccessAddUserToOrganizationAsManager: false,
    isErrorAddUserToOrganizationAsManager: false,
    isPendingAddUserToOrganizationAsManager: false,

    isSuccessDeleteUserManagershipFromOrganization: false,
    isErrorDeleteUserManagershipFromOrganization: false,
    isPendingDeleteUserManagershipFromOrganization: false,

    isSuccessInvitedUserRegistration: false,
    isErrorInvitedUserRegistration: false,
    isPendingInvitedUserRegistration: false,

    isSuccessInvitedUserAccepted: false,
    isErrorInvitedUserAccepted: false,
    isPendingInvitedUserAccepted: false,

    isSuccessInvitedUserRejected: false,
    isErrorInvitedUserRejected: false,
    isPendingInvitedUserRejected: false,

    isSuccessDeleteUserFromOrganization: false,
    isErrorDeleteUserFromOrganization: false,
    isPendingDeleteUserFromOrganization: false,
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
    //
    //
    //
    [inviteUser.fulfilled.toString()]: (state: any, { payload }: any) => {
      console.log(payload);
    },
    [inviteUser.pending.toString()]: (state: any) => {
      state.isPendingInviteUser = true;
    },
    [inviteUser.rejected.toString()]: (state: any, { payload }: any) => {
      state.isPendingInviteUser = false;
      state.isErrorInviteUser = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [addUserToOrganizationAsManager.fulfilled.toString()]: (
      state: any,
      { payload }: any
    ) => {
      console.log(payload);
    },
    [addUserToOrganizationAsManager.pending.toString()]: (state: any) => {
      state.isPendingAddUserToOrganizationAsManager = true;
    },
    [addUserToOrganizationAsManager.rejected.toString()]: (
      state: any,
      { payload }: any
    ) => {
      state.isPendingAddUserToOrganizationAsManager = false;
      state.isErrorAddUserToOrganizationAsManager = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [deleteUserManagershipFromOrganization.fulfilled.toString()]: (
      state: any,
      { payload }: any
    ) => {
      console.log(payload);
    },
    [deleteUserManagershipFromOrganization.pending.toString()]: (
      state: any
    ) => {
      state.isPendingDeleteUserManagershipFromOrganization = true;
    },
    [deleteUserManagershipFromOrganization.rejected.toString()]: (
      state: any,
      { payload }: any
    ) => {
      state.isPendingDeleteUserManagershipFromOrganization = false;
      state.isErrorDeleteUserManagershipFromOrganization = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [invitedUserRegistration.fulfilled.toString()]: (
      state: any,
      { payload }: any
    ) => {
      console.log(payload);
    },
    [invitedUserRegistration.pending.toString()]: (state: any) => {
      state.isPendingInvitedUserRegistration = true;
    },
    [invitedUserRegistration.rejected.toString()]: (
      state: any,
      { payload }: any
    ) => {
      state.isPendingInvitedUserRegistration = false;
      state.isErrorInvitedUserRegistration = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [invitedUserAccepted.fulfilled.toString()]: (
      state: any,
      { payload }: any
    ) => {
      console.log(payload);
    },
    [invitedUserAccepted.pending.toString()]: (state: any) => {
      state.isPendingInvitedUserAccepted = true;
    },
    [invitedUserAccepted.rejected.toString()]: (
      state: any,
      { payload }: any
    ) => {
      state.isPendingInvitedUserAccepted = false;
      state.isErrorInvitedUserAccepted = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [invitedUserRejected.fulfilled.toString()]: (
      state: any,
      { payload }: any
    ) => {
      console.log(payload);
    },
    [invitedUserRejected.pending.toString()]: (state: any) => {
      state.isPendingInvitedUserRejected = true;
    },
    [invitedUserRejected.rejected.toString()]: (
      state: any,
      { payload }: any
    ) => {
      state.isPendingInvitedUserRejected = false;
      state.isErrorInvitedUserRejected = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [deleteUserFromOrganization.fulfilled.toString()]: (
      state: any,
      { payload }: any
    ) => {
      console.log(payload);
    },
    [deleteUserFromOrganization.pending.toString()]: (state: any) => {
      state.isPendingDeleteUserFromOrganization = true;
    },
    [deleteUserFromOrganization.rejected.toString()]: (
      state: any,
      { payload }: any
    ) => {
      state.isPendingDeleteUserFromOrganization = false;
      state.isErrorDeleteUserFromOrganization = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
  },
});

export const { clearStateCreateOrganization } = OrganizationSlice.actions;
export default OrganizationSlice.reducer;
