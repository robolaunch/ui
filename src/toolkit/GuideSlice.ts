import { createSlice } from "@reduxjs/toolkit";

export const GuideSlice = createSlice({
  name: "guide",
  initialState: {
    isShowedMainGuide: false,
    isShowedOrganizationGuide: false,
    isShowedRoboticsCloudGuide: false,
    isShowedInstanceGuide: false,
    isShowedFleetGuide: false,
    isShowedCreateRobotStep1Guide: false,
    isShowedCreateRobotStep2Guide: false,
    isShowedCreateRobotStep3Guide: false,
    isShowedCreateRobotStep4Guide: false,
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
    setIsShowedCreateRobotStep1Guide: (state) => {
      state.isShowedCreateRobotStep1Guide = true;
    },
    setIsShowedCreateRobotStep2Guide: (state) => {
      state.isShowedCreateRobotStep2Guide = true;
    },
    setIsShowedCreateRobotStep3Guide: (state) => {
      state.isShowedCreateRobotStep3Guide = true;
    },
    setIsShowedCreateRobotStep4Guide: (state) => {
      state.isShowedCreateRobotStep4Guide = true;
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
  setIsShowedCreateRobotStep1Guide,
  setIsShowedCreateRobotStep2Guide,
  setIsShowedCreateRobotStep3Guide,
  setIsShowedCreateRobotStep4Guide,
} = GuideSlice.actions;
