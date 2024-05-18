import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IJob } from "../interfaces/task-management.interface";

export const getJobs = createAsyncThunk("jobs/getJobs", async () => {
  try {
    const response: any = await axios.get("http://localhost:8077/job");

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
    const response: any = await axios.post("http://localhost:8077/job", job);

    return response;
  } catch (error) {}
});

export const updateJob = createAsyncThunk(
  "jobs/updateJob",
  async (job: IJob) => {
    try {
      const response: any = await axios.put(
        `http://localhost:8077/job/${job.job_id}`,
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
      const response: any = await axios.delete(
        `http://localhost:8077/job/${job.job_id}`,
      );

      return response;
    } catch (error) {}
  },
);

export const waypointSlice = createSlice({
  name: "job",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {},
});

export default waypointSlice.reducer;
