import axiosInterceptorOpenApi from "../utils/axios.interceptor.openapi";
import {
  Configuration,
  OrganizationRepositoryImplApi,
  AwsApi,
  RobotApi,
  KubernetesApi,
  RobotBuildManagerApi,
  CreateInstanceApi,
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

export const awsApi: AwsApi = new AwsApi(
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

export const createInstanceApi: CreateInstanceApi = new CreateInstanceApi(
  apiConfig,
  process.env.REACT_APP_BACKEND_URL,
  axiosInterceptorOpenApi
);
