import React, { createContext } from "react";
import { useAppDispatch } from "../hooks/redux";
import { getOrganizations } from "../resources/OrganizationSlice";
import useSidebar from "../hooks/useSidebar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getInstances } from "../resources/InstanceSlice";
import { getFederatedRobot, getFederatedRobots } from "../resources/RobotSlice";
import { getFederatedFleets } from "../resources/FleetSlice";
import { getRoboticsCloudsOfOrganization } from "../resources/RoboticsCloudSlice";

export const FunctionsContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const dispatch = useAppDispatch();
  const { selectedState, setSelectedState } = useSidebar();
  const navigate = useNavigate();

  function handleSetterCurrentOrganization(urlOrganizationName: string) {
    dispatch(getOrganizations()).then((organizationsResponse: any) => {
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

  function handleSetterCurrentInstance(urlInstanceName: string) {
    dispatch(
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

  function handleSetterResponseOrganizations(setResponseOrganizations: any) {
    dispatch(getOrganizations()).then((organizationsResponse: any) => {
      if (organizationsResponse?.payload?.data) {
        setResponseOrganizations(organizationsResponse?.payload?.data || []);
      } else {
        navigateTo404();
      }
    });
  }

  function handleSetterResponseRoboticsClouds(setResponseRoboticsClouds: any) {
    dispatch(
      getRoboticsCloudsOfOrganization({
        organizationId: selectedState?.organization?.organizationId,
      })
    ).then((response: any) => {
      if (response?.payload?.data[0]?.roboticsClouds) {
        setResponseRoboticsClouds(
          response?.payload?.data[0]?.roboticsClouds || []
        );
      } else {
        navigateTo404();
      }
    });
  }

  function handleSetterResponseInstances(setResponseInstances: any) {
    dispatch(
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
        setResponseInstances(
          responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
        );
      } else {
        navigateTo404();
      }
    });
  }

  function handleSetterResponseFleets(setResponseFleets: any) {
    dispatch(
      getFederatedFleets({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
      })
    ).then((responseFederatedFleets: any) => {
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
        setResponseFleets(
          responseFederatedFleets?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances[0]?.robolaunchFederatedFleets || []
        );
      } else {
        navigateTo404();
      }
    });
  }

  function handleSetterResponseRobots(setResponseRobots: any) {
    dispatch(
      getFederatedRobots({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.roboticsCloudName,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
      })
    ).then((responseRobots: any) => {
      if (
        Array.isArray(responseRobots?.payload?.data) &&
        Array.isArray(responseRobots?.payload?.data[0]?.roboticsClouds) &&
        Array.isArray(
          responseRobots?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
        ) &&
        responseRobots?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
          ?.robolaunchFederatedRobots
      ) {
        setResponseRobots(
          responseRobots?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
            ?.robolaunchFederatedRobots
        );
      } else {
        navigateTo404();
      }
    });
  }

  function handleSetterResponseRobot(
    urlRobotName: string,
    setResponseRobot: any
  ) {
    dispatch(
      getFederatedRobot({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: urlRobotName,
      })
    ).then((responseRobot: any) => {
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
        setResponseRobot(
          responseRobot?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
            ?.robolaunchFederatedRobots[0]
        );
      } else {
        navigateTo404();
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
      }}
    >
      {children}
    </FunctionsContext.Provider>
  );
};
