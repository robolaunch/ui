import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { kubernetesApi } from "../api/api";
import { toast } from "sonner";

export const createFederatedFleet = createAsyncThunk(
  "instance/createFederatedFleet",
  async (values: any) => {
    const response = await kubernetesApi.createFederatedFleet({
      name: values?.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedFleets: [
                { name: values?.robolaunchFederatedFleetsName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const getFederatedFleets = createAsyncThunk(
  "instance/getFederatedFleets",
  async (values: {
    organizationId: string;
    roboticsCloudName: string;
    region: string;
    instanceId: string;
  }) => {
    const response = await kubernetesApi.getFederatedFleets({
      name: "instance/getFederatedFleets",
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            { instanceId: values?.instanceId, region: values?.region },
          ],
        },
      ],
    });
    return response.data;
  }
);

// export const getFederatedFleetStatus = createAsyncThunk(
//   "instance/getFederatedFleetStatus",
//   async (values: any) => {
//     const response = await kubernetesApi.getFederatedFleetStatus({
//       name: values.name,
//       organizationId: values?.organizationId,
//       roboticsClouds: [
//         {
//           name: values?.roboticsCloudName,
//           cloudInstances: [
//             {
//               instanceId: values?.instanceId,
//               region: values?.region,
//               robolaunchFederatedFleets: [{ name: values?.fleetName }],
//             },
//           ],
//         },
//       ],
//     });
//     return response.data;
//   }
// );

export const deleteFederatedFleet = createAsyncThunk(
  "instance/deleteFederatedFleet",
  async (values: any) => {
    const response = await kubernetesApi.deleteFederatedFleet({
      name: values?.name,
      organizationId: values?.organizationId,
      roboticsClouds: [
        {
          name: values?.roboticsCloudName,
          cloudInstances: [
            {
              instanceId: values?.instanceId,
              region: values?.region,
              robolaunchFederatedFleets: [
                { name: values?.robolaunchFederatedFleetsName },
              ],
            },
          ],
        },
      ],
    });
    return response.data;
  }
);

export const FleetSlice = createSlice({
  name: "fleet",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createFederatedFleet.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(createFederatedFleet.rejected, () => {
        toast.error("Something went wrong of creating fleet");
      })
      .addCase(getFederatedFleets.rejected, () => {
        toast.error("Something went wrong of getting fleets");
      })
      // .addCase(getFederatedFleetStatus.rejected, () => {
      //   toast.error("Something went wrong of getting fleet status");
      // })
      .addCase(deleteFederatedFleet.fulfilled, (_, action: any) => {
        if (!action?.payload?.success) {
          toast.error(action?.payload?.message);
        } else {
          toast.success(action?.payload?.message);
        }
      })
      .addCase(deleteFederatedFleet.rejected, () => {
        toast.error("Something went wrong of deleting fleet");
      });
  },
});

export default FleetSlice.reducer;
