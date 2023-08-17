import React from "react";

interface IStateCell {
  state: string | undefined;
  isRobolaunchState?: boolean;
}

export default function StateCell({ state, isRobolaunchState }: IStateCell) {
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
          className={`w-2.5 h-2.5 rounded-full 
        ${states?.[`${state}`]?.color || "bg-red-500"}`}
        />
        <span className="text-xs capitalize">
          {states?.[`${state}`]?.text} {states?.[`${state}`]?.state}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1">
      {state === "running" ||
      state === "Ready" ||
      state === "Connected" ||
      state === "Completed" ||
      state === "Running" ||
      state === "Active" ||
      state === "EnvironmentReady" ? (
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
      ) : state === "stopping" ||
        state === "pending" ||
        state === "Pending" ||
        state === "creating" ||
        state === "Creating" ||
        state === "Waiting" ||
        state === "CreatingNamespace" ||
        state === "CheckingRemoteNamespace" ||
        state === "CreatingDiscoveryServer" ||
        state === "LookingForDeployer" ||
        state === "Waiting Connection" ||
        state === "Registered" ||
        state === "Connecting" ||
        state === "Pending" ||
        state === "CreatingBridge" ||
        state === "WaitingForMulticast" ||
        state === "WaitingForCredentials" ||
        state === "ConfiguringEnvironment" ||
        state === "CreatingDevelopmentSuite" ||
        state === "ConfiguringWorkspaces" ||
        state === "BuildingRobot" ? (
        <img
          className="w-2.5 h-2.5 scale-[3.4]"
          alt="loading"
          src="/svg/general/loading-yellow.svg"
        />
      ) : (
        <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
      )}
      <span className="text-xs capitalize">{state}</span>
    </div>
  );
}
