import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { PrivateLayout } from "../layouts/PrivateLayout";
import OrganizationDashboardPage from "../pages/Dashboards/OrganizationDashboardPage/OrganizationDashboardPage";
import RobotPage from "../pages/RobotPage/RobotPage";
import RoboticsCloudDashboardPage from "../pages/Dashboards/RoboticsCloudDashboardPage/RoboticsCloudDashboardPage";
import FleetDashboardPage from "../pages/Dashboards/FleetDashboardPage/FleetDashboardPage";
import MainDashboardPage from "../pages/Dashboards/MainDashboardPage/MainDashboardPage";
import UserRoleManagement from "../pages/URM/UserRoleManagementLayout";

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route element={<PrivateLayout />}>
        {/* URM Pages */}
        <Route
          path={`/user-role-management`}
          element={<UserRoleManagement />}
        />
        {/* URM Pages */}

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
