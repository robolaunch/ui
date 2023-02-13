import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";
import { toastifyProperties } from "../tools/Toastify";
import { toast } from "react-toastify";

export const createRoboticsCloud = createAsyncThunk(
  "roboticsCloud/createRoboticsCloud",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/superCluster/${value.superClusterProcessId}/newRoboticsCloud`,
        {
          organization: {
            name: value.organization.name,
          },
          teamId: value.teamId,
          cloudInstanceName: value.cloudInstanceName,
          instanceType: value.instanceType,
          connectionHub: value.connectionHub,
        }
      );
      if (response.status === 200) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getRoboticsCloudsOrganization = createAsyncThunk(
  "cloud/getRoboticsCloudsOrganization",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        "/getRoboticsCloudsOrganization",
        {
          organization: {
            name: value.organization.name,
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

export const getRoboticsCloudsTeam = createAsyncThunk(
  "cloud/getRoboticsCloudsTeam",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        "/getRoboticsCloudsTeam",
        {
          organization: {
            name: value.organization.name,
          },
          teamId: value.teamId,
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

export const getRoboticsCloudsUser = createAsyncThunk(
  "cloud/getRoboticsCloudsUser",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        "/getRoboticsCloudsUser",
        {
          organization: {
            name: value.organization.name,
          },
          teamId: value.teamId,
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

export const stopRoboticsCloud = createAsyncThunk(
  "cloud/stopRoboticsCloud",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/roboticsCloud/${value.processId}/operation`,
        {
          operation: "stop",
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

export const startRoboticsCloud = createAsyncThunk(
  "cloud/startRoboticsCloud",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/roboticsCloud/${value.processId}/operation`,
        {
          operation: "start",
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

export const deleteRoboticsCloud = createAsyncThunk(
  "cloud/deleteRoboticsCloud",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/roboticsCloud/${value.processId}/operation`,
        {
          operation: "terminate",
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

export const roboticsCloudSlice = createSlice({
  name: "roboticsCloud",
  initialState: {
    isSuccessCreateRoboticsCloud: false,
    isPendingCreateRoboticsCloud: false,
    isErrorCreateRoboticsCloud: false,

    isSuccessGetRoboticsCloudsOrganization: false,
    isPendingGetRoboticsCloudsOrganization: false,
    isErrorGetRoboticsCloudsOrganization: false,

    isSuccessGetRoboticsCloudsTeam: false,
    isPendingGetRoboticsCloudsTeam: false,
    isErrorGetRoboticsCloudsTeam: false,

    isSuccessGetRoboticsCloudsUser: false,
    isPendingGetRoboticsCloudsUser: false,
    isErrorGetRoboticsCloudsUser: false,

    isSuccessStopRoboticsCloud: false,
    isPendingStopRoboticsCloud: false,
    isErrorStopRoboticsCloud: false,

    isSuccessStartRoboticsCloud: false,
    isPendingStartRoboticsCloud: false,
    isErrorStartRoboticsCloud: false,

    isSuccessDeleteRoboticsCloud: false,
    isPendingDeleteRoboticsCloud: false,
    isErrorDeleteRoboticsCloud: false,
  },
  reducers: {},
  extraReducers: {
    [createRoboticsCloud.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [createRoboticsCloud.pending.toString()]: (state: any) => {
      state.isPendingCreateRoboticsCloud = true;
    },
    [createRoboticsCloud.rejected.toString()]: (state: any) => {
      state.isPendingCreateRoboticsCloud = false;
      state.isErrorCreateRoboticsCloud = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getRoboticsCloudsOrganization.fulfilled.toString()]: (
      state: any,
      { payload }
    ) => {
      console.log(payload);
    },
    [getRoboticsCloudsOrganization.pending.toString()]: (state: any) => {
      state.isPendingGetRoboticsCloudsOrganization = true;
    },
    [getRoboticsCloudsOrganization.rejected.toString()]: (state: any) => {
      state.isPendingGetRoboticsCloudsOrganization = false;
      state.isErrorGetRoboticsCloudsOrganization = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getRoboticsCloudsTeam.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [getRoboticsCloudsTeam.pending.toString()]: (state: any) => {
      state.isPendingGetRoboticsCloudsTeam = true;
    },
    [getRoboticsCloudsTeam.rejected.toString()]: (state: any) => {
      state.isPendingGetRoboticsCloudsTeam = false;
      state.isErrorGetRoboticsCloudsTeam = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getRoboticsCloudsUser.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [getRoboticsCloudsUser.pending.toString()]: (state: any) => {
      state.isPendingGetRoboticsCloudsUser = true;
    },
    [getRoboticsCloudsUser.rejected.toString()]: (state: any) => {
      state.isPendingGetRoboticsCloudsUser = false;
      state.isErrorGetRoboticsCloudsUser = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [stopRoboticsCloud.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [stopRoboticsCloud.pending.toString()]: (state: any) => {
      state.isPendingStopRoboticsCloud = true;
    },
    [stopRoboticsCloud.rejected.toString()]: (state: any) => {
      state.isPendingStopRoboticsCloud = false;
      state.isErrorStopRoboticsCloud = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [startRoboticsCloud.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [startRoboticsCloud.pending.toString()]: (state: any) => {
      state.isPendingStartRoboticsCloud = true;
    },
    [startRoboticsCloud.rejected.toString()]: (state: any) => {
      state.isPendingStartRoboticsCloud = false;
      state.isErrorStartRoboticsCloud = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [deleteRoboticsCloud.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [deleteRoboticsCloud.pending.toString()]: (state: any) => {
      state.isPendingDeleteRoboticsCloud = true;
    },
    [deleteRoboticsCloud.rejected.toString()]: (state: any) => {
      state.isPendingDeleteRoboticsCloud = false;
      state.isErrorDeleteRoboticsCloud = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
  },
});

export default roboticsCloudSlice.reducer;
