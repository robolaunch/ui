import axiosInterceptorOpenApi from "../utils/axios.interceptor.openapi";
import {
  Configuration,
  OrganizationRepositoryImplApi,
  RobotApi,
  KubernetesApi,
  RobotBuildManagerApi,
  RobotLaunchManagerApi,
  CreateInstanceApi,
  CombinedFunctionsApi,
} from "./openapi";

const apiConfig: Configuration = new Configuration({
  basePath: process.env.REACT_APP_BACKEND_URL,
});

export const organizationApi: OrganizationRepositoryImplApi =
  new OrganizationRepositoryImplApi(
    apiConfig,
    process.env.REACT_APP_BACKEND_URL,
    axiosInterceptorOpenApi
  );

export const robotApi: RobotApi = new RobotApi(
  apiConfig,
  process.env.REACT_APP_BACKEND_URL,
  axiosInterceptorOpenApi
);

export const kubernetesApi: KubernetesApi = new KubernetesApi(
  apiConfig,
  process.env.REACT_APP_BACKEND_URL,
  axiosInterceptorOpenApi
);

export const robotBuildManagerApi: RobotBuildManagerApi =
  new RobotBuildManagerApi(
    apiConfig,
    process.env.REACT_APP_BACKEND_URL,
    axiosInterceptorOpenApi
  );

export const robotLaunchManagerApi: RobotLaunchManagerApi =
  new RobotLaunchManagerApi(
    apiConfig,
    process.env.REACT_APP_BACKEND_URL,
    axiosInterceptorOpenApi
  );

export const createInstanceApi: CreateInstanceApi = new CreateInstanceApi(
  apiConfig,
  process.env.REACT_APP_BACKEND_URL,
  axiosInterceptorOpenApi
);

export const trialApi: CombinedFunctionsApi = new CombinedFunctionsApi(
  apiConfig,
  process.env.REACT_APP_BACKEND_URL,
  axiosInterceptorOpenApi
);
