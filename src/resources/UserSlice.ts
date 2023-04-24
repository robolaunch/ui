import { createSlice } from "@reduxjs/toolkit";

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
  extraReducers: {},
});

export default UserSlice.reducer;
