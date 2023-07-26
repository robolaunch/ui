import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { marketplaceApi } from "../api/api";
import { toast } from "sonner";

export const getMarkeplaceItems = createAsyncThunk(
  "marketplace/getMarkeplaceItems",
  async () => {
    const response = await marketplaceApi.getMarketplaceRobots({
      name: "marketplace/getMarkeplaceItems",
    });
    return response.data;
  }
);

export const getMarkeplaceItem = createAsyncThunk(
  "marketplace/getMarkeplaceItem",
  async (values: { acronym: string }) => {
    const response = await marketplaceApi.getMarketplaceRobot({
      name: "marketplace/getMarkeplaceItem",
      marketplace: { robots: [{ acronym: values.acronym }] },
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
