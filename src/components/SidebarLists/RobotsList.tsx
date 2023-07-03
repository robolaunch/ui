import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useSidebar from "../../hooks/useSidebar";
import StateCell from "../Cells/StateCell";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";

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
  const { getRobots } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance &&
        selectedState?.fleet
      ) {
        setResponseRobots(undefined);
        handleGetRobots();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          selectedState?.instance &&
          selectedState?.fleet &&
          handleGetRobots();
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reload]
  );

  function handleGetRobots() {
    getRobots(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseRobots,
        setItemCount: setItemCount,
      }
    );
  }

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
        <SidebarListLoader />
      ) : responseRobots?.length === 0 ? (
        <SidebarInfo text={`Create a Robot.`} />
      ) : (
        <Fragment>
          {responseRobots?.map((robot: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="robot"
                name={robot?.name}
                description={
                  <div className="flex gap-2">
                    <div className="flex gap-1.5">
                      <span className="font-medium">VR:</span>
                      <StateCell
                        state={
                          Array.isArray(robot?.robotClusters) &&
                          robot?.robotClusters[0]?.robotStatus ===
                            "EnvironmentReady"
                            ? "Ready"
                            : robot?.robotClusters[0]?.robotStatus
                        }
                      />
                    </div>
                    {Array.isArray(robot?.robotClusters) &&
                      robot?.robotClusters.length > 1 && (
                        <div className="flex gap-1.5">
                          <span className="font-medium">PR:</span>

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
                      )}
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
