import React, { Fragment, ReactElement, useEffect, useState } from "react";
import FleetsListItemDesc from "../FleetsListItemDesc/FleetsListItemDesc";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { envOnPremiseRobot } from "../../helpers/envProvider";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

interface IFleetsList {
  reload: boolean;
  setItemCount: any;
}

export default function FleetsList({
  reload,
  setItemCount,
}: IFleetsList): ReactElement {
  const [responseFleets, setResponseFleets] = useState<any>(undefined);
  const { selectedState } = useMain();
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
    ],
  );

  function handleGetFleets() {
    getFleets(
      {
        organizationId: selectedState?.organization?.organizationId as string,
        roboticsCloudName: selectedState?.roboticsCloud?.name as string,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
      },
      {
        ifErrorNavigateTo404: false,
        setResponse: setResponseFleets,
        setItemCount: setItemCount,
      },
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
          } to view ${envOnPremiseRobot ? "namespaces" : "fleets"}.`}
        />
      ) : (
        <Fragment>
          {!Array.isArray(responseFleets) ? (
            <SidebarListLoader />
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
                      <FleetsListItemDesc
                        fleet={fleet}
                        responseFleets={responseFleets}
                      />
                    }
                    url={`${selectedState?.organization?.organizationName?.split(
                      "_",
                    )[1]}/${selectedState?.roboticsCloud?.name}/${selectedState
                      ?.instance?.name}/${fleet?.name}`}
                    data={{
                      ...fleet,
                      physicalInstance: responseFleets?.filter(
                        (pFleet: any) =>
                          fleet?.name === pFleet?.fleetName &&
                          pFleet?.fleetStatus !== "Ready",
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
