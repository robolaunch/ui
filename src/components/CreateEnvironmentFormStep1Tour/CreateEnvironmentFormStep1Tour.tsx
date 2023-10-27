import { ReactElement } from "react";
import { getGuideItem } from "../../functions/handleGuide";
import TourGuide from "../TourGuide/TourGuide";

export default function CreateEnvironmentFormStep1Tour(): ReactElement {
  return (
    <TourGuide
      hiddenButton
      type="createRobotStep1"
      tourConfig={[
        getGuideItem("[data-tut='create-application-step1-name']"),
        getGuideItem(
          "[data-tut='create-application-step1-environment-selector']",
        ),
        getGuideItem("[data-tut='create-robot-step1-storage']"),
        getGuideItem("[data-tut='create-environment-vdi-session-count']"),
        getGuideItem("[data-tut='create-environment-gpu-resource']"),
      ]}
    />
  );
}
