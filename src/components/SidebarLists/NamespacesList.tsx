import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import StateCell from "../TableInformationCells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

interface INamespacesList {
  reload: boolean;
  setItemCount: any;
}

export default function NamespacesList({
  reload,
  setItemCount,
}: INamespacesList): ReactElement {
  const [responseNamespaces, setResponseNamespaces] = useState<any>(undefined);
  const { selectedState } = useMain();
  const dispatch = useAppDispatch();
  const { getNamespaces } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance
      ) {
        setResponseNamespaces(undefined);
        handleGetNamespaces();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          selectedState?.instance &&
          handleGetNamespaces();
      }, 10000);

      return () => {
        clearInterval(timer);
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      dispatch,
      reload,
      selectedState?.instance,
      selectedState?.organization,
      selectedState?.roboticsCloud,
    ]
  );

  function handleGetNamespaces() {
    getNamespaces(
      {
        organizationId: selectedState?.organization?.organizationId as string,
        roboticsCloudName: selectedState?.roboticsCloud?.name as string,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseNamespaces,
        setItemCount: setItemCount,
      }
    );
  }

  return (
    <Fragment>
      {!selectedState?.organization ||
      !selectedState?.roboticsCloud ||
      !selectedState?.instance ? (
        <SidebarInfo
          text={`Select an ${
            !selectedState?.organization
              ? "Organization"
              : !selectedState?.roboticsCloud
              ? "Robotics Cloud"
              : "Instance"
          } to view namespaces.`}
        />
      ) : (
        <Fragment>
          {!Array.isArray(responseNamespaces) ? (
            <SidebarListLoader />
          ) : responseNamespaces.length === 0 ? (
            <SidebarInfo text={`Create a Fleet.`} />
          ) : (
            responseNamespaces
              ?.filter((fleet: any) => !fleet.fleetName)
              .map((fleet: any, index: number) => {
                return (
                  <SidebarListItem
                    key={index}
                    type="fleet"
                    name={fleet?.name}
                    description={
                      <div className="flex gap-2">
                        <div className="flex gap-1.5">
                          <span className="font-medium">VI:</span>
                          <StateCell state={fleet?.namespaceStatus} />
                        </div>
                        {responseNamespaces?.filter(
                          (pFleet: any) => fleet?.name === pFleet?.fleetName
                        ).length > 0 && (
                          <div className="flex gap-1.5">
                            <span className="font-medium">PI:</span>
                            <StateCell
                              state={
                                responseNamespaces?.filter(
                                  (pFleet: any) =>
                                    fleet?.name === pFleet?.fleetName
                                )[0]?.fleetStatus
                              }
                            />
                          </div>
                        )}
                      </div>
                    }
                    url={`${
                      selectedState?.organization?.organizationName?.split(
                        "_"
                      )[1]
                    }/${selectedState?.roboticsCloud?.name}/${
                      selectedState?.instance?.name
                    }/${fleet?.name}`}
                    data={{
                      ...fleet,
                      physicalInstance: responseNamespaces?.filter(
                        (pFleet: any) =>
                          fleet?.name === pFleet?.fleetName &&
                          pFleet?.fleetStatus !== "Ready"
                      ),
                    }}
                    selected={fleet.name === selectedState?.fleet?.name}
                  />
                );
              })
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
