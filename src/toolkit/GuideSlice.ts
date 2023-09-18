import { createSlice } from "@reduxjs/toolkit";

export const GuideSlice = createSlice({
  name: "guide",
  initialState: {
    isShowedMainGuide: false,
    isShowedOrganizationGuide: false,
    isShowedRoboticsCloudGuide: false,
    isShowedInstanceGuide: false,
    isShowedFleetGuide: false,
  },
  reducers: {
    setIsShowedMainGuide: (state) => {
      state.isShowedMainGuide = true;
    },
    setIsShowedOrganizationGuide: (state) => {
      state.isShowedOrganizationGuide = true;
    },
    setIsShowedRoboticsCloudGuide: (state) => {
      state.isShowedRoboticsCloudGuide = true;
    },
    setIsShowedInstanceGuide: (state) => {
      state.isShowedInstanceGuide = true;
    },
    setIsShowedFleetGuide: (state) => {
      state.isShowedFleetGuide = true;
    },
  },
});

export default GuideSlice.reducer;

export const {
  setIsShowedMainGuide,
  setIsShowedOrganizationGuide,
  setIsShowedRoboticsCloudGuide,
  setIsShowedInstanceGuide,
  setIsShowedFleetGuide,
} = GuideSlice.actions;
