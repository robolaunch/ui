import { ReactElement } from "react";

interface IStateCell {
  state: string | undefined;
  isRobolaunchState?: boolean;
}

export default function StateCell({
  state,
  isRobolaunchState,
}: IStateCell): ReactElement {
  const states: any = {
    Instance_Created: {
      color: "bg-yellow-500",
      text: "Instance Created",
      state: "(1/5)",
    },
    Instance_Readiness_In_Progress: {
      color: "bg-yellow-500",
      text: "Creating Instance",
      state: "(1/5)",
    },
    Instance_Ready: {
      color: "bg-yellow-500",
      text: "Preparing Cloud",
      state: "(2/5)",
    },
    Cloud_Ready: {
      color: "bg-yellow-500",
      text: "Preparing Robot Operator",
      state: "(3/5)",
    },
    Robot_Operator_Ready: {
      color: "bg-yellow-500",
      text: "Preparing Connection Services",
      state: "(4/5)",
    },
    ConnectionHub_Ready: {
      color: "bg-green-500",
      text: "Ready",
      state: "(5/5)",
    },
    Ready: {
      color: "bg-green-500",
      text: "Ready",
    },
  };

  if (isRobolaunchState) {
    return (
      <div className="flex items-center gap-1">
        <div
          className={`h-2.5 w-2.5 rounded-full 
        ${states?.[`${state}`]?.color || "bg-red-500"}`}
        />
        <span className="text-xs capitalize">
          {states?.[`${state}`]?.text} {states?.[`${state}`]?.state}
        </span>
      </div>
    );
  }

  const successStates = [
    "running",
    "Ready",
    "CONNECTED",
    "Connected",
    "connected",
    "Completed",
    "Running",
    "Active",
    "EnvironmentReady",
  ];

  const loadingStates = [
    "stopping",
    "pending",
    "Pending",
    "creating",
    "Creating",
    "Waiting",
    "CreatingNamespace",
    "CheckingRemoteNamespace",
    "CreatingDiscoveryServer",
    "LookingForDeployer",
    "Waiting Connection",
    "Registered",
    "Connecting",
    "Pending",
    "CreatingBridge",
    "WaitingForMulticast",
    "WaitingForCredentials",
    "ConfiguringEnvironment",
    "CreatingDevelopmentSuite",
    "ConfiguringWorkspaces",
    "In Progress",
    "BuildingRobot",
  ];

  return (
    <div className="flex items-center gap-1">
      {successStates.includes(state || "") ? (
        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
      ) : loadingStates.includes(state || "") ? (
        <img
          className="h-2.5 w-2.5 scale-[3.4]"
          alt="loading"
          src="/svg/general/loading-yellow.svg"
        />
      ) : (
        <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
      )}
      <span className="text-xs capitalize">{state}</span>
    </div>
  );
}
