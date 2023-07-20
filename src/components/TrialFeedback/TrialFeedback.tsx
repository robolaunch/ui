import React, { ReactElement } from "react";
import TrialCardLayout from "../../layouts/TrialCardLayout";

interface ITrialFeedback {
  layoutClassName?: string;
}

export default function TrialFeedback({
  layoutClassName,
}: ITrialFeedback): ReactElement {
  return (
    <TrialCardLayout className={layoutClassName} title="Contact & Feedback">
      <div className="h-full flex flex-col items-center justify-center gap-4"></div>
    </TrialCardLayout>
  );
}
