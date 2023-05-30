import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { getRoboticsCloudsOfOrganization } from "../../resources/RoboticsCloudSlice";
import organizationNameViewer from "../../helpers/organizationNameViewer";
import SidebarSelectInfo from "../SidebarInfo/SidebarInfo";
import SidebarListItem from "./SidebarListItem";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";

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
      setResponseRoboticsClouds(undefined);
      dispatch(
        getRoboticsCloudsOfOrganization({
          organizationId: selectedState?.organization?.organizationId,
        })
      ).then((response: any) => {
        setResponseRoboticsClouds(
          response?.payload?.data[0]?.roboticsClouds || []
        );
        setItemCount(response?.payload?.data[0]?.roboticsClouds?.length || 0);
      });
    }
  }, [dispatch, reload, selectedState.organization, setItemCount]);

  return (
    <Fragment>
      {!selectedState?.organization ? (
        <SidebarSelectInfo text={`Select an Organization to view instances.`} />
      ) : (
        <Fragment>
          {!Array.isArray(responseRoboticsClouds) ? (
            <img
              className="w-12 mx-auto pt-10"
              src="/svg/general/loading.svg"
              alt="Loading..."
            />
          ) : (
            responseRoboticsClouds?.map((roboticsCloud: any, index: number) => {
              return (
                <SidebarListItem
                  key={index}
                  type="roboticscloud"
                  name={roboticsCloud?.name}
                  description={`Description`}
                  url={`/${organizationNameViewer({
                    organizationName:
                      selectedState?.organization?.organizationName,
                    capitalization: false,
                  })}/${roboticsCloud?.name}`}
                  data={roboticsCloud}
                  selected={
                    roboticsCloud?.name === selectedState?.roboticsCloud?.name
                  }
                />
              );
            })
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
