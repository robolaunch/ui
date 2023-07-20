import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateProvider from "../providers/PrivateProvider";
import TrialPage from "../pages/TrialPage/TrialPage";
import Page404 from "../pages/Page404/Page404";
import MarketplacePage from "../pages/Marketplace/MarketplacePage/MarketplacePage";
import PageFinishTrial from "../pages/PageFinishTrial/PageFinishTrial";
import TrialLayout from "../layouts/TrialLayout";
import RobotPage from "../pages/RobotPage/RobotPage";

export default function TrialRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<PrivateProvider />}>
        <Route element={<TrialLayout />}>
          <Route path={`/`} element={<TrialPage />} />
          <Route path={`/trial-expired`} element={<PageFinishTrial />} />
          <Route
            path={`/:organizationName/:roboticsCloudName/:instanceName/:fleetName/:robotName`}
            element={<RobotPage />}
          />
          <Route path={`/marketplace`} element={<MarketplacePage />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to={`/`} />} />
        </Route>
      </Route>
    </Routes>
  );
}
