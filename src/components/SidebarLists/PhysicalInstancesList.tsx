import React, { Fragment, ReactElement, useEffect, useState } from "react";
import SidebarListItem from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getPhysicalInstances } from "../../resources/InstanceSlice";
import StateCell from "../Cells/StateCell";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import SidebarInstancesTabs from "../SidebarInstancesTabs/SidebarInstancesTabs";
import organizationNameViewer from "../../helpers/organizationNameViewer";

interface IPhysicalInstancesList {
  reload: boolean;
  setItemCount: any;
}

export default function PhysicalInstancesList({
  reload,
  setItemCount,
}: IPhysicalInstancesList): ReactElement {
  const [responsePhysicalInstances, setResponsePhysicalInstances] = useState<
    any[] | undefined
  >(undefined);

  const { sidebarState, selectedState } = useSidebar();
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance
      ) {
        setResponsePhysicalInstances(undefined);
        dispatch(
          getPhysicalInstances({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.instance?.region,
          })
        ).then((response: any) => {
          if (
            Array.isArray(response?.payload?.data) &&
            Array.isArray(response?.payload?.data[0]?.roboticsClouds) &&
            Array.isArray(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
            ) &&
            response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
              ?.robolaunchPhysicalInstances
          ) {
            setResponsePhysicalInstances(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
                ?.robolaunchPhysicalInstances || []
            );
            setItemCount(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
                ?.robolaunchPhysicalInstances?.length || 0
            );
          }
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
          } to view instances.`}
        />
      ) : !Array.isArray(responsePhysicalInstances) ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : responsePhysicalInstances.length === 0 ? (
        <SidebarInfo text={`No instances.`} />
      ) : (
        <Fragment>
          {responsePhysicalInstances?.map((instance: any, index: number) => {
            return (
              <SidebarListItem
                key={index}
                type="instance"
                name={instance?.name}
                description={
                  <div className="flex gap-4">
                    <span>({selectedState?.instance?.name})</span>
                    <StateCell state={instance?.phase} />
                  </div>
                }
                url={`/${organizationNameViewer({
                  organizationName:
                    selectedState?.organization?.organizationName,
                  capitalization: false,
                })}/${selectedState?.roboticsCloud?.name}/${
                  instance?.name
                }/physical-instances`}
                data={instance}
                notSelectable
              />
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
}
