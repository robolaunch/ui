import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./resources/store";
import { Provider } from "react-redux";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./auth/keycloak";
import ApiContext from "./contexts/ApiContext";

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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
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
    <Provider store={store}>
      <BrowserRouter>
        <ApiContext>
          <App />
        </ApiContext>
      </BrowserRouter>
    </Provider>
  </ReactKeycloakProvider>
);
