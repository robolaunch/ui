import {
  createFederatedFleet,
  getFederatedFleets,
} from "../toolkit/FleetSlice";
import { getRoboticsClouds } from "../toolkit/RoboticsCloudSlice";
import { handleTimeConverter } from "../functions/GeneralFunctions";
import React, { createContext, useEffect, useState } from "react";
import { getOrganizations } from "../toolkit/OrganizationSlice";
import { ITrialState } from "../interfaces/useTrialInterfaces";
import { getIP } from "../toolkit/TrialSlice";
import { getInstances } from "../toolkit/InstanceSlice";
import { useAppDispatch } from "../hooks/redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { envTrialApp } from "../helpers/envProvider";

export const TrialContext: any = createContext<any>(null);

// eslint-disable-next-line
export default ({ children }: any) => {
  const url = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [reload, setReload] = useState<boolean>(false);
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
    if (
      envTrialApp &&
      (location?.pathname === "/marketplace" || url?.productName)
    ) {
      if (!trialState?.ip) {
        handleGetIp();
      } else if (!trialState?.organization) {
        handleGetTrialOrganization();
      } else if (!trialState?.roboticsCloud) {
        handleGetTrialRoboticsCloud();
      } else if (!trialState?.instance) {
        handleGetTrialInstance();
      } else if (
        trialState?.instance?.instanceCloudState === "ConnectionHub_Ready" &&
        !trialState?.fleet
      ) {
        handleGetTrialFleet();
      }
    }

    const timerOrganization = setInterval(() => {
      !trialState?.organization && handleGetTrialOrganization();
    }, 10000);

    const timerRoboticsCloud = setInterval(() => {
      trialState?.organization &&
        !trialState?.roboticsCloud &&
        handleGetTrialRoboticsCloud();
    }, 10000);

    const timerInstance = setInterval(() => {
      trialState?.organization &&
        trialState?.roboticsCloud &&
        trialState?.instance?.instanceCloudState !== "ConnectionHub_Ready" &&
        handleGetTrialInstance();
    }, 10000);

    return () => {
      clearInterval(timerOrganization);
      clearInterval(timerRoboticsCloud);
      clearInterval(timerInstance);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    trialState?.organization,
    trialState?.roboticsCloud,
    trialState?.instance,
    trialState?.fleet,
    trialState?.ip,
    reload,
    location,
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
    await dispatch(getIP()).then((res: any) => {
      setTrialState((prevState: any) => ({
        ...prevState,
        ip: res?.payload?.ip || null,
      }));
    });
  }

  async function handleGetTrialOrganization() {
    await dispatch(getOrganizations()).then(async (res: any) => {
      setTrialState((prevState: any) => ({
        ...prevState,
        organization: res?.payload?.data?.[0] || null,
      }));
    });
  }

  async function handleGetTrialRoboticsCloud() {
    await dispatch(
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
    await dispatch(
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
    await dispatch(
      getFederatedFleets({
        organizationId: trialState?.organization?.organizationId,
        roboticsCloudName: trialState?.roboticsCloud?.name,
        region: trialState?.roboticsCloud?.region,
        instanceId: trialState?.instance?.instanceId,
      })
    ).then((res: any) => {
      if (
        res?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
          ?.robolaunchFederatedFleets?.length === 0
      ) {
        // handleCreateTrialFleet();
      } else {
        setTrialState((prevState: any) => ({
          ...prevState,
          fleet:
            res?.payload?.data?.[0]?.roboticsClouds?.[0]?.cloudInstances?.[0]
              ?.robolaunchFederatedFleets?.[0] || null,
        }));
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleCreateTrialFleet() {
    await dispatch(
      createFederatedFleet({
        organizationId: trialState?.organization?.organizationId,
        roboticsCloudName: trialState?.roboticsCloud?.name,
        instanceId: trialState?.instance?.instanceId,
        region: trialState?.roboticsCloud?.region,
        robolaunchFederatedFleetsName: "trial-fleet",
      })
    ).then(() => {
      console.log("fleet created");
      setTimeout(() => {
        setReload(!reload);
        console.log("fleet created and reloaded");
      }, 10000);
    });
  }

  function handleReload() {
    setReload(!reload);
  }

  useEffect(() => {
    console.log(trialState?.instance);
  }, [trialState?.instance]);

  return (
    <TrialContext.Provider value={{ trialState, setTrialState, handleReload }}>
      {children}
    </TrialContext.Provider>
  );
};
