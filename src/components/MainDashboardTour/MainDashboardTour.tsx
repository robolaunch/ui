import React, { ReactElement } from "react";
import TourGuide from "../TourGuide/TourGuide";
import { getGuideItem } from "../../functions/handleGuide";

export default function MainDashboardTour(): ReactElement {
  return (
    <TourGuide
      type="main"
      tourConfig={[
        getGuideItem("welcome"),
        getGuideItem('[data-tut="organization-sidebar-menu-item"]'),
        getGuideItem('[data-tut="roboticscloud-sidebar-menu-item"]'),
        getGuideItem('[data-tut="instance-sidebar-menu-item"]'),
        getGuideItem('[data-tut="fleet-sidebar-menu-item"]'),
        getGuideItem('[data-tut="robot-sidebar-menu-item"]'),
        getGuideItem('[data-tut="information-widget"]'),
        getGuideItem('[data-tut="counter-widget"]'),
        getGuideItem('[data-tut="general-table"]'),
      ]}
    />
  );
}
