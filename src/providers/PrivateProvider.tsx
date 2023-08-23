import React, { ReactElement } from "react";
import KeycloakLoadingPage from "../components/KeycloakLoadingPage/KeycloakLoadingPage";
import CreateRobotContext from "../contexts/CreateRobotContext";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import FunctionsContext from "../contexts/FunctionsContext";
import GithubContext from "../contexts/GithubContext";
import PrivateLayout from "../layouts/PrivateLayout";
import MainContext from "../contexts/MainContext";
import keycloak from "../api/keycloak";

export default function PrivateProvider(): ReactElement {
  return (
    <ReactKeycloakProvider
      LoadingComponent={<KeycloakLoadingPage />}
      authClient={keycloak}
      autoRefreshToken={true}
      onTokens={(tokens) => {
        localStorage.setItem("tokens", JSON.stringify(tokens));
      }}
      initOptions={{
        useNonce: true,
        onLoad: "login-required",
        checkLoginIframe: false,
        prompt: "none",
      }}
    >
      <MainContext>
        <GithubContext>
          <CreateRobotContext>
            <FunctionsContext>
              <PrivateLayout />
            </FunctionsContext>
          </CreateRobotContext>
        </GithubContext>
      </MainContext>
    </ReactKeycloakProvider>
  );
}
