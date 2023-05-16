import { ReactKeycloakProvider } from "@react-keycloak/web";
import React, { ReactElement } from "react";
import GithubContext from "../contexts/GithubContext";
import CreateRobotContext from "../contexts/CreateRobotContext";
import keycloak from "../apis/keycloak";
import PrivateLayout from "../layouts/PrivateLayout";
import SidebarContext from "../contexts/SidebarContext";

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
      <SidebarContext>
        <GithubContext>
          <CreateRobotContext>
            <PrivateLayout />
          </CreateRobotContext>
        </GithubContext>
      </SidebarContext>
    </ReactKeycloakProvider>
  );
}
