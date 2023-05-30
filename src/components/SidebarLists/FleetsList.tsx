import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getFederatedFleets } from "../../resources/FleetSlice";
import StateCell from "../Cells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";

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

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance
      ) {
        dispatch(
          getFederatedFleets({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.instance?.region,
          })
        ).then((response: any) => {
          setResponseFleets(
            response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
              ?.robolaunchFederatedFleets || []
          );
          setItemCount(
            response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
              ?.robolaunchFederatedFleets?.length || 0
          );
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
    ]
  );

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
          } to view robots.`}
        />
      ) : (
        <Fragment>
          {!Array.isArray(responseFleets) ? (
            <img
              className="w-12 mx-auto pt-10"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          ) : (
            responseFleets?.map((fleet: any, index: number) => {
              return (
                <SidebarListItem
                  key={index}
                  type="fleet"
                  name={fleet?.name}
                  description={<StateCell state={fleet?.fleetStatus} />}
                  url={`${
                    selectedState?.organization?.organizationName?.split("_")[1]
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
