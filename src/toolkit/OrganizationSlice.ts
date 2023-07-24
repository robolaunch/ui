import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { organizationApi } from "../api/api";
import { toast } from "sonner";

export const createOrganization = createAsyncThunk(
  "organizations/createOrganization",
  async (values: { name: string }) => {
    const response = await organizationApi.createOrganization({
      name: values.name,
    });
    return response.data;
  }
);

export const getOrganizations = createAsyncThunk(
  "organizations/getOrganizations",
  async () => {
    const response = await organizationApi.getOrganizations();
    return response.data;
  }
);

export const getOrganizationUsers = createAsyncThunk(
  "organizations/getOrganizationUsers",
  async (values: any) => {
    const response = await organizationApi.getOrganizationUsers({
      name: values.name,
      organizationId: values.organizationId,
    });
    return response.data;
  }
);

export const getOrganizationAdmins = createAsyncThunk(
  "organizations/getOrganizationAdmins",
  async (values: any) => {
    const response = await organizationApi.getOrganizationAdmins({
      name: values.name,
      organizationId: values.organizationId,
    });
    return response.data;
  }
);

export const getOrganizationGuests = createAsyncThunk(
  "organizations/getOrganizationGuests",
  async (values: any) => {
    const response = await organizationApi.getOrganizationGuests({
      name: values.name,
      organizationId: values.organizationId,
    });
    return response.data;
  }
);

export const moveAdminAsUserFromOrganization = createAsyncThunk(
  "organizations/moveAdminAsUserFromOrganization",
  async (values: any) => {
    const response = await organizationApi.moveAdminAsUserFromOrganization({
      name: values.name,
      organizationId: values.organizationId,
      invitedUserId: values.invitedUserId,
    });
    return response.data;
  }
);

export const moveUserAsAdminToOrganization = createAsyncThunk(
  "organizations/moveUserAsAdminToOrganization",
  async (values: any) => {
    const response = await organizationApi.moveUserAsAdminToOrganization({
      name: values.name,
      organizationId: values.organizationId,
      invitedUserId: values.invitedUserId,
    });
    return response.data;
  }
);

export const deleteUserFromOrganization = createAsyncThunk(
  "organizations/deleteUserFromOrganization",
  async (values: any) => {
    const response = await organizationApi.deleteUserFromOrganization({
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
    const response = await organizationApi.deleteAdminFromOrganization({
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
    const response = await organizationApi.deleteGuestFromOrganization({
      name: values.name,
      organizationId: values.organizationId,
      invitedUserId: values.invitedUserId,
    });
    return response.data;
  }
);

export const deleteOrganization = createAsyncThunk(
  "organizations/deleteOrganization",
  async (values: { organizationId: string }) => {
    return undefined;
  }
);

export const organizationSlice = createSlice({
  name: "organization",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrganization.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(createOrganization.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(getOrganizations.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getOrganizations.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(getOrganizationUsers.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getOrganizationUsers.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(getOrganizationAdmins.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getOrganizationAdmins.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(getOrganizationGuests.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getOrganizationGuests.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(moveAdminAsUserFromOrganization.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(moveAdminAsUserFromOrganization.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(moveUserAsAdminToOrganization.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(moveUserAsAdminToOrganization.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(deleteUserFromOrganization.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(deleteUserFromOrganization.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(deleteAdminFromOrganization.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(deleteAdminFromOrganization.rejected, () => {
        toast.error("Something went wrong");
      })
      .addCase(deleteGuestFromOrganization.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(deleteGuestFromOrganization.rejected, () => {
        toast.error("Something went wrong");
      });
  },
});

export default organizationSlice.reducer;
