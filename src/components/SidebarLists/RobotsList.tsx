import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getFederatedRobots } from "../../resources/RobotSlice";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import StateCell from "../Cells/StateCell";

interface IRobotsList {
  reload: boolean;
  setItemCount: any;
}

export default function RobotsList({
  reload,
  setItemCount,
}: IRobotsList): ReactElement {
  const [responseRobots, setResponseRobots] = useState<any>(undefined);
  const { selectedState } = useSidebar();
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance &&
        selectedState?.fleet
      ) {
        setResponseRobots(undefined);
        dispatch(
          getFederatedRobots({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.instance?.region,
            fleetName: selectedState?.fleet?.name,
          })
        ).then((response: any) => {
          if (
            Array.isArray(response?.payload?.data) &&
            Array.isArray(response?.payload?.data[0]?.roboticsClouds) &&
            Array.isArray(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
            ) &&
            response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
              ?.robolaunchFederatedRobots
          ) {
            setResponseRobots(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
                ?.robolaunchFederatedRobots || []
            );
            setItemCount(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
                ?.robolaunchFederatedRobots?.length || 0
            );
          }
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      dispatch,
      reload,
      selectedState?.instance,
      selectedState?.organization,
      selectedState?.roboticsCloud,
      selectedState?.fleet,
    ]
  );

  return (
    <Fragment>
      {!selectedState?.organization ||
      !selectedState?.roboticsCloud ||
      !selectedState?.instance ||
      !selectedState?.fleet ? (
        <SidebarInfo
          text={`Select an ${
            !selectedState?.organization
              ? "Organization"
              : !selectedState?.roboticsCloud
              ? "Robotics Cloud"
              : !selectedState?.instance
              ? "Instance"
              : "Fleet"
          } to view robots.`}
        />
      ) : !Array.isArray(responseRobots) ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : responseRobots.length === 0 ? (
        <SidebarInfo text={`No robots.`} />
      ) : (
        <Fragment>
          {responseRobots.map((robot: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="robot"
                name={robot?.name}
                description={
                  <div className="flex gap-4">
                    <StateCell
                      state={
                        Array.isArray(robot?.robotClusters) &&
                        robot?.robotClusters[0]?.robotStatus ===
                          "EnvironmentReady"
                          ? "Ready"
                          : robot?.robotClusters[0]?.robotStatus
                      }
                    />
                    <StateCell
                      state={
                        Array.isArray(robot?.robotClusters) &&
                        robot?.robotClusters[1]?.robotStatus ===
                          "EnvironmentReady"
                          ? "Ready"
                          : robot?.robotClusters[1]?.robotStatus
                      }
                    />
                  </div>
                }
                url={`/${robot?.robotName}`}
                data={robot}
                notSelectable
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
