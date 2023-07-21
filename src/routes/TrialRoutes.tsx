import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PrivateProvider from "../providers/PrivateProvider";
import TrialPage from "../pages/TrialPage/TrialPage";
import Page404 from "../pages/Page404/Page404";
import PageFinishTrial from "../pages/PageFinishTrial/PageFinishTrial";
import TrialLayout from "../layouts/TrialLayout";
import RobotPage from "../pages/RobotPage/RobotPage";
import MarketplaceSingleItemPage from "../pages/Marketplace/MarketplaceSingleItemPage/MarketplaceSingleItemPage";

export default function TrialRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<PrivateProvider />}>
        <Route element={<TrialLayout />}>
          <Route path={`/trial`} element={<TrialPage />} />
          <Route path={`/trial-expired`} element={<PageFinishTrial />} />
          <Route
            path={`/trial/:organizationName/:roboticsCloudName/:instanceName/:fleetName/:robotName`}
            element={<RobotPage />}
          />
          <Route
            path={`/trial/:productName`}
            element={<MarketplaceSingleItemPage />}
          />
          <Route path="/404" element={<Page404 />} />
          <Route path="*" element={<Navigate to={`/trial`} />} />
        </Route>
      </Route>
    </Routes>
  );
}
