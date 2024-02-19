import KeycloakLoadingPage from "../components/KeycloakLoadingPage/KeycloakLoadingPage";
import PrivateLayout from "../layouts/PrivateLayout/PrivateLayout";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import FunctionsContext from "../contexts/FunctionsContext";
import GithubContext from "../contexts/GithubContext";
import MainContext from "../contexts/MainContext";
import { jwtDecode } from "jwt-decode";
import { ReactElement } from "react";
import Keycloak from "keycloak-js";
import {
  envKeycloakAuthURL,
  envKeycloakClientID,
  envKeycloakRealm,
} from "../helpers/envProvider";

export default function PrivateProvider(): ReactElement {
  const keycloak = new Keycloak({
    url: envKeycloakAuthURL,
    realm: envKeycloakRealm,
    clientId: envKeycloakClientID,
  });

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
