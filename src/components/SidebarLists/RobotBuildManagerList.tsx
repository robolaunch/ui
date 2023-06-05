import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getRobotBuildManagers } from "../../resources/RobotSlice";
import { useParams } from "react-router-dom";
import SidebarBuildManagerListItem from "../SidebarBuildManagerListItem/SidebarBuildManagerListItem";

interface IRobotBuildManagerList {
  setItemCount: any;
  reload: boolean;
}

export default function RobotBuildManagerList({
  reload,
  setItemCount,
}: IRobotBuildManagerList): ReactElement {
  const [responseBuildManagers, setResponseBuildManagers] = useState<
    any[] | undefined
  >(undefined);
  const { selectedState } = useSidebar();
  const dispatch = useAppDispatch();
  const url = useParams();

  useEffect(() => {
    setResponseBuildManagers(undefined);
    dispatch(
      getRobotBuildManagers({
        organizationId: selectedState?.organization?.organizationId,
        roboticsCloudName: selectedState?.roboticsCloud?.name,
        instanceId: selectedState?.instance?.instanceId,
        region: selectedState?.instance?.region,
        fleetName: selectedState?.fleet?.name,
        robotName: url?.robotName,
      })
    ).then((responseRobotBuildManagers: any) => {
      if (
        Array.isArray(responseRobotBuildManagers?.payload?.data) &&
        Array.isArray(
          responseRobotBuildManagers?.payload?.data[0]?.roboticsClouds
        ) &&
        Array.isArray(
          responseRobotBuildManagers?.payload?.data[0]?.roboticsClouds[0]
            .cloudInstances
        ) &&
        Array.isArray(
          responseRobotBuildManagers?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances[0]?.robolaunchFederatedRobots
        ) &&
        responseRobotBuildManagers?.payload?.data[0]?.roboticsClouds[0]
          ?.cloudInstances[0]?.robolaunchFederatedRobots
      ) {
        setResponseBuildManagers(
          responseRobotBuildManagers?.payload?.data[0]?.roboticsClouds[0]
            ?.cloudInstances[0]?.robolaunchFederatedRobots || []
        );
      }
    });
  }, [dispatch, setItemCount, reload, selectedState, url]);

  return (
    <Fragment>
      {!responseBuildManagers?.length ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <Fragment>
          {responseBuildManagers.map(
            (buildsmanager: any, buildManagerIndex: number) => {
              return (
                <SidebarBuildManagerListItem
                  buildManagerIndex={buildManagerIndex}
                  buildManagerItem={buildsmanager}
                />
              );
            }
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
