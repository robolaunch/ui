import React from "react";

interface IStateCell {
  state: string;
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
      text: "Instance Readiness In Progress",
      state: "(1/5)",
    },
    Instance_Ready: {
      color: "bg-yellow-500",
      text: "Instance Ready",
      state: "(2/5)",
    },
    Cloud_Ready: {
      color: "bg-yellow-500",
      text: "Cloud Ready",
      state: "(3/5)",
    },
    Robot_Operator_Ready: {
      color: "bg-yellow-500",
      text: "Robot Operator Ready",
      state: "(4/5)",
    },
    ConnectionHub_Ready: {
      color: "bg-green-500",
      text: "Connection Hub Ready",
      state: "(5/5)",
    },
  };

  if (isRobolaunchState) {
    return (
      <div className="flex items-center gap-2">
        <div
          className={`w-2.5 h-2.5 rounded-full 
        ${states?.[`${state}`]?.color || "bg-red-500"}`}
        />
        <span className="text-xs capitalize">
          {state?.replace("_", " ")} {states?.[`${state}`]?.state}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {state === "running" ? (
        <div className="w-2.5 h-2.5 bg-green-500 rounded-full" />
      ) : state === "stopping" || state === "pending" ? (
        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
      ) : (
        <div className="w-2.5 h-2.5 bg-red-500 rounded-full" />
      )}
      <span className="text-xs capitalize">{state}</span>
    </div>
  );
}
