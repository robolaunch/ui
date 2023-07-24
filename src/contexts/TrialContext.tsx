import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleTimeConverter } from "../helpers/GeneralFunctions";
import { useAppDispatch } from "../hooks/redux";
import { createTrial, getIP } from "../resources/TrialSlice";
import { getOrganizations } from "../resources/OrganizationSlice";
import { getRoboticsClouds } from "../resources/RoboticsCloudSlice";
import { getInstances } from "../resources/InstanceSlice";
import { getFederatedFleets } from "../resources/FleetSlice";
import { ITrialState } from "../interfaces/useTrialInterfaces";

export const TrialContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [trialState, setTrialState] = useState<ITrialState>({
    ip: null,
    time: {
      remainingTime: null,
      viewer: {
        h: 0,
        m: 0,
        s: 0,
      },
    },
    organization: null,
    roboticsCloud: null,
    instance: null,
    fleet: null,
  });

  // all get requests
  useEffect(() => {
    if (!trialState?.ip) {
      handleGetIp();
    } else if (!trialState?.organization) {
      handleGetTrialOrganization();
    } else if (!trialState?.roboticsCloud) {
      handleGetTrialRoboticsCloud();
    } else if (!trialState?.instance) {
      handleGetTrialInstance();
    } else if (!trialState?.fleet) {
      handleGetTrialFleet();
    }

    const timerOrganization = setInterval(() => {
      !trialState?.organization && handleGetTrialOrganization();
    }, 15000);

    const timerRoboticsCloud = setInterval(() => {
      !trialState.organization &&
        !trialState.roboticsCloud &&
        handleGetTrialRoboticsCloud();
    }, 15000);

    const timerInstance = setInterval(() => {
      !trialState.organization &&
        !trialState.roboticsCloud &&
        !trialState.instance &&
        trialState?.instance?.instanceCloudState !== "ConnectionHub_Ready" &&
        handleGetTrialInstance();
    }, 15000);

    const timerFleet = setInterval(() => {
      !trialState.organization &&
        !trialState.roboticsCloud &&
        !trialState.instance &&
        !trialState.fleet &&
        trialState?.fleet?.fleetStatus !== "Ready" &&
        handleGetTrialFleet();
    }, 15000);

    return () => {
      clearInterval(timerOrganization);
      clearInterval(timerRoboticsCloud);
      clearInterval(timerInstance);
      clearInterval(timerFleet);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    trialState?.organization,
    trialState?.roboticsCloud,
    trialState?.instance,
    trialState?.fleet,
    trialState?.ip,
  ]);
  // all get requests

  useEffect(() => {
    const timer = setInterval(() => {
      trialState?.time?.remainingTime &&
        setTrialState((prevState: any) => ({
          ...prevState,
          time: {
            ...prevState?.time,
            remainingTime: prevState?.time?.remainingTime - 1,
            viewer: handleTimeConverter(prevState?.time?.remainingTime),
          },
        }));
    }, 1000);

    if (
      trialState?.time?.remainingTime !== null &&
      trialState?.time?.remainingTime <= 0
    ) {
      clearInterval(timer);
      navigate("/trial-expired");
    }

    return () => {
      clearInterval(timer);
    };
  }, [navigate, trialState?.time]);

  async function handleGetIp() {
    dispatch(getIP()).then((res: any) => {
      setTrialState((prevState: any) => ({
        ...prevState,
        ip: res?.payload?.ip || null,
      }));
    });
  }

  async function handleGetTrialOrganization() {
    dispatch(getOrganizations()).then((res: any) => {
      if (res?.payload?.data?.length === 0) {
        dispatch(
          createTrial({
            ipAddress: trialState?.ip as string,
          })
        );
      } else {
        setTrialState((prevState: any) => ({
          ...prevState,
          organization: res?.payload?.data?.[0] || null,
        }));
      }
    });
  }

  async function handleGetTrialRoboticsCloud() {
    dispatch(
      getRoboticsClouds({
        organizationId: trialState?.organization?.organizationId,
      })
    ).then((res: any) => {
      setTrialState((prevState: any) => ({
        ...prevState,
        roboticsCloud: res?.payload?.data?.[0]?.roboticsClouds?.[0] || null,
      }));
    });
  }

  async function handleGetTrialInstance() {
    dispatch(
      getInstances({
        organizationId: trialState?.organization?.organizationId,
        roboticsCloudName: trialState?.roboticsCloud?.name,
        region: trialState?.roboticsCloud?.region,
        details: true,
      })
    ).then((res: any) => {
      setTrialState((prevState: any) => ({
        ...prevState,
        instance:
          res?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0] ||
          null,
        time: {
          ...prevState?.time,
          remainingTime:
            res?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
              ?.demoRemainingTime || null,
        },
      }));
    });
  }

  async function handleGetTrialFleet() {
    dispatch(
      getFederatedFleets({
        organizationId: trialState?.organization?.organizationId,
        roboticsCloudName: trialState?.roboticsCloud?.name,
        region: trialState?.roboticsCloud?.region,
        instanceId: trialState?.instance?.instanceId,
      })
    ).then((res: any) => {
      setTrialState((prevState: any) => ({
        ...prevState,
        fleet:
          res?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
            ?.robolaunchFederatedFleets?.[0] || null,
      }));
    });
  }

  return (
    <TrialContext.Provider value={{ trialState, setTrialState }}>
      {children}
    </TrialContext.Provider>
  );
};
