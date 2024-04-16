import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const resetBarcodes = createAsyncThunk(
  "barcode/resetBarcodes",
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
