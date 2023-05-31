import { getFederatedFleets } from "../resources/FleetSlice";
import { getInstances } from "../resources/InstanceSlice";
import { getOrganizations } from "../resources/OrganizationSlice";
import { toast } from "sonner";
import { getFederatedRobot, getFederatedRobots } from "../resources/RobotSlice";
import { getRoboticsCloudsOfOrganization } from "../resources/RoboticsCloudSlice";

export function handleSetterCurrentOrganization({
  dispatch,
  url,
  navigate,
  setCurrentOrganization,
}: any) {
  dispatch(getOrganizations()).then((organizationsResponse: any) => {
    if (organizationsResponse?.payload?.data) {
      setCurrentOrganization(
        organizationsResponse?.payload?.data?.find(
          (organization: any) =>
            organization?.organizationName === `org_${url?.organizationName}`
        ) || undefined
      );
    } else {
      toast.error(
        "You are not have this content or not authorized to view this page."
      );
      navigate("/404");
    }
  });
}

export function handleSetterCurrentInstances({
  dispatch,
  url,
  navigate,
  currentOrganization,
  setCurrentInstance,
}: any) {
  dispatch(
    getInstances({
      organizationId: currentOrganization?.organizationId,
      roboticsCloudName: url?.roboticsCloudName,
    })
  ).then((responseInstances: any) => {
    if (
      Array.isArray(responseInstances?.payload?.data) &&
      Array.isArray(responseInstances?.payload?.data[0]?.roboticsClouds) &&
      responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
    ) {
      setCurrentInstance(
        responseInstances?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances?.find(
          (instance: any) => instance?.name === url?.instanceName
        ) || undefined
      );
    } else {
      toast.error(
        "You are not have this content or not authorized to view this page."
      );
      navigate("/404");
    }
  });
}

export function handleSetterResponseRoboticsCloud({
  dispatch,
  navigate,
  currentOrganization,
  setResponseRoboticsClouds,
}: any) {
  dispatch(
    getRoboticsCloudsOfOrganization({
      organizationId: currentOrganization?.organizationId,
    })
  ).then((response: any) => {
    if (response?.payload?.data[0]?.roboticsClouds) {
      setResponseRoboticsClouds(
        response?.payload?.data[0]?.roboticsClouds || []
      );
    } else {
      toast.error(
        "The current page does not exist or is not available to you."
      );
      navigate("/404");
    }
  });
}

export function handleSetterResponseInstances({
  dispatch,
  url,
  navigate,
  currentOrganization,
  setResponseInstances,
}: any) {
  dispatch(
    getInstances({
      organizationId: currentOrganization?.organizationId,
      roboticsCloudName: url?.roboticsCloudName,
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
      toast.error(
        "The current page does not exist or is not available to you."
      );
      navigate("/404");
    }
  });
}

export function handleSetterResponseFleets({
  dispatch,
  url,
  navigate,
  currentOrganization,
  currentInstance,
  setResponseFleets,
}: any) {
  dispatch(
    getFederatedFleets({
      organizationId: currentOrganization?.organizationId,
      roboticsCloudName: url?.roboticsCloudName,
      instanceId: currentInstance?.instanceId,
      region: currentInstance?.region,
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
      toast.error(
        "You are not have this content or not authorized to view this page."
      );
      navigate("/404");
    }
  });
}

export function handleSetterResponseRobots({
  dispatch,
  url,
  navigate,
  currentOrganization,
  currentInstance,
  setResponseRobots,
}: any) {
  dispatch(
    getFederatedRobots({
      organizationId: currentOrganization?.organizationId,
      roboticsCloudName: url?.roboticsCloudName,
      instanceId: currentInstance?.instanceId,
      region: currentInstance?.region,
      fleetName: url?.fleetName,
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
      toast.error(
        "You are not have this content or not authorized to view this page."
      );
      navigate("/404");
    }
  });
}

export function handleSetterResponseRobot({
  dispatch,
  url,
  navigate,
  currentOrganization,
  currentInstance,
  setResponseRobot,
}: any) {
  dispatch(
    getFederatedRobot({
      organizationId: currentOrganization?.organizationId,
      roboticsCloudName: url?.roboticsCloudName,
      instanceId: currentInstance?.instanceId,
      region: currentInstance?.region,
      fleetName: url?.fleetName,
      robotName: url?.robotName,
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
      toast.error(
        "You are not have this content or not authorized to view this page."
      );
      navigate("/404");
    }
  });
}
