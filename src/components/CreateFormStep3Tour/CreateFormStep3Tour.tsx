import React, { ReactElement } from "react";
import TourGuide from "../TourGuide/TourGuide";
import { getGuideItem } from "../../functions/handleGuide";

export default function CreateFormStep3Tour(): ReactElement {
  return (
    <TourGuide
      hiddenButton
      type="createRobotStep3"
      tourConfig={[
        getGuideItem("[data-tut='create-robot-step3-name']"),
        getGuideItem("[data-tut='create-robot-step3-steps']"),
        getGuideItem("[data-tut='create-robot-step3-build-add-button']"),
        getGuideItem("[data-tut='create-robot-build-step-name']"),
        getGuideItem("[data-tut='create-robot-build-step-workspace']"),
        getGuideItem("[data-tut='create-robot-build-step-code-type']"),
        getGuideItem("[data-tut='create-robot-build-step-code']"),
        getGuideItem("[data-tut='create-robot-build-step-scope']"),
      ]}
    />
  );
}
