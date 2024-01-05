import { getGuideItem } from "../../functions/handleGuide";
import { useAppSelector } from "../../hooks/redux";
import TourGuide from "../TourGuide/TourGuide";
import { ReactElement } from "react";

export default function CreateFormStep2Tour(): ReactElement {
  const { applicationMode } = useAppSelector((state) => state.user);

  return (
    <TourGuide
      hiddenButton
      type="createRobotStep2"
      tourConfig={
        applicationMode
          ? [
              getGuideItem("[data-tut='create-robot-step2-workspaces']"),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-add-button']",
              ),
              getGuideItem("[data-tut='create-robot-step2-workspace-name']"),

              getGuideItem(
                "[data-tut='create-robot-step2-workspace-delete-button']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repositories']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-repository-add-button']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repository-name']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repository-url']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repository-branch']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repository-delete-button']",
              ),
            ]
          : [
              getGuideItem("[data-tut='create-robot-step2-workspaces']"),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-add-button']",
              ),
              getGuideItem("[data-tut='create-robot-step2-workspace-name']"),
              getGuideItem("[data-tut='create-robot-step2-workspace-distro']"),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-delete-button']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repositories']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-repository-add-button']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repository-name']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repository-url']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repository-branch']",
              ),
              getGuideItem(
                "[data-tut='create-robot-step2-workspace-repository-delete-button']",
              ),
            ]
      }
    />
  );
}
