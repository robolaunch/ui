import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import StateCell from "../Cells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";

interface IFleetsList {
  reload: boolean;
  setItemCount: any;
}

export default function FleetsList({
  reload,
  setItemCount,
}: IFleetsList): ReactElement {
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const { selectedState } = useSidebar();
  const dispatch = useAppDispatch();
  const { getFleets } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance
      ) {
        setResponseFleets(undefined);
        handleGetFleets();
      }

      const timer = setInterval(() => {
        selectedState?.organization &&
          selectedState?.roboticsCloud &&
          selectedState?.instance &&
          handleGetFleets();
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

  function handleGetFleets() {
    getFleets(
      {
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseFleets,
      }
    );
    setItemCount(responseFleets?.length || 0);
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
          } to view fleets.`}
        />
      ) : (
        <Fragment>
          {!Array.isArray(responseFleets) ? (
            <img
              className="w-12 mx-auto pt-10"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          ) : responseFleets.length === 0 ? (
            <SidebarInfo text={`Create a Fleet.`} />
          ) : (
            responseFleets
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
                          <StateCell state={fleet?.fleetStatus} />
                        </div>
                        {responseFleets?.filter(
                          (pFleet: any) => fleet?.name === pFleet?.fleetName
                        ).length > 0 && (
                          <div className="flex gap-1.5">
                            <span className="font-medium">PI:</span>
                            <StateCell
                              state={
                                responseFleets?.filter(
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
                      physicalInstance: responseFleets?.filter(
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
