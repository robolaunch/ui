import React, { ReactElement } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/public/LoginPage/LoginPage";
import RegistrationPage from "../pages/public/RegistrationPage/RegistrationPage";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { OrganizationDashboard } from "../pages/private/Dashboards/OrganizationDashboard";
import SidebarContext from "../context/SidebarContext";
import { LandingPage } from "../pages/public/LandingPage/LandingPage";
import ForgotPasswordPage from "../pages/public/ForgotPasswordPage/ForgotPassword";
import { useAppSelector } from "../hooks/redux";
import { RootState } from "../app/store";
import TeamsPage from "../pages/private/URM/TeamsPage";
import TeamMembersPage from "../pages/private/URM/TeamMembersPage";
import RemoteDesktop from "../pages/private/RemoteDesktop/RemoteDesktop";

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
          <Route
            path={`/${currentOrganization.name}`}
            element={<OrganizationDashboard />}
          />
          <Route
            path={`/${currentOrganization.name}/teams`}
            element={<TeamsPage />}
          />
          <Route
            path={`/${currentOrganization.name}/:teamName/members`}
            element={<TeamMembersPage />}
          />
          <Route
            path={`/${currentOrganization.name}/:teamName/:roboticsCloudName/:fleetName/:robotName/remote-desktop`}
            element={<RemoteDesktop />}
          />
          <Route
            path="*"
            element={<Navigate to={`/${currentOrganization.name}`} />}
          />
        </Route>
      )}
    </Routes>
  );
}
