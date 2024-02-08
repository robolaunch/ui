import FleetsListItemDesc from "../FleetsListItemDesc/FleetsListItemDesc";
import SidebarListLoader from "../SidebarListLoader/SidebarListLoader";
import { Fragment, ReactElement, useEffect, useState } from "react";
import { IFleet } from "../../interfaces/global/fleet.interface";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import useFunctions from "../../hooks/useFunctions";
import { useAppDispatch } from "../../hooks/redux";
import SidebarListItem from "./SidebarListItem";
import useMain from "../../hooks/useMain";

interface IFleetsList {
  reload: boolean;
}

export default function FleetsList({ reload }: IFleetsList): ReactElement {
  const [fleets, setFleets] = useState<IFleet[] | null>(null);
  const { selectedState, applicationMode } = useMain();
  const dispatch = useAppDispatch();
  const { getFleetsFC } = useFunctions();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance
      ) {
        setFleets(null);
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

  async function handleGetFleets() {
    setFleets(await getFleetsFC(false, false));
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
          {!Array.isArray(fleets) ? (
            <SidebarListLoader />
          ) : fleets.length === 0 ? (
            <SidebarInfo text={`Create a Fleet.`} />
          ) : (
            fleets.map((fleet, index: number) => {
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
