import React, { ReactElement } from "react";
import TimeCounter from "../TimeCounter/TimeCounter";

export default function TrialTimer(): ReactElement {
  return (
    <div className="h-full flex items-center justify-center">
      <TimeCounter hour={0} minute={0} second={0} />
    </div>
  );
}
