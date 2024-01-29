import FleetsListItemDesc from "../FleetsListItemDesc/FleetsListItemDesc";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";
import { IFleet } from "../../interfaces/fleet.interface";

interface IFleetsList {
  reload: boolean;
  setItemCount: any;
}

export default function FleetsList({
  reload,
  setItemCount,
}: IFleetsList): ReactElement {
  const [responseFleets, setResponseFleets] = useState<IFleet[] | undefined>(
    undefined,
  );
  const { selectedState, applicationMode } = useMain();
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
        organizationId: selectedState?.organization?.name!,
        roboticsCloudName: selectedState?.roboticsCloud?.name!,
        instanceId: selectedState?.instance?.id!,
        region: selectedState?.roboticsCloud?.name!,
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
          } to view ${applicationMode ? "namespaces" : "fleets"}.`}
        />
      ) : (
        <Fragment>
          {!Array.isArray(responseFleets) ? (
            <SidebarListLoader />
          ) : responseFleets.length === 0 ? (
            <SidebarInfo text={`Create a Fleet.`} />
          ) : (
            responseFleets.map((fleet, index: number) => {
              return (
                <SidebarListItem
                  key={index}
                  type="fleet"
                  name={fleet?.name}
                  description={<FleetsListItemDesc fleet={fleet} />}
                  url={`${
                    selectedState?.organization?.name?.split("_")[1]
                  }/${selectedState?.roboticsCloud?.name}/${
                    selectedState?.instance?.name
                  }/${fleet?.name}`}
                  data={fleet}
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
