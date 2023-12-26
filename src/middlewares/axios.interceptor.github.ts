import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInterceptorGithub: any = axios.create({});

axiosInterceptorGithub.interceptors.request.use((req: AxiosRequestConfig) => {
  req.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("githubTokens") as any,
  )?.access_token}`;
  req.headers.Accept = `application/vnd.github+json`;
  req.headers["Content-Type"] = `application/json`;
  return req;
});

axiosInterceptorGithub.interceptors.response.use((res: AxiosResponse) => {
  return res;
});

export default axiosInterceptorGithub;
