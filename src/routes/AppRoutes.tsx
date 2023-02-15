import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";
import LoginPage from "../pages/public/LoginPage/LoginPage";
import RegistrationPage from "../pages/public/RegistrationPage/RegistrationPage";
import { PrivateLayout } from "../layouts/PrivateLayout";
import { OrganizationDashboard } from "../pages/private/Dashboards/OrganizationDashboard";
import SidebarContext from "../context/SidebarContext";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { LandingPage } from "../pages/public/LandingPage/LandingPage";

const AppRoutes = () => {
  const userToken: any = () => {
    try {
      const token: any = JSON.parse(localStorage.authTokens);

      return Number(
        // @ts-ignore
        jwt_decode(token?.refreshToken).exp - Number(dayjs().unix())
      ) > 0
        ? true
        : false;
    } catch (error) {
      localStorage.removeItem(`authTokens`);
      localStorage.removeItem(`authTokens_organization`);
      return false;
    }
  };
  const organizationUserToken: any = () => {
    try {
      const token: any = JSON.parse(localStorage.authTokens_organization);

      return Number(
        // @ts-ignore
        jwt_decode(token.refreshToken).exp - Number(dayjs().unix())
      ) > 0
        ? true
        : false;
    } catch (error) {
      localStorage.removeItem(`authTokens_organization`);
      return false;
    }
  };

  // Loop;
  useEffect(() => {
    setInterval(() => {
      userToken();
      organizationUserToken();
      if (userToken()) {
        if (
          Number(
            // @ts-ignore
            jwt_decode(
              JSON.parse(
                // @ts-ignore
                localStorage.getItem(`authTokens`)
              ).refreshToken
            ).exp -
              Number(dayjs().unix()) <
              100
          )
        ) {
          // dispatch(getOrganizations());
          console.log("authTokens Renewed with Routes loop");
        }
      }
      if (organizationUserToken()) {
        if (
          Number(
            // @ts-ignore
            jwt_decode(
              JSON.parse(
                // @ts-ignore
                localStorage.getItem(`authTokens_organization`)
              ).refreshToken
            ).exp -
              Number(dayjs().unix()) <
              100
          )
        ) {
          // dispatch(
          //   getCurrentUser({
          //     organization: {
          //       name: currentOrganization.name,
          //     },
          //   })
          // );
          console.log("authTokens_organization Renewed with Routes loop");
        }
      }
      console.log("Loop working...");
    }, 10000);
  }, []);

  return (
    <Routes>
      {!userToken() && !organizationUserToken() ? (
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegistrationPage />} />
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
          <Route path="/test" element={<OrganizationDashboard />} />
          <Route path="*" element={<Navigate to="/test" />} />
        </Route>
      )}
    </Routes>
  );
};

export default AppRoutes;
