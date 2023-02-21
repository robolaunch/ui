import axios from "axios";

const axiosInterceptor: any = axios.create({});

axiosInterceptor.interceptors.request.use(async (req: any) => {
  return req;
});

export default axiosInterceptor;
