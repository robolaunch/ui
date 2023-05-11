import axiosInterceptor from "../utils/axios.interceptor";
import { Configuration, OrganizationRepositoryImplApi } from "./keycloak";

const apiConfig: Configuration = new Configuration({
  basePath: process.env.REACT_APP_BACKEND_URL,
});

export const api: OrganizationRepositoryImplApi =
  new OrganizationRepositoryImplApi(
    apiConfig,
    process.env.REACT_APP_BACKEND_URL,
    axiosInterceptor
  );
