import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { environmentApi, robotBuildManagerApi } from "../api/api";
import { toast } from "sonner";

export const getReadyEnvironments = createAsyncThunk(
  "environment/getReadyEnvironments",
  async () => {
    const response = await environmentApi.getRobolaunchReadyEnvironments({
      name: "environment/getReadyEnvironments",
    });
    return response.data;
  },
);

export const createEnvironment = createAsyncThunk(
  "environment/createEnvironment",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    environmentName: string;
    domainName: string;
    fleetName: string;
    ideGpuResource: number;
    ideGpuResourceType: string;
    vdiSessionCount: number;
    vdiGpuResource: number;
    storageAmount: number;
    applicationName: string;
    applicationVersion: string;
    devspaceUbuntuDistro: string;
    devspaceDesktop: string;
    devspaceVersion: string;
    workspaces: any;
    permittedDirectories: string;
    persistentDirectories: string;
    hostDirectories: string;
    ideCustomPorts: string;
    vdiCustomPorts: string;
    notebookEnabled: boolean;
    notebookGpuResource: number;
    notebookCustomPorts: string;
    applicationObject: any;
    templateAlias: string;
    templatePrivateSharing: boolean;
    templateOrganizationSharing: boolean;
    templatePublicSharing: boolean;
  }) => {
    const response = await environmentApi.createEnvironment({
      name: "environment/createEnvironment",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              environments: [
                {
                  name: values?.environmentName,
                  domainName: values?.domainName,
                  fleetName: values?.fleetName,
                  gpuEnabledForCloudInstance: true,
                  vdiEnabled: true,
                  vdiSessionCount: values?.vdiSessionCount,
                  vdiGpuResource: values?.vdiGpuResource,
                  ideEnabled: true,
                  ideGpuResource: values?.ideGpuResource,
                  ideGpuResourceType: values?.ideGpuResourceType,
                  storageAmount: values?.storageAmount,
                  application: {
                    name: values?.applicationName,
                    version: values?.applicationVersion,
                  },
                  devspace: {
                    ubuntuDistro: values?.devspaceUbuntuDistro,
                    desktop: values?.devspaceDesktop,
                    version: values?.devspaceVersion,
                  },
                  permittedDirectories: values?.permittedDirectories,
                  persistentDirectories: values?.persistentDirectories,
                  hostDirectories: values?.hostDirectories,
                  robotWorkspaces: values?.workspaces,
                  ideCustomPorts: values?.ideCustomPorts,
                  vdiCustomPorts: values?.vdiCustomPorts,
                  notebookEnabled: values?.notebookEnabled,
                  notebookGpuResource: values?.notebookGpuResource,
                  notebookCustomPorts: values?.notebookCustomPorts,
                  templateContent: values?.applicationObject,
                  templateName: values?.templateAlias,
                  templatePrivate: values?.templatePrivateSharing,
                  templateOrganizationLevelAvailable:
                    values?.templateOrganizationSharing,
                  templatePublicLevelAvailable: values?.templatePublicSharing,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getEnvironments = createAsyncThunk(
  "environment/getEnvironments",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
  }) => {
    const response = await environmentApi.getEnvironments({
      name: "environment/getEnvironments",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              environments: [{ fleetName: values?.fleetName }],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getEnvironment = createAsyncThunk(
  "environment/getEnvironment",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    environmentName: string;
  }) => {
    const response = await environmentApi.getEnvironment({
      name: "environment/getEnvironment",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              environments: [
                { fleetName: values?.fleetName, name: values?.environmentName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const deleteEnvironment = createAsyncThunk(
  "environment/deleteEnvironment",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    environmentName: string;
  }) => {
    const response = await environmentApi.deleteEnvironment({
      name: "environment/deleteEnvironment",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              environments: [
                { fleetName: values?.fleetName, name: values?.environmentName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const createBuildManager = createAsyncThunk(
  "environment/createBuildManager",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    environmentName: string;
    buildManagerName: string;
    steps: {
      name: string;
      isCommandCode: boolean;
      command: string;
    }[];
  }) => {
    const response = await robotBuildManagerApi.createApplicationBuildManager({
      name: "environment/createBuildManager",
      organizationId: values.organizationId,
      roboticsClouds: [
        {
          name: "frankfurt",
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.region,
              environments: [
                {
                  name: values.environmentName,
                  fleetName: values.fleetName,
                  buildManagerName: values.buildManagerName,
                  robotBuildSteps: values.steps,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getBuildManagers = createAsyncThunk(
  "environment/createBuildManager",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    environmentName: string;
  }) => {
    const response = await robotBuildManagerApi.getApplicationBuildManagers({
      name: "environment/createBuildManager",
      organizationId: values.organizationId,
      roboticsClouds: [
        {
          name: values.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.region,
              environments: [
                { fleetName: values.fleetName, name: values.environmentName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const deleteBuildManager = createAsyncThunk(
  "environment/deleteBuildManager",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    environmentName: string;
    buildManagerName: string;
  }) => {
    const response = await robotBuildManagerApi.getApplicationBuildManagers({
      name: "environment/deleteBuildManager",
      organizationId: values.organizationId,
      roboticsClouds: [
        {
          name: values.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.region,
              environments: [
                {
                  name: values.environmentName,
                  fleetName: values.fleetName,
                  buildManagerName: values.buildManagerName,
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const createDataScienceApp = createAsyncThunk(
  "environment/createDataScienceApp",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    applicationType: string;
    applicationName: string;
  }) => {
    const response = await environmentApi.createDataScienceApp({
      name: "environment/createDataScienceApp",
      organizationId: values.organizationId,
      roboticsClouds: [
        {
          name: values.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.region,
              environments: [
                {
                  name: values.applicationName,
                  fleetName: values.fleetName,
                  application: { name: values.applicationType },
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const deleteDataScienceApp = createAsyncThunk(
  "environment/deleteDataScienceApp",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
    applicationType: string;
    applicationName: string;
  }) => {
    const response = await environmentApi.deleteDataScienceApp({
      name: "environment/deleteDataScienceApp",
      organizationId: values.organizationId,
      roboticsClouds: [
        {
          name: values.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.region,
              environments: [
                {
                  name: values.applicationName,
                  fleetName: values.fleetName,
                  application: { name: values.applicationType },
                },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getDataScienceApps = createAsyncThunk(
  "environment/getDataScienceApps",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
  }) => {
    const response = await environmentApi.getDataScienceApps({
      name: "environment/getDataScienceApps",
      organizationId: values.organizationId,
      roboticsClouds: [
        {
          name: values.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.region,
              environments: [{ fleetName: values.fleetName }],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getTemplates = createAsyncThunk(
  "environment/getTemplates",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    instanceId: string;
    region: string;
    fleetName: string;
  }) => {
    const response = await environmentApi.getTemplates({
      name: "environment/getTemplates",
      organizationId: values.organizationId,
      roboticsClouds: [
        {
          name: values.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.region,
              environments: [{ fleetName: values.fleetName }],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const EnvironmentSlice = createSlice({
  name: "environment",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEnvironment.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createEnvironment.rejected, () => {
        toast.error("Something went wrong of creating application");
      })
      .addCase(getEnvironments.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getEnvironments.rejected, () => {
        toast.error("Something went wrong of getting applications");
      })
      .addCase(getEnvironment.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getEnvironment.rejected, () => {
        toast.error("Something went wrong of getting application");
      })
      .addCase(deleteEnvironment.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteEnvironment.rejected, () => {
        toast.error("Something went wrong of deleting application");
      })
      .addCase(createDataScienceApp.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createDataScienceApp.rejected, () => {
        toast.error("Something went wrong of creating application");
      })
      .addCase(deleteDataScienceApp.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteDataScienceApp.rejected, () => {
        toast.error("Something went wrong of deleting application");
      })
      .addCase(getDataScienceApps.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        }
      })
      .addCase(getDataScienceApps.rejected, () => {
        toast.error("Something went wrong of getting applications");
      });
  },
});

export default EnvironmentSlice.reducer;
