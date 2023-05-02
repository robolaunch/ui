import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateLayout } from "../layouts/PrivateLayout";
import OrganizationDashboardPage from "../pages/Dashboards/OrganizationDashboardPage/OrganizationDashboardPage";
import RobotPage from "../pages/RobotPage/RobotPage";
import RoboticsCloudDashboardPage from "../pages/Dashboards/RoboticsCloudDashboardPage/RoboticsCloudDashboardPage";
import FleetDashboardPage from "../pages/Dashboards/FleetDashboardPage/FleetDashboardPage";
import MainDashboardPage from "../pages/Dashboards/MainDashboardPage/MainDashboardPage";
import UserRoleManagementLayout from "../layouts/UserRoleManagementLayout";
import MarketplacePage from "../pages/Marketplace/MarketplacePage/MarketplacePage";
import MarketplaceSingleItemPage from "../pages/Marketplace/MarketplaceSingleItemPage/MarketplaceSingleItemPage";

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        <Route
          path={`/user-role-management`}
          element={<UserRoleManagementLayout />}
        />
        <Route path={`/marketplace`} element={<MarketplacePage />} />
        <Route
          path={`/marketplace/:name`}
          element={<MarketplaceSingleItemPage />}
        />

        {/* Dashboard Pages */}
        <Route path={`/`} element={<MainDashboardPage />} />
        <Route
          path={`/:organizationName`}
          element={<OrganizationDashboardPage />}
        />
        <Route
          path={`/:organizationName/:roboticsCloudName`}
          element={<RoboticsCloudDashboardPage />}
        />
        <Route
          path={`/:organizationName/:roboticsCloudName/:fleetName`}
          element={<FleetDashboardPage />}
        />
        <Route
          path={`/:organizationName/:roboticsCloudName/:fleetName/:robotName`}
          element={<RobotPage />}
        />
        {/* Dashboard Pages */}

        <Route path="*" element={<Navigate to={`/`} />} />
      </Route>
    </Routes>
  );
}
