import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "user/login",
  async (values: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/login`,
        {
          username: values.username,
          password: values.password,
        }
      );
      if (response.status === 200) {
        console.log("login", response);
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (values: any, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        {
          username: values.username,
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        }
      );
      if (response.status === 200) {
        console.log("register", response);
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
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/forgotPassword`,
        {
          username: values.username,
        }
      );
      if (response.status === 200) {
        console.log("forgotPassword", response);
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    user: {
      username: "gokhangunduz",
      firstName: "Gökhan",
      lastName: "Gündüz",
      email: "test@test.com",
    },
  },
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state, action) => {
      return action.payload;
    },
    [login.fulfilled.type]: (state, action) => {
      return action.payload.data;
    },
    [login.rejected.type]: (state, action) => {
      return action.payload;
    },
    //
    //
    //
    [register.pending.type]: (state, action) => {
      return action.payload;
    },
    [register.fulfilled.type]: (state, action) => {
      return action.payload.data;
    },
    [register.rejected.type]: (state, action) => {
      return action.payload;
    },
    //
    //
    //
    [forgotPassword.pending.type]: (state, action) => {
      return action.payload;
    },
    [forgotPassword.fulfilled.type]: (state, action) => {
      return action.payload.data;
    },
    [forgotPassword.rejected.type]: (state, action) => {
      return action.payload;
    },
    //
    //
    //
  },
});

export default UserSlice.reducer;
