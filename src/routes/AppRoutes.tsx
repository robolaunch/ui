import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/public/LoginPage/LoginPage";
import RegistrationPage from "../pages/public/RegistrationPage/RegistrationPage";
import { PrivateLayout } from "../layouts/PrivateLayout";
import OrganizationDashboardPage from "../pages/private/Dashboards/OrganizationDashboardPage/OrganizationDashboardPage";
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage/ForgotPassword";
import RobotPage from "../pages/private/RobotPage/RobotPage";
import RoboticsCloudDashboardPage from "../pages/private/Dashboards/RoboticsCloudDashboardPage/RoboticsCloudDashboardPage";
import FleetDashboardPage from "../pages/private/Dashboards/FleetDashboardPage/FleetDashboardPage";
import UserRoleManagementLayout from "../pages/private/URM/UserRoleManagementLayout";
import MainDashboardPage from "../pages/private/Dashboards/MainDashboardPage/MainDashboardPage";
import OrganizationUsersPage from "../pages/private/URM/OrganizationUsersPage";
import OrganizationsPage from "../pages/private/URM/OrganizationsPage";

export default function AppRoutes(): ReactElement {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<PublicLayout />}>
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      {/* Public Pages */}

      <Route element={<PrivateLayout />}>
        {/* URM Pages */}
        <Route path={`/user-role-management`} element={<OrganizationsPage />} />
        <Route
          path={`/user-role-management/:organizationName`}
          element={<OrganizationUsersPage />}
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
