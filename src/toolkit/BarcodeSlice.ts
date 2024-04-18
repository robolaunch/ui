import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getBarcodeSnapshots = createAsyncThunk(
  "barcode/getSnapshots",
  async (_) => {
    const response = await axios.get("http://localhost:8077/barcode/snapshots");
    return response;
  },
);

export const getBarcodeAtSnapshot = createAsyncThunk(
  "barcode/snapshots/getBarcodeAtSnapshot",
  async ({ time }: { time: number }) => {
    const response = await axios.get(
      `http://localhost:8077/barcode/snapshots/${time}`,
    );
    return response;
  },
);

export const getAllBarcodes = createAsyncThunk(
  "barcode/getAllBarcodes",
  async (_) => {
    const response = await axios.get("http://localhost:8077/barcode");
    return response;
  },
);

export const getBarcodesWithStartedID = createAsyncThunk(
  "barcode/getAllBarcodes",
  async (values: { id: number }) => {
    const response = await axios.post(
      `http://localhost:8077/barcode/${values.id}`,
    );
    return response;
  },
);

export const createSnapshot = createAsyncThunk(
  "barcode/createSnapshot",
  async (_) => {
    const response = await axios.delete("http://localhost:8077/barcode");
    return response;
  },
);

export const getWaypoints = createAsyncThunk(
  "barcode/getWaypoints",
  async (_) => {
    const response = await axios.get("http://localhost:8077/waypoint");
    return response;
  },
);

export const barcodeSlice = createSlice({
  name: "barcode",
  initialState: {},
  reducers: {},
  extraReducers: () => {},
});

export default barcodeSlice.reducer;
