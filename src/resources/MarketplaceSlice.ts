import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { marketplaceApi } from "../api/api";
import { toast } from "sonner";

export const getMarkeplaceItems = createAsyncThunk(
  "marketplace/getMarkeplaceItems",
  async (values: { organizationId: string }) => {
    const response = await marketplaceApi.getMarketplaceRobots({
      name: "marketplace/getMarkeplaceItems",
      organizationId: values.organizationId,
    });
    return response.data;
  }
);

export const getMarkeplaceItem = createAsyncThunk(
  "marketplace/getMarkeplaceItem",
  async (values: { organizationId: string; itemId: string }) => {
    const response = await marketplaceApi.getMarketplaceRobots({
      name: "marketplace/getMarkeplaceItem",
      organizationId: values.organizationId,
    });
    return response.data;
  }
);

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMarkeplaceItems.rejected, () => {
        toast.error("Something went wrong of getting marketplace items");
      })
      .addCase(getMarkeplaceItem.rejected, () => {
        toast.error("Something went wrong of getting marketplace item");
      });
  },
});

export default marketplaceSlice.reducer;
