import React, { ReactElement, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/public/LoginPage/LoginPage";
import RegistrationPage from "../pages/public/RegistrationPage/RegistrationPage";
import { PrivateLayout } from "../layouts/PrivateLayout";
import OrganizationDashboardPage from "../pages/private/Dashboards/OrganizationDashboardPage/OrganizationDashboardPage";
import SidebarContext from "../contexts/SidebarContext";
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage/ForgotPassword";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../app/store";
import TeamsPage from "../pages/private/URM/TeamsPage";
import TeamMembersPage from "../pages/private/URM/TeamMembersPage";
import RobotPage from "../pages/private/RobotPage/RobotPage";
import TeamDashboardPage from "../pages/private/Dashboards/TeamDashboardPage/TeamDashboardPage";
import RoboticsCloudDashboardPage from "../pages/private/Dashboards/RoboticsCloudDashboardPage/RoboticsCloudDashboardPage";
import FleetDashboardPage from "../pages/private/Dashboards/FleetDashboardPage/FleetDashboardPage";
import { useKeycloak } from "@react-keycloak/web";

export default function AppRoutes(): ReactElement {
  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );

  const { keycloak, initialized } = useKeycloak();
  console.log(keycloak);
  const token = () => {
    return initialized;
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
        <Route
          element={
            <SidebarContext>
              <PrivateLayout />
            </SidebarContext>
          }
        >
          {/* Dashboard Pages */}
          <Route
            path={`/${currentOrganization.name}`}
            element={<OrganizationDashboardPage />}
          />
          <Route
            path={`/${currentOrganization.name}/:teamName`}
            element={<TeamDashboardPage />}
          />
          <Route
            path={`/${currentOrganization.name}/:teamName/:roboticsCloudName`}
            element={<RoboticsCloudDashboardPage />}
          />
          <Route
            path={`/${currentOrganization.name}/:teamName/:roboticsCloudName/:fleetName`}
            element={<FleetDashboardPage />}
          />
          <Route
            path={`/${currentOrganization.name}/:teamName/:roboticsCloudName/:fleetName/:robotName`}
            element={<RobotPage />}
          />
          {/* Dashboard Pages */}

          {/* URM Pages */}
          <Route
            path={`/${currentOrganization.name}/teams`}
            element={<TeamsPage />}
          />
          <Route
            path={`/${currentOrganization.name}/:teamName/members`}
            element={<TeamMembersPage />}
          />
          {/* URM Pages */}

          <Route
            path="*"
            element={<Navigate to={`/${currentOrganization.name}`} />}
          />
        </Route>
      )}
    </Routes>
  );
}
