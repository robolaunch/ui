import { ReactElement } from "react";
import { getGuideItem } from "../../functions/handleGuide";
import TourGuide from "../TourGuide/TourGuide";

export default function CreateFormStep4Tour(): ReactElement {
  return (
    <TourGuide
      hiddenButton
      type="createRobotStep4"
      tourConfig={[
        getGuideItem("[data-tut='create-robot-step4-name']"),
        getGuideItem("[data-tut='create-robot-step4-workspace']"),
        getGuideItem("[data-tut='create-robot-step4-code']"),
        getGuideItem("[data-tut='create-robot-build-step-scope']"),
        getGuideItem("[data-tut='create-robot-step4-environments']"),
        getGuideItem("[data-tut='create-robot-step4-environments-add-button']"),
      ]}
    />
  );
}
