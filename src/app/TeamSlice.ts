import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";

export const createTeam = createAsyncThunk(
  "team/createTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post("/createTeam", {
        organization: {
          name: values.organization.name,
        },
        teamName: values.teamName,
      });
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTeams = createAsyncThunk(
  "team/getTeams",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post("/getTeams", {
        organization: {
          name: values.organization.name,
        },
      });
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const renameTeam = createAsyncThunk(
  "teams/changeTeamName",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post("/changeTeamName", {
        organization: {
          name: values.organization.name,
        },
        oldTeamName: values.oldTeamName,
        newTeamName: values.newTeamName,
      });
      console.log(response);
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteTeam = createAsyncThunk(
  "teams/deleteTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post("/deleteTeam", {
        organization: {
          name: values.organization.name,
        },
        teamName: values.teamName,
      });
      if (response.status === 201) {
        console.log(response);
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getTeamUsers = createAsyncThunk(
  "teams/getTeamUsers",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post("/getTeamUsers", {
        organization: {
          name: values.organization.name,
        },
        teamName: values.teamName,
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

export const addUserToTeam = createAsyncThunk(
  "team/addUserToTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post("/addUserToTeam", {
        organization: {
          name: values.organization.name,
        },
        teamName: values.teamName,
        user: {
          username: values.user.username,
        },
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

export const deleteUserFromTeam = createAsyncThunk(
  "teams/deleteUserFromTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        "/deleteUserFromTeam",
        {
          organization: {
            name: values.organization.name,
          },
          teamName: values.teamName,
          user: {
            username: values.user.username,
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

export const addUserToTeamAsManager = createAsyncThunk(
  "teams/addUserToTeamAsManager",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        "/addUserToTeamAsManager",
        {
          organization: {
            name: values.organization.name,
          },
          teamName: values.teamName,
          user: {
            username: values.user.username,
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

export const deleteUserManagershipFromTeam = createAsyncThunk(
  "teams/deleteUserManagershipFromTeam",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        "/deleteUserManagershipFromTeam",
        {
          organization: {
            name: values.organization.name,
          },
          teamName: values.teamName,
          user: {
            username: values.user.username,
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

export const teamSlice = createSlice({
  name: "team",
  initialState: {
    isSuccessCreateTeam: false,
    isPendingCreateTeam: false,
    isErrorCreateTeam: false,

    isSuccessGetTeams: false,
    isPendingGetTeams: false,
    isErrorGetTeams: false,

    isSuccessRenameTeam: false,
    isPendingRenameTeam: false,
    isErrorRenameTeam: false,

    isSuccessDeleteTeam: false,
    isPendingDeleteTeam: false,
    isErrorDeleteTeam: false,

    isSuccessGetTeamUsers: false,
    isPendingGetTeamUsers: false,
    isErrorGetTeamUsers: false,

    isSuccessAddUserToTeam: false,
    isPendingAddUserToTeam: false,
    isErrorAddUserToTeam: false,

    isSuccessDeleteUserFromTeam: false,
    isPendingDeleteUserFromTeam: false,
    isErrorDeleteUserFromTeam: false,

    isSuccessAddUserToTeamAsManager: false,
    isPendingAddUserToTeamAsManager: false,
    isErrorAddUserToTeamAsManager: false,
  },
  reducers: {},
  extraReducers: {
    [getTeams.fulfilled.toString()]: (state, { payload }) => {
      state.isPendingGetTeams = false;
      if (payload?.data?.teams?.success) {
        state.isSuccessGetTeams = true;
      } else {
        state.isErrorGetTeams = true;
      }
    },
    [getTeams.pending.toString()]: (state) => {
      state.isPendingGetTeams = true;
    },
    [getTeams.rejected.toString()]: (state) => {
      state.isPendingGetTeams = false;
      state.isErrorGetTeams = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [createTeam.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
      if (payload?.data?.plainResponse?.success) {
        state.isSuccessCreateTeam = true;
        toast.success(payload.data.plainResponse.message, toastifyProperties);
      } else {
        state.isErrorCreateTeam = true;
        toast.error(payload.data.plainResponse.message, toastifyProperties);
      }
    },
    [createTeam.pending.toString()]: (state) => {
      state.isPendingCreateTeam = true;
    },
    [createTeam.rejected.toString()]: (state) => {
      state.isPendingCreateTeam = false;
      state.isErrorCreateTeam = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [renameTeam.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
    },
    [renameTeam.pending.toString()]: (state) => {
      state.isPendingRenameTeam = true;
    },
    [renameTeam.rejected.toString()]: (state) => {
      state.isPendingRenameTeam = false;
      state.isErrorRenameTeam = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [deleteTeam.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
    },
    [deleteTeam.pending.toString()]: (state) => {
      state.isPendingDeleteTeam = true;
    },
    [deleteTeam.rejected.toString()]: (state) => {
      state.isPendingDeleteTeam = false;
      state.isErrorDeleteTeam = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getTeamUsers.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
    },
    [getTeamUsers.pending.toString()]: (state) => {
      state.isPendingGetTeamUsers = true;
    },
    [getTeamUsers.rejected.toString()]: (state) => {
      state.isPendingGetTeamUsers = false;
      state.isErrorGetTeamUsers = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [addUserToTeam.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
    },
    [addUserToTeam.pending.toString()]: (state) => {
      state.isPendingAddUserToTeam = true;
    },
    [addUserToTeam.rejected.toString()]: (state) => {
      state.isPendingAddUserToTeam = false;
      state.isErrorAddUserToTeam = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [deleteUserFromTeam.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
    },
    [deleteUserFromTeam.pending.toString()]: (state) => {
      state.isPendingDeleteUserFromTeam = true;
    },
    [deleteUserFromTeam.rejected.toString()]: (state) => {
      state.isPendingDeleteUserFromTeam = false;
      state.isErrorDeleteUserFromTeam = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [addUserToTeamAsManager.fulfilled.toString()]: (state, { payload }) => {
      console.log(payload);
    },
    [addUserToTeamAsManager.pending.toString()]: (state) => {
      state.isPendingAddUserToTeamAsManager = true;
    },
    [addUserToTeamAsManager.rejected.toString()]: (state) => {
      state.isPendingAddUserToTeamAsManager = false;
      state.isErrorAddUserToTeamAsManager = true;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
  },
});

export default teamSlice.reducer;
