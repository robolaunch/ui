import React from "react";

interface IStateCell {
  state: string | number;
}

export default function StateCell({ state }: IStateCell) {
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
