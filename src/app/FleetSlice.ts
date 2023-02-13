import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";

export const createFleet = createAsyncThunk(
  "fleet/createFleet",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/roboticsCloud/${value.roboticsCloudProcessId}/newFleet`,
        {
          roboticsCloudProcessId: value.roboticsCloudProcessId,
          federated: false,
          fleet: {
            name: value.fleetName,
          },
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

export const createFederatedFleet = createAsyncThunk(
  "fleet/createFleet",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/roboticsCloud/${value.roboticsCloudProcessId}/newFleet`,
        {
          roboticsCloudProcessId: value.roboticsCloudProcessId,
          federated: true,
          federatedFleet: {
            name: value.fleetName,
            clusters: value.clusters,
          },
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

export const getFleetsOrganization = createAsyncThunk(
  "fleet/getFleetsOrganization",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/getFleetsOrganization`,
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

export const getFleetsTeam = createAsyncThunk(
  "fleet/getFleetsTeam",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(`/getFleetsTeam`, {
        organization: {
          name: value.organization.name,
        },
        teamId: value.teamId,
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

export const getFleetsRoboticsCloud = createAsyncThunk(
  "fleet/getFleetsRoboticsCloud",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/getFleetsRoboticsCloud`,
        {
          roboticsCloudProcessId: value.roboticsCloudProcessId,
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

export const fleetSlice = createSlice({
  name: "fleet",
  initialState: {
    isSuccessCreateFleet: false,
    isPendingCreateFleet: false,
    isErrorCreateFleet: false,

    isSuccessCreateFederatedFleet: false,
    isPendingCreateFederatedFleet: false,
    isErrorCreateFederatedFleet: false,

    isSuccessGetFleetsOrganization: false,
    isPendingGetFleetsOrganization: false,
    isErrorGetFleetsOrganization: false,

    isSuccessGetFleetsTeam: false,
    isPendingGetFleetsTeam: false,
    isErrorGetFleetsTeam: false,

    isSuccessGetFleetsRoboticsCloud: false,
    isPendingGetFleetsRoboticsCloud: false,
    isErrorGetFleetsRoboticsCloud: false,
  },
  reducers: {},
  extraReducers: {
    [createFleet.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [createFleet.pending.toString()]: (state: any) => {
      state.isPendingCreateFleet = true;
    },
    [createFleet.rejected.toString()]: (state: any) => {
      state.isErrorCreateFleet = true;
      state.isPendingCreateFleet = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [createFederatedFleet.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [createFederatedFleet.pending.toString()]: (state: any) => {
      state.isPendingCreateFederatedFleet = true;
    },
    [createFederatedFleet.rejected.toString()]: (state: any) => {
      state.isErrorCreateFederatedFleet = true;
      state.isPendingCreateFederatedFleet = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getFleetsOrganization.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [getFleetsOrganization.pending.toString()]: (state: any) => {
      state.isPendingGetFleetsOrganization = true;
    },
    [getFleetsOrganization.rejected.toString()]: (state: any) => {
      state.isErrorGetFleetsOrganization = true;
      state.isPendingGetFleetsOrganization = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getFleetsTeam.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [getFleetsTeam.pending.toString()]: (state: any) => {
      state.isPendingGetFleetsTeam = true;
    },
    [getFleetsTeam.rejected.toString()]: (state: any) => {
      state.isErrorGetFleetsTeam = true;
      state.isPendingGetFleetsTeam = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getFleetsRoboticsCloud.fulfilled.toString()]: (
      state: any,
      { payload }
    ) => {
      console.log(payload);
    },
    [getFleetsRoboticsCloud.pending.toString()]: (state: any) => {
      state.isPendingGetFleetsRoboticsCloud = true;
    },
    [getFleetsRoboticsCloud.rejected.toString()]: (state: any) => {
      state.isErrorGetFleetsRoboticsCloud = true;
      state.isPendingGetFleetsRoboticsCloud = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
  },
});

export default fleetSlice.reducer;
