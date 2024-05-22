import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IJob } from "../interfaces/task-management.interface";

const cloudUrl = "http://localhost:8077";

export const getJobs = createAsyncThunk("jobs/getJobs", async () => {
  try {
    const response: any = await axios.get(`${cloudUrl}/job`);

    const jobs: IJob[] =
      response?.data?.data?.map((job: any) => {
        return {
          ...job,
          waypoints: JSON.parse(job.waypoints),
        };
      }) || [];

    return jobs;
  } catch (error) {}
});

export const addJob = createAsyncThunk("jobs/addJob", async (job: IJob) => {
  try {
    const response: any = await axios.post(`${cloudUrl}/job`, job);

    return response;
  } catch (error) {}
});

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async (job: IJob) => {
    try {
      const response: any = await axios.put(
        `${cloudUrl}/job/${job.job_id}`,
        job,
      );

      return response;
    } catch (error) {}
  },
);

export const removeJob = createAsyncThunk(
  "jobs/removeJob",
  async (job: IJob) => {
    try {
      const response: any = await axios.delete(`${cloudUrl}/job/${job.job_id}`);

      return response;
    } catch (error) {}
  },
);

export const startJob = createAsyncThunk("jobs/startJob", async (job: IJob) => {
  try {
    const response: any = await axios.post(`${cloudUrl}/job/start`, job);

    return response;
  } catch (error) {}
});

export const stopJob = createAsyncThunk("jobs/stopJob", async (job: IJob) => {
  try {
    const response: any = await axios.post(`${cloudUrl}/job/stop`, job);

    return response;
  } catch (error) {}
});

export const waypointSlice = createSlice({
  name: "job",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export default waypointSlice.reducer;
