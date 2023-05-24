import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getInstances } from "../../resources/InstanceSlice";
import StateCell from "../Cells/StateCell";
import SidebarSelectInfo from "../SidebarSelectInfo/SidebarSelectInfo";

interface IInstancesList {
  reload: boolean;
  setItemCount: any;
}

export default function InstancesList({
  reload,
  setItemCount,
}: IInstancesList): ReactElement {
  const [responseInstances, setResponseInstances] = useState<any[] | undefined>(
    undefined
  );
  const { selectedState } = useSidebar();
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (selectedState?.organization && selectedState?.roboticsCloud) {
        dispatch(
          getInstances({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
          })
        ).then((response: any) => {
          setResponseInstances(
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
    [dispatch, reload, selectedState.organization, selectedState?.roboticsCloud]
  );

  return (
    <Fragment>
      {!selectedState?.organization || !selectedState?.roboticsCloud ? (
        <SidebarSelectInfo
          type={
            selectedState?.organization
              ? selectedState?.roboticsCloud
                ? undefined
                : "Robotics Cloud"
              : "Organization"
          }
        />
      ) : (
        <Fragment>
          {!Array.isArray(responseInstances) ? (
            <img
              className="w-12 mx-auto pt-10"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          ) : (
            responseInstances?.map((instance: any, index: number) => {
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
            })
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
