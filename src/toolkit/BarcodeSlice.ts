import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const cloudUrl = "http://localhost:8077";

export const getBarcodeSnapshots = createAsyncThunk(
  "barcode/getSnapshots",
  async (_) => {
    const response = await axios.get(`
${cloudUrl}/barcode/snapshots`);
    return response;
  },
);

export const getBarcodeAtSnapshot = createAsyncThunk(
  "barcode/snapshots/getBarcodeAtSnapshot",
  async ({ time }: { time: number }) => {
    const response = await axios.get(`${cloudUrl}/barcode/snapshots/${time}`);
    return response;
  },
);

export const getAllBarcodes = createAsyncThunk(
  "barcode/getAllBarcodes",
  async (_) => {
    const response = await axios.get(`${cloudUrl}/barcode`);
    return response;
  },
);

export const getBarcodesWithStartedID = createAsyncThunk(
  "barcode/getAllBarcodes",
  async (values: { id: number }) => {
    const response = await axios.post(`${cloudUrl}/barcode/${values.id}`);
    return response;
  },
);

export const createSnapshot = createAsyncThunk(
  "barcode/createSnapshot",
  async (_) => {
    const response = await axios.delete(`${cloudUrl}/barcode/snapshots/create`);
    return response;
  },
);

export const getWaypoints = createAsyncThunk(
  "barcode/getWaypoints",
  async (_) => {
    const response = await axios.get(`${cloudUrl}/barcode/waypoints`);
    return response;
  },
);

export const getLogs = createAsyncThunk("barcode/getLogs", async (_) => {
  const response = await axios.get(`${cloudUrl}/log`);
  return response;
});

export const getLog = createAsyncThunk(
  "barcode/getLogs",
  async ({ logName }: { logName: string }) => {
    const response = await axios.post(`${cloudUrl}/log/getLog`, {
      path: logName,
    });
    return response;
  },
);

export const getConfig = createAsyncThunk("barcode/getConfig", async (_) => {
  const response = await axios.get(`${cloudUrl}/config`);
  return response;
});

export const updateConfig = createAsyncThunk(
  "barcode/updateConfig",
  async (values: { config: any }) => {
    const response = await axios.post(`${cloudUrl}/config`, {
      config: values.config,
    });
    return response;
  },
);

export const getMap = createAsyncThunk("barcode/getMap", async (_) => {
  try {
    const map = await axios.get(`${cloudUrl}/map/image`);

    const meta = await axios.get(`${cloudUrl}/map/meta`);

    return {
      map: map?.data?.data?.data,
      meta: await JSON.parse(await meta?.data?.data),
    };
  } catch (error) {
    return null;
  }
});

export const getLocation = createAsyncThunk(
  "barcode/getLocation",
  async (_) => {
    const response: any = await axios.get(`${cloudUrl}/location`);

    return response?.data?.data;
  },
);

export const barcodeSlice = createSlice({
  name: "barcode",
  initialState: {},
  reducers: {},
  extraReducers: () => {},
});

export default barcodeSlice.reducer;
