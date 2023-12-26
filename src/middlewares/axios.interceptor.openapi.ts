import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const axiosInterceptorOpenApi: any = axios.create({});

axiosInterceptorOpenApi.interceptors.request.use((req: AxiosRequestConfig) => {
  const { tokens } = JSON.parse(localStorage.getItem("tokens") || "{}");

  if (tokens?.token) {
    req.headers.Authorization = `Bearer ${tokens.token}`;
  }

  return req;
});

axiosInterceptorOpenApi.interceptors.response.use((res: AxiosResponse) => {
  console.log("axios.response", res);
  return res;
});

export default axiosInterceptorOpenApi;
