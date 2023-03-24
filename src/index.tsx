import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";
import { Provider } from "react-redux";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./auth/keycloak";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const loadingPage = (
  <div className="absolute inset-0 flex flex-col items-center justify-center z-50">
    <img
      src="/images/ring.svg"
      alt="robolaunch"
      className="w-24 animate-spin"
    />
    <img
      src="/images/rocket.svg"
      alt="robolaunch"
      className="fixed pb-1 w-16"
    />
  </div>
);

root.render(
  <ReactKeycloakProvider
    LoadingComponent={loadingPage}
    authClient={keycloak}
    autoRefreshToken={true}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ReactKeycloakProvider>
);
