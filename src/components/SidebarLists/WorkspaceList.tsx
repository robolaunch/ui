import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import useMain from "../../hooks/useMain";
import { getRobot } from "../../toolkit/RobotSlice";
import SidebarInfo from "../SidebarInfo/SidebarInfo";
import { useParams } from "react-router-dom";
import useRobot from "../../hooks/useRobot";
import CreateRobotFormStep2 from "../CreateForms/CreateRobotFormStep2";

interface IWorkspaceList {
  reload: boolean;
  setItemCount: any;
}

export default function WorkspaceList({
  reload,
  setItemCount,
}: IWorkspaceList): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const { selectedState } = useMain();
  const dispatch = useAppDispatch();
  const url = useParams();
  const { setRobotData } = useRobot();

  useEffect(
    () => {
      if (
        selectedState?.organization &&
        selectedState?.roboticsCloud &&
        selectedState?.instance &&
        selectedState?.fleet
      ) {
        setResponseRobot(undefined);
        dispatch(
          getRobot({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.instance?.region,
            fleetName: selectedState?.fleet?.name,
            robotName: url?.robotName as string,
          })
        ).then((response: any) => {
          if (
            Array.isArray(response?.payload?.data) &&
            Array.isArray(response?.payload?.data[0]?.roboticsClouds) &&
            Array.isArray(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances
            ) &&
            response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
              ?.robolaunchFederatedRobots
          ) {
            console.log(response);
            setResponseRobot(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
                ?.robolaunchFederatedRobots || []
            );

            setRobotData((prevState: any) => {
              return {
                ...prevState,
                step2: {
                  workspaces:
                    response?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.robotWorkspaces,
                },
              };
            });

            setItemCount(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
                ?.robolaunchFederatedRobots?.length || 0
            );
          }
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
      selectedState?.fleet,
    ]
  );

  return (
    <Fragment>
      {!selectedState?.organization ||
      !selectedState?.roboticsCloud ||
      !selectedState?.instance ||
      !selectedState?.fleet ? (
        <SidebarInfo
          text={`Select an ${
            !selectedState?.organization
              ? "Organization"
              : !selectedState?.roboticsCloud
              ? "Robotics Cloud"
              : !selectedState?.instance
              ? "Instance"
              : "Fleet"
          } to view robots.`}
        />
      ) : !Array.isArray(responseRobot) ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <Fragment>
          <CreateRobotFormStep2 isImportRobot />
        </Fragment>
      )}
    </Fragment>
  );
}
