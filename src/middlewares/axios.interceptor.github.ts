import axios from "axios";

const axiosInterceptorGithub: any = axios.create({});

axiosInterceptorGithub.interceptors.request.use(async (req: any) => {
  req.headers.Authorization = `Bearer ${JSON.parse(
    localStorage.getItem("githubTokens") as any,
  )?.access_token}`;
  req.headers.Accept = `application/vnd.github+json`;
  req.headers["Content-Type"] = `application/json`;
  return req;
});

axiosInterceptorGithub.interceptors.response.use(async (res: any) => {
  return res;
});

export default axiosInterceptorGithub;
