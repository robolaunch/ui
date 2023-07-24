import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { trialApi } from "../api/api";
import axios from "axios";
import { toast } from "sonner";

export const getIP = createAsyncThunk("trial/getIP", async () => {
  const response = await axios.get("https://api.ipify.org?format=json");
  return response.data;
});

export const createTrial = createAsyncThunk(
  "trial/createTrial",
  async (values: { ipAddress: string }) => {
    const response = await trialApi.createInfrastructure({
      name: "trial/createTrial",
      ipAddress: values.ipAddress,
    });
    return response.data;
  }
);

export const trialSlice = createSlice({
  name: "trial",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIP.rejected, () => {
        toast.error("Something went wrong of getting IP");
      })
      .addCase(createTrial.fulfilled, (_, action: any) => {
        if (action?.payload?.success) {
          toast.success(action?.payload?.message);
        } else {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(createTrial.rejected, () => {
        toast.error("Something went wrong of creating trial");
      });
  },
});

export default trialSlice.reducer;
