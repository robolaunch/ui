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

export const getLogs = createAsyncThunk("barcode/getLogs", async (_) => {
  const response = await axios.get("http://localhost:8077/log");
  return response;
});

export const getLog = createAsyncThunk(
  "barcode/getLogs",
  async ({ logName }: { logName: string }) => {
    const response = await axios.post(`http://localhost:8077/log`, {
      path: logName,
    });
    return response;
  },
);

export const getConfig = createAsyncThunk("barcode/getConfig", async (_) => {
  const response = await axios.get("http://localhost:8077/config");
  return response;
});

export const updateConfig = createAsyncThunk(
  "barcode/updateConfig",
  async (values: { config: any }) => {
    const response = await axios.post("http://localhost:8077/config", {
      config: values.config,
    });
    return response;
  },
);

export const getMap = createAsyncThunk("barcode/getMap", async (_) => {
  const map = await axios.get("http://localhost:8077/map/image");

  const meta = await axios.get("http://localhost:8077/map/meta");

  return {
    map: map?.data?.data?.data,
    meta: await JSON.parse(await meta?.data?.data),
  };
});

export const barcodeSlice = createSlice({
  name: "barcode",
  initialState: {},
  reducers: {},
  extraReducers: () => {},
});

export default barcodeSlice.reducer;
