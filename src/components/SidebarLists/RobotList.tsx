import React, { Fragment, ReactElement, useEffect, useState } from "react";
import { useAppDispatch } from "../../hooks/redux";
import useSidebar from "../../hooks/useSidebar";
import { getFederatedRobot } from "../../resources/RobotSlice";
import { useParams } from "react-router-dom";
import CreateRobotFormStep1 from "../CreateForms/CreateRobotFormStep1";
import useCreateRobot from "../../hooks/useCreateRobot";

interface IRobotList {
  reload: boolean;
  setItemCount: any;
}

export default function RobotList({
  reload,
  setItemCount,
}: IRobotList): ReactElement {
  const [responseRobot, setResponseRobot] = useState<any>(undefined);
  const { selectedState } = useSidebar();
  const dispatch = useAppDispatch();
  const url = useParams();
  const { setRobotData } = useCreateRobot();

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
          getFederatedRobot({
            organizationId: selectedState?.organization?.organizationId,
            roboticsCloudName: selectedState?.roboticsCloud?.name,
            instanceId: selectedState?.instance?.instanceId,
            region: selectedState?.instance?.region,
            fleetName: selectedState?.fleet?.name,
            robotName: url?.robotName,
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
            setResponseRobot(
              response?.payload?.data[0]?.roboticsClouds[0]?.cloudInstances[0]
                ?.robolaunchFederatedRobots || []
            );

            setRobotData((prevState: any) => {
              return {
                ...prevState,
                step1: {
                  ...prevState.step1,
                  robotName:
                    response?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]?.name,
                  isVirtualRobot: response?.payload?.data[0]?.roboticsClouds[0]
                    ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                    ?.physicalInstance
                    ? false
                    : true,
                  physicalInstanceName:
                    response?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.physicalInstance,
                  robotStorage:
                    response?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.storageAmount,
                  isEnabledIde:
                    response?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.ideEnabled,
                  isEnabledROS2Bridge:
                    response?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.bridgeEnabled,
                  remoteDesktop: {
                    isEnabled:
                      response?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.vdiEnabled,
                    sessionCount:
                      response?.payload?.data[0]?.roboticsClouds[0]
                        ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                        ?.vdiSessionCount,
                  },
                  rosDistros:
                    response?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.distributions,
                  gpuEnabledForCloudInstance:
                    response?.payload?.data[0]?.roboticsClouds[0]
                      ?.cloudInstances[0]?.robolaunchFederatedRobots[0]
                      ?.vdiGpuResource > 0
                      ? true
                      : false,
                  isDevelopmentMode: false,
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
      {!Array.isArray(responseRobot) ? (
        <img
          className="w-12 mx-auto pt-10"
          src="/svg/general/loading.svg"
          alt="Loading..."
        />
      ) : (
        <Fragment>
          <CreateRobotFormStep1 isImportRobot />
        </Fragment>
      )}
    </Fragment>
  );
}
