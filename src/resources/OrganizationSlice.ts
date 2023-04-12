import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInterceptor from "../utils/axios.interceptor";
import { toast } from "sonner";

export const createOrganization = createAsyncThunk(
  "organization/createOrganization",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/createOrganization`,
        {
          name: values.name,
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

export const getOrganizationUsers = createAsyncThunk(
  "organization/getOrganizationUsers",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/getOrganizationUsers`,
        {
          organizationId: values?.organizationId,
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

export const getOrganizationAdmins = createAsyncThunk(
  "organization/getOrganizationAdmins",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/getOrganizationAdmins`,
        {
          organizationId: values?.organizationId,
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

export const getOrganizationGuests = createAsyncThunk(
  "organization/getOrganizationGuests",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/getOrganizationGuests`,
        {
          organizationId: values?.organizationId,
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

export const getOrganizations = createAsyncThunk(
  "organization/getOrganizations",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/getOrganizations`
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

export const MoveAsAdmin = createAsyncThunk(
  "organization/MoveAsAdmin",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/moveAsAdmin`,
        {
          organizationId: values?.organizationId,
          invitedUserId: values?.invitedUserId,
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

export const MoveToUser = createAsyncThunk(
  "organization/MoveToUser",
  async (values: any, thunkAPI) => {
    try {
      const response = await axiosInterceptor.post(
        `${process.env.REACT_APP_BACKEND_URL}/MoveToUser`,
        {
          organizationId: values?.organizationId,
          intivedUserId: values?.userId,
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

export const getOrganizationsWithGroups = createAsyncThunk(
  "organization/getOrganizationsWithGroups",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInterceptor.get(
        `${process.env.REACT_APP_BACKEND_URL}/getOrganizationsWithGroups`
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

function toastNotification({ action }: any) {
  if (action.payload.data.success) {
    toast.success(action?.payload?.data?.message);
  } else {
    toast.error(action?.payload?.data?.message);
  }
}

export const OrganizationSlice = createSlice({
  name: "organization",
  initialState: {},
  reducers: {},
  extraReducers: {
    [createOrganization.pending.type]: (state, action) => {
      console.log("createOrganization.pending");
    },
    [createOrganization.fulfilled.type]: (state, action) => {
      toastNotification({ action });
    },

    [createOrganization.rejected.type]: (state, action) => {
      toast.error("Error is fetcing data.");
    },
    //
    //
    //
    //
    //
    //
    //
    [getOrganizations.pending.type]: (state, action) => {
      console.log("getOrganizations.pending");
    },
    [getOrganizations.fulfilled.type]: (state, action) => {
      console.log("getOrganizations.fulfilled");
    },
    [getOrganizations.rejected.type]: (state, action) => {
      toast.error("Error is fetcing data.");
    },
    //
    //
    //
    //
    //
    //
    //
    [getOrganizationUsers.pending.type]: (state, action) => {
      console.log("getOrganizationUsers.pending");
    },
    [getOrganizationUsers.fulfilled.type]: (state, action) => {
      console.log("getOrganizationUsers.fulfilled");
    },
    [getOrganizationUsers.rejected.type]: (state, action) => {
      toast.error(
        action?.error ? "Organization not found." : "Error is fetcing data."
      );
    },
    //
    //
    //
    //
    //
    //
    //
    [getOrganizationGuests.pending.type]: (state, action) => {
      console.log("getOrganizationGuests.pending");
    },
    [getOrganizationGuests.fulfilled.type]: (state, action) => {
      console.log("getOrganizationGuests.fulfilled");
    },
    [getOrganizationGuests.rejected.type]: (state, action) => {
      toast.error(
        action?.error ? "Organization not found." : "Error is fetcing data."
      );
    },
    //
    //
    //
    //
    //
    //
    //
    [MoveAsAdmin.pending.type]: (state, action) => {
      console.log("MoveAsAdmin.pending");
    },
    [MoveAsAdmin.fulfilled.type]: (state, action) => {
      console.log("MoveAsAdmin.fulfilled", action.payload);
      toastNotification({ action });
    },
    [MoveAsAdmin.rejected.type]: (state, action) => {
      toast.error("Error is fetcing data.");
    },
    //
    //
    //
    //
    //
    //
    //
    [MoveToUser.pending.type]: (state, action) => {
      console.log("MoveToUser.pending");
    },
    [MoveToUser.fulfilled.type]: (state, action) => {
      console.log("MoveToUser.fulfilled", action.payload);
    },
    [MoveToUser.rejected.type]: (state, action) => {
      toast.error("Error is fetcing data.");
    },
    //
    //
    //
    //
    //
    //
    //
    [getOrganizationsWithGroups.pending.type]: (state, action) => {
      console.log("getOrganizationsWithGroups.pending");
    },
    [getOrganizationsWithGroups.fulfilled.type]: (state, action) => {
      console.log("getOrganizationsWithGroups.fulfilled");
    },
    [getOrganizationsWithGroups.rejected.type]: (state, action) => {
      toast.error("Error is fetcing data.");
    },
  },
});

export default OrganizationSlice.reducer;
