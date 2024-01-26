import { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import StateCell from "../TableInformationCells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

interface IEnvironmentsList {
  reload: boolean;
  setItemCount: any;
}

export default function EnvironmentsList({
  reload,
  setItemCount,
}: IEnvironmentsList): ReactElement {
  const [responseEnvironments, setResponseEnvironments] =
    useState<any>(undefined);
  const { selectedState } = useMain();
  const { getEnvironments } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance &&
        selectedState?.fleet
      ) {
        setResponseEnvironments(undefined);
        handleGetEnvironments();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          selectedState?.instance &&
          selectedState?.fleet &&
          handleGetEnvironments();
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reload],
  );

  function handleGetEnvironments() {
    getEnvironments(
      {
        organizationId: selectedState?.organization?.id!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.instanceId!,
        region: selectedState?.instance?.region!,
        fleetName: selectedState?.fleet?.name!,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseEnvironments,
        setItemCount: setItemCount,
      },
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
          } to view applications.`}
        />
      ) : !Array.isArray(responseEnvironments) ? (
        <SidebarListLoader />
      ) : responseEnvironments?.length === 0 ? (
        <SidebarInfo text={`Create a Application.`} />
      ) : (
        <Fragment>
          {responseEnvironments?.map((environment: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="robot"
                name={environment?.name}
                description={
                  <div className="flex gap-2">
                    <div className="flex gap-1.5">
                      <span className="font-medium">Virtual:</span>
                      <StateCell
                        state={
                          Array.isArray(environment?.robotClusters) &&
                          environment?.robotClusters?.[0]?.robotStatus ===
                            "EnvironmentReady"
                            ? "Ready"
                            : environment?.robotClusters?.[0]?.robotStatus
                        }
                      />
                    </div>
                    {Array.isArray(environment?.robotClusters) &&
                      environment?.robotClusters.length > 1 && (
                        <div className="flex gap-1.5">
                          <span className="font-medium">Physical:</span>
                          <StateCell
                            state={
                              Array.isArray(environment?.robotClusters) &&
                              environment?.robotClusters[1]?.robotStatus ===
                                "EnvironmentReady"
                                ? "Ready"
                                : environment?.robotClusters[1]?.robotStatus
                            }
                          />
                        </div>
                      )}
                  </div>
                }
                url={`/${environment?.robotName}`}
                data={environment}
                notSelectable
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
