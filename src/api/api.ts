import axiosInterceptor from "../utils/axios.interceptor";
import { Configuration, OrganizationRepositoryImplApi } from "./openapi";

const apiConfig: Configuration = new Configuration({
  basePath: process.env.REACT_APP_BACKEND_URL,
});

export const organizationApi: OrganizationRepositoryImplApi =
  new OrganizationRepositoryImplApi(
    apiConfig,
    process.env.REACT_APP_BACKEND_URL,
    axiosInterceptor
  );
