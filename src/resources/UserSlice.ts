import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    urls: {
      vdi: "ws://localhost:8080/",
      ide: "http://localhost:3000/",
      ros: "ws://localhost:9090",
    },
  },
  reducers: {
    updateUrls: (state, action) => {
      state.urls = action.payload;
      return state;
    },
  },
});
export const { updateUrls } = UserSlice.actions;
export default UserSlice.reducer;
