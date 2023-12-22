import axios from "axios";

const axiosInterceptorOpenApi: any = axios.create({});

axiosInterceptorOpenApi.interceptors.request.use(async (req: any) => {
  const { tokens } = JSON.parse(localStorage.getItem("tokens") || "{}");

  if (tokens?.token) {
    req.headers.Authorization = `Bearer ${tokens.token}`;
  }

  return req;
});

axiosInterceptorOpenApi.interceptors.response.use(async (res: any) => {
  console.log("axios", res);
  return res;
});

export default axiosInterceptorOpenApi;
