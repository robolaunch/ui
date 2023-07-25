import React, { ReactElement } from "react";
import TrialCardLayout from "../../layouts/TrialCardLayout";
import Button from "../Button/Button";

interface ITrialFeedback {
  layoutClassName?: string;
}

export default function TrialFeedback({
  layoutClassName,
}: ITrialFeedback): ReactElement {
  return (
    <TrialCardLayout className={layoutClassName} title="Contact & Feedback">
      <div className="h-full flex flex-col items-center justify-around gap-4">
        <div className="flex flex-col gap-6">
          <p className="text-xs">
            If you have any questions or feedback, please contact us at below
            button or email.
          </p>
          <Button
            type="submit"
            className="w-full !h-11 text-xs"
            text={`Send Feedback`}
          />
        </div>
      </div>
    </TrialCardLayout>
  );
}
