import React, { ReactElement } from "react";
import TrialCardLayout from "../../layouts/TrialCardLayout";
import TimeCounter from "../TimeCounter/TimeCounter";
import useTrial from "../../hooks/useTrial";

interface ITrialTimer {
  layoutClassName?: string;
}

export default function TrialTimer({
  layoutClassName,
}: ITrialTimer): ReactElement {
  const { time } = useTrial();

  return (
    <TrialCardLayout title="Trial Timer" className={layoutClassName}>
      <div className="h-full flex items-center justify-center">
        <TimeCounter
          hour={time.viewer.h || 0}
          minute={time.viewer.m || 0}
          second={time.viewer.s || 0}
        />
      </div>
    </TrialCardLayout>
  );
}
