import CreateRobotContext from "../contexts/CreateRobotContext";
import FunctionsContext from "../contexts/FunctionsContext";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import SidebarContext from "../contexts/SidebarContext";
import GithubContext from "../contexts/GithubContext";
import PageContext from "../contexts/PageContext";
import PrivateLayout from "../layouts/PrivateLayout";
import React, { ReactElement } from "react";
import keycloak from "../api/keycloak";

export default function PrivateProvider(): ReactElement {
  const loadingPage = (
    <div className="absolute inset-0 flex flex-col items-center justify-center z-50 animate__animated animate__fadeIn">
      <img
        src="/images/ring.svg"
        alt="robolaunch"
        className="w-28 animate-spin bg-layer-light-50 rounded-full shadow"
      />
      <img
        src="/images/rocket.svg"
        alt="robolaunch"
        className="fixed pb-1 w-14"
      />
    </div>
  );

  return (
    <ReactKeycloakProvider
      LoadingComponent={loadingPage}
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
      <PageContext>
        <SidebarContext>
          <GithubContext>
            <CreateRobotContext>
              <FunctionsContext>
                <PrivateLayout />
              </FunctionsContext>
            </CreateRobotContext>
          </GithubContext>
        </SidebarContext>
      </PageContext>
    </ReactKeycloakProvider>
  );
}
