export const envOnPremiseFleet: boolean =
  process.env.REACT_APP_ON_PREMISE_FLEET === "true" ? true : false;

export const envOnPremiseRobot: boolean =
  process.env.REACT_APP_ON_PREMISE_ROBOT === "true" ? true : false;

export const envFrontendUrl: string = process.env.REACT_APP_FRONTEND_URL || "";

export const isProduction: boolean =
  process.env.NODE_ENV === "production" ? true : false;

export const envKeycloakAuthURL: string =
  process.env.REACT_APP_KEYCLOAK_URL || "";

export const envKeycloakRealm: string =
  process.env.REACT_APP_KEYCLOAK_REALM || "";

export const envKeycloakClientID: string =
  process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "";
