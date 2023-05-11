import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/api";
import { toast } from "sonner";

export const createOrganization = createAsyncThunk(
  "organizations/createOrganization",
  async (values: any) => {
    const response = await api.createOrganization({ name: values.name });
    return response.data;
  }
);

export const getOrganizations = createAsyncThunk(
  "organizations/getOrganizations",
  async () => {
    const response = await api.getOrganizations();
    return response.data;
  }
);

export const getOrganizationUsers = createAsyncThunk(
  "organizations/getOrganizationUsers",
  async (values: any) => {
    const response = await api.getOrganizationUsers({
      name: values.name,
      organizationId: values.organizationId,
    });
    return response.data;
  }
);

export const getOrganizationAdmins = createAsyncThunk(
  "organizations/getOrganizationAdmins",
  async (values: any) => {
    const response = await api.getOrganizationAdmins({
      name: values.name,
      organizationId: values.organizationId,
    });
    return response.data;
  }
);

export const getOrganizationGuests = createAsyncThunk(
  "organizations/getOrganizationGuests",
  async (values: any) => {
    const response = await api.getOrganizationGuests({
      name: values.name,
      organizationId: values.organizationId,
    });
    return response.data;
  }
);

export const moveAdminAsUserFromOrganization = createAsyncThunk(
  "organizations/moveAdminAsUserFromOrganization",
  async (values: any) => {
    const response = await api.moveAdminAsUserFromOrganization({
      name: values.name,
      organizationId: values.organizationId,
      invitedUserId: values.userId,
    });
    return response.data;
  }
);

export const moveUserAsAdminToOrganization = createAsyncThunk(
  "organizations/moveUserAsAdminToOrganization",
  async (values: any) => {
    const response = await api.moveUserAsAdminToOrganization({
      name: values.name,
      organizationId: values.organizationId,
      invitedUserId: values.userId,
    });
    return response.data;
  }
);

export const deleteUserFromOrganization = createAsyncThunk(
  "organizations/deleteUserFromOrganization",
  async (values: any) => {
    const response = await api.deleteUserFromOrganization({
      name: values.name,
      organizationId: values.organizationId,
      invitedUserId: values.invitedUserId,
    });
    return response.data;
  }
);

export const deleteAdminFromOrganization = createAsyncThunk(
  "organizations/deleteAdminFromOrganization",
  async (values: any) => {
    const response = await api.deleteAdminFromOrganization({
      name: values.name,
      organizationId: values.organizationId,
      invitedUserId: values.invitedUserId,
    });
    return response.data;
  }
);

export const deleteGuestFromOrganization = createAsyncThunk(
  "organizations/deleteGuestFromOrganization",
  async (values: any) => {
    const response = await api.deleteGuestFromOrganization({
      name: values.name,
      organizationId: values.organizationId,
      invitedUserId: values.invitedUserId,
    });
    return response.data;
  }
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrganization.fulfilled, (state: any, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(createOrganization.rejected, (action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(getOrganizations.fulfilled, (state: any, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getOrganizations.rejected, (action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(getOrganizationUsers.fulfilled, (state: any, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getOrganizationUsers.rejected, (action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(getOrganizationAdmins.fulfilled, (state: any, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getOrganizationAdmins.rejected, (action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(getOrganizationGuests.fulfilled, (state: any, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getOrganizationGuests.rejected, (action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(
        moveAdminAsUserFromOrganization.fulfilled,
        (state: any, action: any) => {
          if (action?.payload?.success) {
            toast.success(action?.payload?.message);
          } else {
            toast.error(action?.payload?.message);
          }
        }
      )
      .addCase(
        moveAdminAsUserFromOrganization.rejected,
        (state: any, action: any) => {
          toast.error("Something went wrong");
        }
      )
      .addCase(
        moveUserAsAdminToOrganization.fulfilled,
        (state: any, action: any) => {
          if (action?.payload?.success) {
            toast.success(action?.payload?.message);
          } else {
            toast.error(action?.payload?.message);
          }
        }
      )
      .addCase(
        moveUserAsAdminToOrganization.rejected,
        (state: any, action: any) => {
          toast.error("Something went wrong");
        }
      )
      .addCase(
        deleteUserFromOrganization.fulfilled,
        (state: any, action: any) => {
          if (action?.payload?.success) {
            toast.success(action?.payload?.message);
          } else {
            toast.error(action?.payload?.message);
          }
        }
      )
      .addCase(
        deleteUserFromOrganization.rejected,
        (state: any, action: any) => {
          toast.error("Something went wrong");
        }
      )
      .addCase(
        deleteAdminFromOrganization.fulfilled,
        (state: any, action: any) => {
          if (action?.payload?.success) {
            toast.success(action?.payload?.message);
          } else {
            toast.error(action?.payload?.message);
          }
        }
      )
      .addCase(
        deleteAdminFromOrganization.rejected,
        (state: any, action: any) => {
          toast.error("Something went wrong");
        }
      )
      .addCase(
        deleteGuestFromOrganization.fulfilled,
        (state: any, action: any) => {
          if (action?.payload?.success) {
            toast.success(action?.payload?.message);
          } else {
            toast.error(action?.payload?.message);
          }
        }
      )
      .addCase(
        deleteGuestFromOrganization.rejected,
        (state: any, action: any) => {
          toast.error("Something went wrong");
        }
      );
  },
});

export default organizationSlice.reducer;
