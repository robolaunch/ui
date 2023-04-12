import React, { createContext } from "react";
import { Configuration, OrganizationRepositoryImplApi } from "../api";
import axiosInterceptor from "../utils/axios.interceptor";
export const ApiContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const apiConfig: Configuration = new Configuration({
    basePath: process.env.REACT_APP_BACKEND_URL,
  });

  const api: OrganizationRepositoryImplApi = new OrganizationRepositoryImplApi(
    apiConfig,
    process.env.REACT_APP_BACKEND_URL,
    axiosInterceptor
  );

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};
