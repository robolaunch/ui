import React, { ReactElement } from "react";
import PhysicalInstancesDashboardPage from "../pages/Dashboards/PhysicalInstancesDashboardPage/PhysicalInstancesDashboardPage";
import CloudInstanceDashboardPage from "../pages/Dashboards/CloudInstancesDashboardPage/CloudInstanceDashboardPage";
import RoboticsCloudDashboardPage from "../pages/Dashboards/RoboticsCloudDashboardPage/RoboticsCloudDashboardPage";
import MarketplaceSingleItemPage from "../pages/Marketplace/MarketplaceSingleItemPage/MarketplaceSingleItemPage";
import OrganizationDashboardPage from "../pages/Dashboards/OrganizationDashboardPage/OrganizationDashboardPage";
import FleetDashboardPage from "../pages/Dashboards/FleetDashboardPage/FleetDashboardPage";
import MainDashboardPage from "../pages/Dashboards/MainDashboardPage/MainDashboardPage";
import MarketplacePage from "../pages/Marketplace/MarketplacePage/MarketplacePage";
import UserRoleManagementLayout from "../layouts/UserRoleManagementLayout";
import BillingPage from "../pages/BillingPage/BillingPage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProfilePage from "../pages/Profile/ProfilePage";
import PrivateProvider from "../auth/PrivateProvider";
import RobotPage from "../pages/RobotPage/RobotPage";
import Page404 from "../pages/Page404/Page404";

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<PrivateProvider />}>
        <Route
          path={`/user-role-management`}
          element={<UserRoleManagementLayout />}
        />
        <Route path={`/billing`} element={<BillingPage />} />
        <Route path={`/marketplace`} element={<MarketplacePage />} />
        <Route
          path={`/marketplace/:name`}
          element={<MarketplaceSingleItemPage />}
        />
        <Route path={`/profile`} element={<ProfilePage />} />

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
          path={`/:organizationName/:roboticsCloudName/:instanceName`}
          element={<CloudInstanceDashboardPage />}
        />
        <Route
          path={`/:organizationName/:roboticsCloudName/:instanceName/physical-instances`}
          element={<PhysicalInstancesDashboardPage />}
        />
        <Route
          path={`/:organizationName/:roboticsCloudName/:instanceName/:fleetName`}
          element={<FleetDashboardPage />}
        />
        <Route
          path={`/:organizationName/:roboticsCloudName/:instanceName/:fleetName/:robotName`}
          element={<RobotPage />}
        />
        {/* Dashboard Pages */}

        <Route path="/404" element={<Page404 />} />

        <Route path="*" element={<Navigate to={`/`} />} />
      </Route>
    </Routes>
  );
}
