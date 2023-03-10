import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/public/LoginPage/LoginPage";
import RegistrationPage from "../pages/public/RegistrationPage/RegistrationPage";
import { PrivateLayout } from "../layouts/PrivateLayout";
import OrganizationDashboardPage from "../pages/private/Dashboards/OrganizationDashboardPage/OrganizationDashboardPage";
import SidebarContext from "../contexts/SidebarContext";
import { LandingPage } from "../pages/public/LandingPage/LandingPage";
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage/ForgotPassword";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../app/store";
import TeamsPage from "../pages/private/URM/TeamsPage";
import TeamMembersPage from "../pages/private/URM/TeamMembersPage";
import RobotPage from "../pages/private/RobotPage/RobotPage";
import TeamDashboardPage from "../pages/private/Dashboards/TeamDashboardPage/TeamDashboardPage";
import RoboticsCloudDashboardPage from "../pages/private/Dashboards/RoboticsCloudDashboardPage/RoboticsCloudDashboardPage";
import FleetDashboardPage from "../pages/private/Dashboards/FleetDashboardPage/FleetDashboardPage";

export default function AppRoutes(): ReactElement {
  const userToken: any = () => {
    return true;
  };

  const organizationUserToken: any = () => {
    return true;
  };

  const { currentOrganization } = useAppSelector(
    (state: RootState) => state.organization
  );
  return (
    <Routes>
      {!userToken() && !organizationUserToken() ? (
        <Route element={<PublicLayout />}>
          <Route path="/registration" element={<RegistrationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      ) : userToken() && !organizationUserToken() ? (
        <Route>
          <Route path="/organizations" element={<LandingPage />} />
          <Route path="*" element={<Navigate to="/organizations" />} />
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
