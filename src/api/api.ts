import axiosInterceptor from "../utils/axios.interceptor";
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
    axiosInterceptor
  );

export const awsApi: AwsApi = new AwsApi(
  apiConfig,
  process.env.REACT_APP_BACKEND_URL,
  axiosInterceptor
);

export const robotApi: RobotApi = new RobotApi(
  apiConfig,
  process.env.REACT_APP_BACKEND_URL,
  axiosInterceptor
);

export const kubernetesApi: KubernetesApi = new KubernetesApi(
  apiConfig,
  process.env.REACT_APP_BACKEND_URL,
  axiosInterceptor
);

export const robotBuildManagerApi: RobotBuildManagerApi =
  new RobotBuildManagerApi(
    apiConfig,
    process.env.REACT_APP_BACKEND_URL,
    axiosInterceptor
  );

export const createInstanceApi: CreateInstanceApi = new CreateInstanceApi(
  apiConfig,
  process.env.REACT_APP_BACKEND_URL,
  axiosInterceptor
);
