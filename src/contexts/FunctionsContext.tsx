import React, { createContext } from "react";
import { useAppDispatch } from "../hooks/redux";
import { getOrganizations } from "../resources/OrganizationSlice";
import useSidebar from "../hooks/useSidebar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getInstances } from "../resources/InstanceSlice";
import {
  getFederatedRobot,
  getFederatedRobots,
  getRobotBuildManagers,
} from "../resources/RobotSlice";
import { getFederatedFleets } from "../resources/FleetSlice";
import { getRoboticsCloudsOfOrganization } from "../resources/RoboticsCloudSlice";

export const FunctionsContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const dispatch = useAppDispatch();
  const { selectedState, setSelectedState } = useSidebar();
  const navigate = useNavigate();

  async function handleSetterCurrentOrganization(urlOrganizationName: string) {
    await dispatch(getOrganizations()).then((organizationsResponse: any) => {
      if (organizationsResponse?.payload?.data) {
        setSelectedState((prevState: any) => {
          return {
            ...prevState,
            organization: organizationsResponse?.payload?.data?.find(
              (organization: any) =>
                organization?.organizationName === `org_${urlOrganizationName}`
            ),
          };
        });
      } else {
        navigateTo404();
      }
    });
  }

  function handleSetterCurrentRoboticsCloud(urlRoboticsCloudName: string) {
    setSelectedState((prevState: any) => {
      return {
        ...prevState,
        roboticsCloud: { name: urlRoboticsCloudName },
      };
    });
  }

  async function handleSetterCurrentInstance(urlInstanceName: string) {
    await dispatch(
      getInstances({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
      })
    ).then((responseInstances: any) => {
      if (
        Array.isArray(responseInstances?.payload?.data) &&
        Array.isArray(responseInstances?.payload?.data[0]?.roboticsClouds) &&
        responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
      ) {
        setSelectedState((prevState: any) => {
          return {
            ...prevState,
            instance:
              responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
                (instance: any) => instance?.name === urlInstanceName
              ) || undefined,
          };
        });
      } else {
        navigateTo404();
      }
    });
  }

  function handleSetterCurrentFleet(urlFleetName: string) {
    setSelectedState((prevState: any) => {
      return {
        ...prevState,
        fleet: { name: urlFleetName },
      };
    });
  }

  async function handleSetterResponseOrganizations(
    setResponseOrganizations: any
  ) {
    await dispatch(getOrganizations()).then(
      async (organizationsResponse: any) => {
        if (organizationsResponse?.payload?.data) {
          await setResponseOrganizations(
            organizationsResponse?.payload?.data || []
          );
        } else {
          navigateTo404();
        }
      }
    );
  }

  async function handleSetterResponseRoboticsClouds(
    setResponseRoboticsClouds: any
  ) {
    await dispatch(
      getRoboticsCloudsOfOrganization({
        organizationId: selectedState?.organization?.organizationId,
      })
    ).then(async (response: any) => {
      if (response?.payload?.data[0]?.roboticsClouds) {
        await setResponseRoboticsClouds(
          response?.payload?.data[0]?.roboticsClouds || []
        );
      } else {
        navigateTo404();
      }
    });
  }

  async function handleSetterResponseInstances(setResponseInstances: any) {
    await dispatch(
      getInstances({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
      })
    ).then(async (responseInstances: any) => {
      if (
        Array.isArray(responseInstances?.payload?.data) &&
        Array.isArray(responseInstances?.payload?.data[0]?.roboticsClouds) &&
        responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
      ) {
        await setResponseInstances(
          responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
        );
      } else {
        navigateTo404();
      }
    });
  }

  async function handleSetterResponseFleets(setResponseFleets: any) {
    await dispatch(
      getFederatedFleets({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
      })
    ).then(async (responseFederatedFleets: any) => {
      if (
        Array.isArray(responseFederatedFleets?.payload?.data) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds
        ) &&
        Array.isArray(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedFleets
      ) {
        await setResponseFleets(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances[0]?.robolaunchFederatedFleets || []
        );
      } else {
        navigateTo404();
      }
    });
  }

  async function handleSetterResponseRobots(setResponseRobots: any) {
    await dispatch(
      getFederatedRobots({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.roboticsCloudName,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
      })
    ).then(async (responseRobots: any) => {
      if (
        Array.isArray(responseRobots?.payload?.data) &&
        Array.isArray(responseRobots?.payload?.data[0]?.roboticsClouds) &&
        Array.isArray(
          responseRobots?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
        ) &&
        responseRobots?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
          ?.robolaunchFederatedRobots
      ) {
        await setResponseRobots(
          responseRobots?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
            ?.robolaunchFederatedRobots
        );
      } else {
        navigateTo404();
      }
    });
  }

  async function handleSetterResponseRobot(
    urlRobotName: string,
    setResponseRobot: any
  ) {
    await dispatch(
      getFederatedRobot({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: urlRobotName,
      })
    ).then(async (responseRobot: any) => {
      if (
        Array.isArray(responseRobot?.payload?.data) &&
        Array.isArray(responseRobot?.payload?.data[0]?.roboticsClouds) &&
        Array.isArray(
          responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
        ) &&
        Array.isArray(
          responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
            ?.robolaunchFederatedRobots
        ) &&
        responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
          ?.robolaunchFederatedRobots[0]
      ) {
        await setResponseRobot(
          responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
            ?.robolaunchFederatedRobots[0]
        );
      } else {
        navigateTo404();
      }
    });
  }

  async function handleSetterResponseBuildManagers(
    urlRobotName: string,
    setResponseRobotBuildManagers: any
  ) {
    await dispatch(
      getRobotBuildManagers({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: urlRobotName,
      })
    ).then((responseRobotBuildManagers: any) => {
      if (
        Array.isArray(responseRobotBuildManagers?.payload?.data) &&
        Array.isArray(
          responseRobotBuildManagers?.payload?.data[0]?.roboticsClouds
        ) &&
        Array.isArray(
          responseRobotBuildManagers?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances
        ) &&
        responseRobotBuildManagers?.payload?.data[0]?.roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
      ) {
        setResponseRobotBuildManagers(
          responseRobotBuildManagers?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
        );
      }
    });
  }

  function navigateTo404() {
    toast.error("The current page does not exist or is not available to you.");
    navigate("/404");
  }

  return (
    <FunctionsContext.Provider
      value={{
        handleSetterCurrentOrganization,
        handleSetterCurrentRoboticsCloud,
        handleSetterCurrentInstance,
        handleSetterCurrentFleet,
        handleSetterResponseOrganizations,
        handleSetterResponseRoboticsClouds,
        handleSetterResponseInstances,
        handleSetterResponseFleets,
        handleSetterResponseRobots,
        handleSetterResponseRobot,
        handleSetterResponseBuildManagers,
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
