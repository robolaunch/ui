import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getInstances } from "../../resources/InstanceSlice";
import StateCell from "../Cells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import SidebarInstancesTabs from "../SidebarInstancesTabs/SidebarInstancesTabs";

interface ICloudInstancesList {
  reload: boolean;
  setItemCount: any;
}

export default function CloudInstancesList({
  reload,
  setItemCount,
}: ICloudInstancesList): ReactElement {
  const [responseCloudInstances, setResponseCloudInstances] = useState<
    any[] | undefined
  >(undefined);

  const { sidebarState, selectedState } = useSidebar();
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (selectedState?.organization && selectedState?.roboticsCloud) {
        setResponseCloudInstances(undefined);
        dispatch(
          getInstances({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
          })
        ).then((response: any) => {
          setResponseCloudInstances(
            response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances || []
          );
          setItemCount(
            response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
              ?.length || 0
          );
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      dispatch,
      reload,
      selectedState.organization,
      selectedState?.roboticsCloud,
      sidebarState?.instanceTab,
    ]
  );

  return (
    <Fragment>
      <SidebarInstancesTabs />
      {!selectedState?.organization || !selectedState?.roboticsCloud ? (
        <SidebarInfo
          text={`Select an ${
            !selectedState?.organization ? "Organization" : "Robotics Cloud"
          } to view instances.`}
        />
      ) : !Array.isArray(responseCloudInstances) ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : responseCloudInstances.length === 0 ? (
        <SidebarInfo text={`No instances.`} />
      ) : (
        <Fragment>
          {responseCloudInstances?.map((instance: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="instance"
                name={instance?.name}
                description={
                  <div className="flex gap-4">
                    <StateCell state={instance?.instanceState} />
                    <StateCell
                      state={instance?.instanceCloudState}
                      isRobolaunchState
                    />
                  </div>
                }
                url={`${
                  selectedState?.organization?.organizationName?.split("_")[1]
                }/${selectedState?.roboticsCloud?.name}/${instance?.name}`}
                data={instance}
                selected={instance?.name === selectedState?.instance?.name}
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
