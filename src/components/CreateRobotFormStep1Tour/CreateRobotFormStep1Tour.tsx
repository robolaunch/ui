import { ReactElement } from "react";
import { getGuideItem } from "../../functions/handleGuide";
import TourGuide from "../TourGuide/TourGuide";

export default function CreateRobotFormStep1Tour(): ReactElement {
  return (
    <TourGuide
      hiddenButton
      type="createRobotStep1"
      tourConfig={[
        getGuideItem("[data-tut='create-robot-step1-name']"),
        getGuideItem("[data-tut='create-robot-step1-type']"),
        getGuideItem("[data-tut='create-robot-step1-ros-distrobutions']"),
        getGuideItem("[data-tut='create-robot-step1-storage']"),
        getGuideItem("[data-tut='create-robot-step1-ros2-bridge']"),
        getGuideItem("[data-tut='create-robot-step1-vdi-session-count']"),
        getGuideItem("[data-tut='create-robot-step1-gpu-resource']"),
        getGuideItem("[data-tut='create-robot-step1-development-mode']"),
      ]}
    />
  );
}
