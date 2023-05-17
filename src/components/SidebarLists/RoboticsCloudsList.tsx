import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getRoboticsCloudsOfOrganization } from "../../resources/RoboticsCloudSlice";

interface IRoboticsCloudsList {
  reload: boolean;
  setItemCount: any;
}

export default function RoboticsCloudsList({
  reload,
  setItemCount,
}: IRoboticsCloudsList): ReactElement {
  const [responseRoboticsClouds, setResponseRoboticsClouds] = useState<
    any[] | undefined
  >(undefined);
  const { selectedState } = useSidebar();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedState?.organization) {
      dispatch(
        getRoboticsCloudsOfOrganization({
          organizationId: selectedState?.organization?.organizationId,
        })
      ).then((response: any) => {
        console.log("!", response);
        setResponseRoboticsClouds(
          response?.payload?.data[0]?.roboticsClouds || []
        );
      });
    }
    setItemCount(
      selectedState.organization ? responseRoboticsClouds?.length : 0
    );
  }, [
    dispatch,
    reload,
    responseRoboticsClouds?.length,
    selectedState.organization,
    setItemCount,
  ]);

  return (
    <Fragment>
      {!selectedState?.organization ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-lg font-bold text-layer-dark-100">
            Please select an organization first.
          </div>
        </div>
      ) : (
        <Fragment>
          {!Array.isArray(responseRoboticsClouds) ? (
            <img
              className="w-12 mx-auto pt-10"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          ) : (
            responseRoboticsClouds?.map((rc: any, index: number) => {
              return (
                <SidebarListItem
                  key={index}
                  type="roboticscloud"
                  name={rc?.name}
                  description={`Description`}
                  url={`/${rc?.name}`}
                  data={rc}
                  selected={rc?.name === selectedState?.roboticsCloud?.name}
                />
              );
            })
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
