import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    urls: {
      vdi: "ws://domain.cloud/org/eu/instance/fleet/robot/vdi/",
      ide: "https://domain.cloud/org/eu/instance/fleet/robot/ide/",
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
