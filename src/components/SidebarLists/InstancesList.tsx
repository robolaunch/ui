import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { SidebarListItem } from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getInstances } from "../../resources/InstanceSlice";

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
  const { selectedState }: any = useSidebar();

  const dispatch = useAppDispatch();

  useEffect(() => {
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
      });
      setItemCount(
        selectedState?.organization && selectedState?.roboticsCloud
          ? responseInstances?.length
          : 0
      );
    }
    setItemCount(selectedState.organization ? responseInstances?.length : 0);
  }, [
    dispatch,
    reload,
    responseInstances?.length,
    selectedState.organization,
    selectedState?.roboticsCloud,
    setItemCount,
  ]);

  return (
    <Fragment>
      {!selectedState?.organization || !selectedState?.roboticsCloud ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="text-lg font-bold text-layer-dark-100">
            Please select an{" "}
            {selectedState?.organization ? "robotics cloud" : "organization"}{" "}
            first.
          </div>
        </div>
      ) : (
        <Fragment>
          {!Array.isArray(responseInstances) ? (
            <img
              className="w-12 mx-auto pt-10"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          ) : (
            responseInstances?.map((rc: any, index: number) => {
              return (
                <SidebarListItem
                  key={index}
                  type="instance"
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
