import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllBarcodes = createAsyncThunk(
  "barcode/getAllBarcodes",
  async (_) => {
    const response = await axios.get("https://127.0.0.1/barcode");
    return response;
  },
);

export const getBarcodesWithStartedID = createAsyncThunk(
  "barcode/getAllBarcodes",
  async (values: { id: number }) => {
    const response = await axios.post(`https://127.0.0.1/barcode/${values.id}`);
    return response;
  },
);

export const resetBarcodes = createAsyncThunk(
  "barcode/resetBarcodes",
  async (_) => {
    const response = await axios.delete("https://127.0.0.1/barcode");
    return response;
  },
);

export const getWaypoints = createAsyncThunk(
  "barcode/getWaypoints",
  async (_) => {
    const response = await axios.get("https://127.0.0.1/waypoint");
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
