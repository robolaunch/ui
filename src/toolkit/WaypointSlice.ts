import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IWaypoint } from "../interfaces/task-management.interface";

export const getWaypoints = createAsyncThunk(
  "waypoints/getWaypoints",
  async () => {
    try {
      const response: any = await axios.get("http://localhost:8077/waypoint");

      const waypoints: IWaypoint[] = response?.data?.data || [];

      return waypoints;
    } catch (error) {}
  },
);

export const addWaypoint = createAsyncThunk(
  "waypoints/addWaypoint",
  async (waypoint: IWaypoint) => {
    try {
      const response: any = await axios.post(
        "http://localhost:8077/waypoint",
        waypoint,
      );

      return response;
    } catch (error) {}
  },
);

export const updateWaypoint = createAsyncThunk(
  "waypoints/updateWaypoint",
  async (waypoint: IWaypoint) => {
    try {
      // const response: any = await axios.put(
      //   `http://localhost:8077/waypoint/${waypoint.waypoint_id}`,
      //   waypoint,
      // );
      // return response;
    } catch (error) {}
  },
);

export const removeWaypoint = createAsyncThunk(
  "waypoints/removeWaypoint",
  async (waypoint: IWaypoint) => {
    try {
      // const response: any = await axios.delete(
      //   `http://localhost:8077/waypoint/${waypoint.waypoint_id}`,
      // );
      // return response;
    } catch (error) {}
  },
);

export const waypointSlice = createSlice({
  name: "waypoint",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export default waypointSlice.reducer;
