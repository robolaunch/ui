import KeycloakLoadingPage from "../components/KeycloakLoadingPage/KeycloakLoadingPage";
import PrivateLayout from "../layouts/PrivateLayout/PrivateLayout";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import FunctionsContext from "../contexts/FunctionsContext";
import GithubContext from "../contexts/GithubContext";
import MainContext from "../contexts/MainContext";
import keycloak from "../api/keycloak";
import { jwtDecode } from "jwt-decode";
import { ReactElement } from "react";

export default function PrivateProvider(): ReactElement {
  return (
    <ReactKeycloakProvider
      LoadingComponent={<KeycloakLoadingPage />}
      authClient={keycloak}
      autoRefreshToken={true}
      onTokens={(tokens) => {
        localStorage.setItem(
          "tokens",
          JSON.stringify({
            tokens,
            user: tokens?.token && jwtDecode?.(tokens?.token),
          }),
        );
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
          <FunctionsContext>
            <PrivateLayout />
          </FunctionsContext>
        </GithubContext>
      </MainContext>
    </ReactKeycloakProvider>
  );
}
