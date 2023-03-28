import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/public/LoginPage/LoginPage";
import RegistrationPage from "../pages/public/RegistrationPage/RegistrationPage";
import { PrivateLayout } from "../layouts/PrivateLayout";
import OrganizationDashboardPage from "../pages/private/Dashboards/OrganizationDashboardPage/OrganizationDashboardPage";
import SidebarContext from "../contexts/SidebarContext";
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage/ForgotPassword";
import RobotPage from "../pages/private/RobotPage/RobotPage";
import TeamDashboardPage from "../pages/private/Dashboards/TeamDashboardPage/TeamDashboardPage";
import RoboticsCloudDashboardPage from "../pages/private/Dashboards/RoboticsCloudDashboardPage/RoboticsCloudDashboardPage";
import FleetDashboardPage from "../pages/private/Dashboards/FleetDashboardPage/FleetDashboardPage";
import URMPage from "../pages/private/URM/URMPage";
import MainDashboardPage from "../pages/private/Dashboards/MainDashboardPage/MainDashboardPage";

export default function AppRoutes(): ReactElement {
  const token = () => {
    return true;
  };

  return (
    <Routes>
      {!token() ? (
        <Route element={<PublicLayout />}>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      ) : (
        <Route element={<PrivateLayout />}>
          {/* URM Pages */}
          <Route path={`/user-role-management`} element={<URMPage />} />
          {/* URM Pages */}

          {/* Dashboard Pages */}
          <Route path={`/`} element={<MainDashboardPage />} />
          <Route
            path={`/:organizationName`}
            element={<OrganizationDashboardPage />}
          />
          <Route
            path={`/:organizationName/:teamName`}
            element={<TeamDashboardPage />}
          />
          <Route
            path={`/:organizationName/:teamName/:roboticsCloudName`}
            element={<RoboticsCloudDashboardPage />}
          />
          <Route
            path={`/:organizationName/:teamName/:roboticsCloudName/:fleetName`}
            element={<FleetDashboardPage />}
          />
          <Route
            path={`/:organizationName/:teamName/:roboticsCloudName/:fleetName/:robotName`}
            element={<RobotPage />}
          />
          {/* Dashboard Pages */}

          <Route path="*" element={<Navigate to={`/`} />} />
        </Route>
      )}
    </Routes>
  );
}
