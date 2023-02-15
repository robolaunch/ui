import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";

export const registerUser = createAsyncThunk(
  "user/register",
  async (values: any, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/userRegistration`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              username: values.username,
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
            },
          }),
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

export const loginUser = createAsyncThunk(
  "user/login",
  async (values: any, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/userLogin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loginRequest: {
              username: values.username,
              password: values.password,
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
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "organizations/getCurrentUser",
  async (value: any, thunkAPI) => {
    console.log("getCurrent", value);
    try {
      const response = await axiosInstanceOrganization.post(`/getCurrentUser`, {
        organization: {
          name: value.organization.name,
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

export const forgotPassword = createAsyncThunk(
  "user/forgotPassword",
  async (values: any, thunkAPI) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/forgotPassword`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user: { username: values } }),
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

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    isSuccessLoginUser: false,
    isPendingLoginUser: false,
    isErrorLoginUser: false,

    isSuccessRegisterUser: false,
    isPendingRegisterUser: false,
    isErrorRegisterUser: false,

    isSuccessForgotPassword: false,
    isPendingForgotPassword: false,
    isErrorForgotPassword: false,

    isSuccessGetCurrentUser: false,
    isPendingGetCurrentUser: false,
    isErrorGetCurrentUser: false,
  },
  reducers: {
    clearStateLoginUser: (state) => {
      state.isSuccessLoginUser = false;
      state.isPendingLoginUser = false;
      state.isErrorLoginUser = false;
    },
  },
  extraReducers: {
    [loginUser.fulfilled.toString()]: (state, { payload }) => {
      console.log("loginUser fulfilled: ", payload);
      state.isPendingLoginUser = false;
      state.isErrorLoginUser = false;
      if (payload.responseLogin.success) {
        state.isSuccessLoginUser = true;
        localStorage.setItem(
          "authTokens",
          JSON.stringify(payload.responseLogin.data)
        );
        window.location.reload();
      } else {
        state.isSuccessLoginUser = false;
        toast.error(payload.responseLogin.message, toastifyProperties);
      }
    },
    [loginUser.pending.toString()]: (state) => {
      console.log("loginUser pending");
      state.isPendingLoginUser = true;
    },
    [loginUser.rejected.toString()]: (state, { payload }) => {
      console.log("loginUser rejected: ", payload);
      state.isPendingLoginUser = false;
      state.isErrorLoginUser = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [registerUser.fulfilled.toString()]: (state, { payload }) => {
      console.log("registerUser fulfilled: ", payload);
    },
    [registerUser.pending.toString()]: (state) => {
      state.isPendingRegisterUser = true;
    },
    [registerUser.rejected.toString()]: (state, { payload }) => {
      state.isPendingRegisterUser = false;
      state.isErrorRegisterUser = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [forgotPassword.fulfilled.toString()]: (state, { payload }) => {
      console.log("forgotPassword fulfilled: ", payload);
    },
    [forgotPassword.pending.toString()]: (state) => {
      state.isPendingForgotPassword = true;
    },
    [forgotPassword.rejected.toString()]: (state, { payload }) => {
      state.isPendingForgotPassword = false;
      state.isErrorForgotPassword = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getCurrentUser.fulfilled.toString()]: (state, { payload }) => {
      console.log("getCurrentUser fulfilled: ", payload);
    },
    [getCurrentUser.pending.toString()]: (state) => {
      state.isPendingGetCurrentUser = true;
    },
    [getCurrentUser.rejected.toString()]: (state, { payload }) => {
      state.isPendingGetCurrentUser = false;
      state.isErrorGetCurrentUser = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
  },
});

export const { clearStateLoginUser } = UserSlice.actions;

export default UserSlice.reducer;
