import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";

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
    } catch (error) {
      console.log("Error login! ", error);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    isSuccessLoginUser: false,
    isPendingLoginUser: false,
    isErrorLoginUser: false,
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
      if (payload.responseLogin.success) {
        state.isSuccessLoginUser = true;
        localStorage.setItem(
          "authTokens",
          JSON.stringify(payload.responseLogin.data)
        );
        window.location.reload();
      } else {
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
    },
  },
});

export const { clearStateLoginUser } = UserSlice.actions;

export default UserSlice.reducer;
