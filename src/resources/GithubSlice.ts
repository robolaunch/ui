import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInterceptorGithub from "../utils/axios.interceptor.github";
import { toast } from "sonner";

export const getGithubAccessTokenwithCode = createAsyncThunk(
  "github/getGithubAccessTokenwithCode",
  async (values: any) => {
    const response = await axios.post(
      "http://localhost:8081/getGithubAccessTokenwithCode",
      {
        code: values.code,
        githubUserId: values.githubUserId,
      }
    );
    return response;
  }
);

export const getGithubAccessTokenwithRefreshToken = createAsyncThunk(
  "github/getGithubAccessTokenwithRefreshToken",
  async (values: any) => {
    const response = await axios.post(
      "http://localhost:8081/getGithubAccessTokenwithRefreshToken",
      {
        refresh_token: values?.refresh_token,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  }
);

export const getGithubUserRepositories = createAsyncThunk(
  "github/getGithubUserRepositories",
  async (_) => {
    const response = await axiosInterceptorGithub.get(
      "https://api.github.com/user/repos"
    );
    return response;
  }
);

export const getGithubRepositoryBranches = createAsyncThunk(
  "github/getGithubRepositoryBranches",
  async (values: any) => {
    const response = await axiosInterceptorGithub.get(
      `https://api.github.com/repos/${values.owner}/${values.repo}/branches`
    );
    return response;
  }
);

export const githubSlice = createSlice({
  name: "github",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getGithubAccessTokenwithCode.fulfilled,
        (state: any, action: any) => {
          if (action?.payload?.success) {
            toast.success(action?.payload?.message);
          } else {
            toast.error(action?.payload?.message);
          }
        }
      )
      .addCase(getGithubAccessTokenwithCode.rejected, (action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(
        getGithubAccessTokenwithRefreshToken.fulfilled,
        (state: any, action: any) => {
          if (!action?.payload?.success) {
            toast.error(action?.payload?.message);
          }
        }
      )
      .addCase(getGithubAccessTokenwithRefreshToken.rejected, (action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(
        getGithubUserRepositories.fulfilled,
        (state: any, action: any) => {
          if (!action?.payload?.success) {
            toast.error(action?.payload?.message);
          }
        }
      )
      .addCase(getGithubUserRepositories.rejected, (action: any) => {
        toast.error("Something went wrong");
      })
      .addCase(
        getGithubRepositoryBranches.fulfilled,
        (state: any, action: any) => {
          if (!action?.payload?.success) {
            toast.error(action?.payload?.message);
          }
        }
      )
      .addCase(getGithubRepositoryBranches.rejected, (action: any) => {
        toast.error("Something went wrong");
      });
  },
});

export default githubSlice.reducer;
