import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { robotApi } from "../api/api";
import { toast } from "sonner";

export const createDeploy = createAsyncThunk(
  "deploy/createDeploy",
  async (values: {
    orgId: string;
    regionName: string;
    providerRegion: string;
    instanceId: string;
    instanceName: string;
    isPhysicalInstance: boolean;
    fleetName: string;
    robotName: string;
    bridgeDistro: string;
    bridgeEnabled: boolean;
    volumeClaimTemplates: {
      name: string;
      capacity: string;
    }[];
    launchContainers: {
      replicas: number;
      container: {
        name: string;
        image: string;
        command: string;
        envs: { name: string; value: string }[];
        volumeMounts: { name: string; mountPath: string }[];
      };
    }[];
  }) => {
    const response = await robotApi.createFederatedRos2Workload({
      organizationId: values?.orgId,
      roboticsClouds: [
        {
          name: values?.regionName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.providerRegion,
              robolaunchFederatedRos2Workloads: [
                {
                  name: values.robotName,
                  fleetName: values.fleetName,
                  instanceName: values.instanceName,
                  isPhysicalInstance: values.isPhysicalInstance,
                  bridgeDistro: values.bridgeDistro,
                  bridgeEnabled: values.bridgeEnabled,
                  launchContainers: values.launchContainers,
                  // @ts-ignore
                  volumeClaimTemplates: values.volumeClaimTemplates,
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

export const getDeploys = createAsyncThunk(
  "deploy/getDeploys",
  async (values: {
    orgId: string;
    regionName: string;
    providerRegion: string;
    instanceId: string;
    fleetName: string;
  }) => {
    const response = await robotApi.getFederatedRos2Workloads({
      name: "deploy/getDeploys",
      organizationId: values.orgId,
      roboticsClouds: [
        {
          name: values.regionName,
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.providerRegion,
              robolaunchFederatedRos2Workloads: [
                { fleetName: values.fleetName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const getDeploy = createAsyncThunk(
  "deploy/getDeploys",
  async (values: {
    orgId: string;
    regionName: string;
    providerRegion: string;
    instanceId: string;
    fleetName: string;
    deployName: string;
  }) => {
    const response = await robotApi.getFederatedRos2Workloads({
      name: "deploy/getDeploys",
      organizationId: values.orgId,
      roboticsClouds: [
        {
          name: values.regionName,
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.providerRegion,
              robolaunchFederatedRos2Workloads: [
                { fleetName: values.fleetName, name: values.deployName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const deleteDeploy = createAsyncThunk(
  "deploy/deleteDeploy",
  async (values: {
    orgId: string;
    regionName: string;
    providerRegion: string;
    instanceId: string;
    fleetName: string;
    deployName: string;
  }) => {
    const response = await robotApi.deleteFederatedRos2Workload({
      name: "deploy/deleteDeploy",
      organizationId: values.orgId,
      roboticsClouds: [
        {
          name: values.regionName,
          cloudInstances: [
            {
              instanceId: values.instanceId,
              region: values.providerRegion,
              robolaunchFederatedRos2Workloads: [
                { fleetName: values.fleetName, name: values.deployName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  },
);

export const deploySlice = createSlice({
  name: "deploy",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDeploy.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createDeploy.rejected, () => {
        toast.error("Something went wrong of creating deploy");
      });
  },
});

export default deploySlice.reducer;
