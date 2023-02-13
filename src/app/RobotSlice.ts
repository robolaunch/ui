import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstanceOrganization from "../utils/axiosInstanceOrganization";
import { toast } from "react-toastify";
import { toastifyProperties } from "../tools/Toastify";

export const createRobot = createAsyncThunk(
  "cloud/createRobot",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/fleet/${value.fleetProcessId}/newRobot`,
        {
          fleetProcessId: value.fleetProcessId,
          federated: false,
          robot: {
            apiVersion: "robot.roboscale.io/v1alpha1",
            kind: "Robot",
            metadata: {
              name: value.robotName,
            },
            spec: {
              distributions: value.distributions,
              storage: {
                amount: value.storage,
                storageClassConfig: {
                  name: "openebs-hostpath",
                  accessMode: "ReadWriteOnce",
                },
              },
              discoveryServerTemplate: {
                type: "Client",
                cluster: value.cluster,
                hostname: "xxx",
                subdomain: "yyy",
              },
              rosBridgeTemplate: {
                ros: {
                  enabled: value.rosBridge,
                  distro: "noetic",
                },
                ros2: {
                  enabled: value.rosBridge,
                  distro: "foxy",
                },
                image: "robolaunchio/foxy-noetic-bridge:v0.0.3",
              },
              robotDevSuiteTemplate: {
                vdiEnabled: value.vdi,
                ideEnabled: value.ide,
                robotVDITemplate: {
                  serviceType: "NodePort",
                  ingress: false,
                  privileged: false,
                  sessionCount: value.vdiCount,
                  webrtcPortRange: "31016-31019",
                },
                robotIDETemplate: {
                  serviceType: "NodePort",
                  ingress: false,
                  privileged: false,
                },
              },
              workspaceManagerTemplate: {
                workspacesPath: "/root/workspaces",
                workspaces: value.workspaces,
              },
            },
          },
        }
      );
      if (response.status === 200) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createFederatedRobot = createAsyncThunk(
  "robot/createFederatedRobot",
  async (value: any, thunkAPI) => {
    console.log("CREATEFEDERATEDROBOTGELDİİ", value);
    try {
      const response = await axiosInstanceOrganization.post(
        `/fleet/${value.fleetProcessId}/newRobot`,
        {
          fleetProcessId: value.fleetProcessId,
          federated: true,
          federatedRobot: {
            apiVersion: "types.kubefed.io/v1beta1",
            kind: "FederatedRobot",
            metadata: {
              name: value.robotName,
              namespace: value.fleetName,
            },
            spec: {
              metadata: {
                name: value.robotName,
                namespace: value.fleetName,
              },
              spec: {
                clusters: value.clusters,
                distributions: value.distributions,
                storage: {
                  amount: value.storage,
                  storageClassConfig: {
                    name: "rook-ceph-block",
                    accessMode: "ReadWriteOnce",
                  },
                },
                discoveryServerTemplate: {
                  type: "Client",
                  reference: {
                    name: `${value.fleetName}-discovery`,
                    namespace: value.fleetName,
                  },
                  cluster: value.cluster,
                  hostname: "xxx",
                  subdomain: "yyy",
                },
                rosBridgeTemplate: {
                  ros: {
                    enabled: value.rosBridge,
                    distro: "noetic",
                  },
                  ros2: {
                    enabled: value.rosBridge,
                    distro: "foxy",
                  },
                  image: "robolaunchio/foxy-noetic-bridge:v0.0.3",
                },
                robotDevSuiteTemplate: {
                  vdiEnabled: value.vdi,
                  ideEnabled: value.ide,
                  robotVDITemplate: {
                    serviceType: "NodePort",
                    ingress: false,
                    privileged: false,
                    sessionCount: value.vdiCount,
                    webrtcPortRange: "31016-31019",
                  },
                  robotIDETemplate: {
                    serviceType: "NodePort",
                    ingress: false,
                    privileged: false,
                  },
                },
                workspaceManagerTemplate: {
                  workspacesPath: "/root/workspaces",
                  workspaces: value.workspaces,
                },
              },
              clusters: value.clusters.concat(value.cluster),
            },
          },
        }
      );
      if (response.status === 200) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getRobotsOrganization = createAsyncThunk(
  "cloud/getRobotsOrganization",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/getRobotsOrganization`,
        {
          organization: {
            name: value.organization.name,
          },
        }
      );
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getRobotsTeam = createAsyncThunk(
  "cloud/getRobotsTeam",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(`/getRobotsTeam`, {
        organization: {
          name: value.organization.name,
        },
        teamId: value.teamId,
      });
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getRobotsRoboticsCloud = createAsyncThunk(
  "cloud/getRobotsRoboticsCloud",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/getRobotsRoboticsCloud`,
        {
          roboticsCloudProcessId: value.roboticsCloudProcessId,
        }
      );
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getRobotsFleet = createAsyncThunk(
  "cloud/getRobotsFleet",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(`/getRobotsFleet`, {
        fleetProcessId: value.fleetProcessId,
      });
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createBuildManager = createAsyncThunk(
  "cloud/createFederatedBuildManager",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/robot/${value.robotProcessId}/newBuildManager`,
        {
          targetRobot: value.targetRobot,
          organization: {
            name: value.organization.name,
          },
          teamId: value.teamId,
          fleetName: value.fleetName,
          roboticsCloudName: value.roboticsCloudName,
          federated: value.federated,
          buildManager: {
            apiVersion: "robot.roboscale.io/v1alpha1",
            kind: "BuildManager",
            metadata: {
              name: value.buildName, // build adı (n step)
            },

            steps: value.steps,
          },
        }
      );
      if (response.status === 200) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createFederatedBuildManager = createAsyncThunk(
  "cloud/createFederatedBuildManager",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/createFederatedBuildManager`,
        {
          targetRobot: value.robotName,
          organization: {
            name: value.organization.name,
          },
          teamId: value.teamId,
          federated: true,
          federatedBuildManager: {
            apiVersion: "types.kubefed.io/v1beta1",
            kind: "FederatedBuildManager",
            metadata: {
              name: "build",
              namespace: "my-fleet",
            },
            spec: {
              metadata: {
                name: "build",
                namespace: "my-fleet",
              },
              steps: [
                {
                  name: "rosdep",
                  workspace: "arcelik-ws",
                  command:
                    "cd $WORKSPACES_PATH/arcelik-ws && source /opt/ros/galactic/setup.bash && apt-get update && rosdep update --include-eol-distros && rosdep install --from-path src --ignore-src -y -r",
                },
                {
                  name: "external",
                  workspace: "arcelik-ws",
                  script:
                    '#!/bin/bash\nset -eux\npip install odrive pyserial;\napt-key adv --keyserver keyserver.ubuntu.com --recv-key F6E65AC044F831AC80A06380C8B3A55A6F3EFCDE || sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-key F6E65AC044F831AC80A06380C8B3A55A6F3EFCDE;\napt-get install software-properties-common -y;\nadd-apt-repository "deb https://librealsense.intel.com/Debian/apt-repo $(lsb_release -cs) main" -u;\napt-get install librealsense2-dkms librealsense2-utils -y;\n',
                },
                {
                  name: "build",
                  workspace: "arcelik-ws",
                  command:
                    "cd $WORKSPACES_PATH/arcelik-ws && source /opt/ros/galactic/setup.bash && colcon build --symlink-install",
                },
                {
                  name: "build-2",
                  workspace: "arcelik-ws",
                  command:
                    "cd $WORKSPACES_PATH/arcelik-ws && source /opt/ros/galactic/setup.bash && colcon build --symlink-install",
                },
              ],
            },
          },
        }
      );
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const createLaunchManager = createAsyncThunk(
  "cloud/createLaunchManager",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(
        `/robot/${value.robotProcessId}/newLaunchManager`,
        {
          fleetName: value.fleetName,
          launchManager: {
            apiVersion: "robot.roboscale.io/v1alpha1",
            kind: "LaunchManager",
            metadata: {
              name: value.launchManagerName,
              namespace: value.fleetName,
            },
            launch: value.launchs,
          },
          federated: false,
          targetRobot: value.targetRobot,
          organization: value.organization.name,

          teamId: value.teamId,
          roboticsCloudName: value.roboticsCloudName,
          bufferName: value.bufferName,
          vdiEnabled: value.vdi,
        }
      );
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getRobot = createAsyncThunk(
  "cloud/getRobot",
  async (value: any, thunkAPI) => {
    try {
      const response = await axiosInstanceOrganization.post(`/getRobot`, {
        organization: {
          name: value.organization.name,
        },
        teamName: value.teamName,
        roboticsCloudName: value.roboticsCloudName,
        fleetName: value.fleetName,
        robotName: value.robotName,
      });
      if (response.status === 201) {
        return response;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const robotSlice = createSlice({
  name: "robot",
  initialState: {
    isSuccessCreateRobot: false,
    isErrorCreateRobot: false,
    isPendingCreateRobot: false,

    isSuccessCreateFederatedRobot: false,
    isErrorCreateFederatedRobot: false,
    isPendingCreateFederatedRobot: false,

    isSuccessGetRobotsOrganization: false,
    isErrorGetRobotsOrganization: false,
    isPendingGetRobotsOrganization: false,

    isSuccessGetRobotsTeam: false,
    isErrorGetRobotsTeam: false,
    isPendingGetRobotsTeam: false,

    isSuccessGetRobotsRoboticsCloud: false,
    isErrorGetRobotsRoboticsCloud: false,
    isPendingGetRobotsRoboticsCloud: false,

    isSuccessGetRobotsFleet: false,
    isErrorGetRobotsFleet: false,
    isPendingGetRobotsFleet: false,

    isSuccessCreateBuildManager: false,
    isErrorCreateBuildManager: false,
    isPendingCreateBuildManager: false,

    isSuccessCreateFederatedBuildManager: false,
    isErrorCreateFederatedBuildManager: false,
    isPendingCreateFederatedBuildManager: false,

    isSuccessCreateLaunchManager: false,
    isErrorCreateLaunchManager: false,
    isPendingCreateLaunchManager: false,

    isSuccessGetRobot: false,
    isErrorGetRobot: false,
    isPendingGetRobot: false,
  },
  reducers: {},
  extraReducers: {
    [createRobot.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [createRobot.pending.toString()]: (state: any) => {
      state.isPendingCreateRobot = true;
    },
    [createRobot.rejected.toString()]: (state: any) => {
      state.isErrorCreateRobot = true;
      state.isPendingCreateRobot = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [createFederatedRobot.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [createFederatedRobot.pending.toString()]: (state: any) => {
      state.isPendingCreateFederatedRobot = true;
    },
    [createFederatedRobot.rejected.toString()]: (state: any) => {
      state.isErrorCreateFederatedRobot = true;
      state.isPendingCreateFederatedRobot = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getRobotsOrganization.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [getRobotsOrganization.pending.toString()]: (state: any) => {
      state.isPendingGetRobotsOrganization = true;
    },
    [getRobotsOrganization.rejected.toString()]: (state: any) => {
      state.isErrorGetRobotsOrganization = true;
      state.isPendingGetRobotsOrganization = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getRobotsTeam.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [getRobotsTeam.pending.toString()]: (state: any) => {
      state.isPendingGetRobotsTeam = true;
    },
    [getRobotsTeam.rejected.toString()]: (state: any) => {
      state.isErrorGetRobotsTeam = true;
      state.isPendingGetRobotsTeam = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getRobotsRoboticsCloud.fulfilled.toString()]: (
      state: any,
      { payload }
    ) => {
      console.log(payload);
    },
    [getRobotsRoboticsCloud.pending.toString()]: (state: any) => {
      state.isPendingGetRobotsRoboticsCloud = true;
    },
    [getRobotsRoboticsCloud.rejected.toString()]: (state: any) => {
      state.isErrorGetRobotsRoboticsCloud = true;
      state.isPendingGetRobotsRoboticsCloud = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getRobotsFleet.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [getRobotsFleet.pending.toString()]: (state: any) => {
      state.isPendingGetRobotsFleet = true;
    },
    [getRobotsFleet.rejected.toString()]: (state: any) => {
      state.isErrorGetRobotsFleet = true;
      state.isPendingGetRobotsFleet = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [createBuildManager.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [createBuildManager.pending.toString()]: (state: any) => {
      state.isPendingCreateBuildManager = true;
    },
    [createBuildManager.rejected.toString()]: (state: any) => {
      state.isErrorCreateBuildManager = true;
      state.isPendingCreateBuildManager = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [createFederatedBuildManager.fulfilled.toString()]: (
      state: any,
      { payload }
    ) => {
      console.log(payload);
    },
    [createFederatedBuildManager.pending.toString()]: (state: any) => {
      state.isPendingCreateFederatedBuildManager = true;
    },
    [createFederatedBuildManager.rejected.toString()]: (state: any) => {
      state.isErrorCreateFederatedBuildManager = true;
      state.isPendingCreateFederatedBuildManager = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [createLaunchManager.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [createLaunchManager.pending.toString()]: (state: any) => {
      state.isPendingCreateLaunchManager = true;
    },
    [createLaunchManager.rejected.toString()]: (state: any) => {
      state.isErrorCreateLaunchManager = true;
      state.isPendingCreateLaunchManager = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
    //
    //
    //
    [getRobot.fulfilled.toString()]: (state: any, { payload }) => {
      console.log(payload);
    },
    [getRobot.pending.toString()]: (state: any) => {
      state.isPendingGetRobot = true;
    },
    [getRobot.rejected.toString()]: (state: any) => {
      state.isErrorGetRobot = true;
      state.isPendingGetRobot = false;
      toast.error("An error occurred while fetching data.", toastifyProperties);
    },
  },
});
