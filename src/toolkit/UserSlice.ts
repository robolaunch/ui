import { createSlice } from "@reduxjs/toolkit";
import { envApplicationMode } from "../helpers/envProvider";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    applicationMode: envApplicationMode,
  },
  reducers: {
    setApplicationMode: (
      state,
      action: {
        payload: boolean;
        type: string;
      },
    ) => {
      state.applicationMode = action.payload;
      localStorage.setItem("mode", action.payload.toString());
    },
  },
});

export default UserSlice.reducer;

export const { setApplicationMode } = UserSlice.actions;
