import axios from "axios";

const axiosInterceptor: any = axios.create({});

axiosInterceptor.interceptors.request.use(async (req: any) => {
  const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");

  if (tokens?.token) {
    req.headers.Authorization = `Bearer ${tokens.token}`;
  }

  return req;
});

axiosInterceptor.interceptors.response.use(async (res: any) => {
  console.log("axiosInterceptor", res);
  return res;
});

export default axiosInterceptor;
