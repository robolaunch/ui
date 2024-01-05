export const isProduction: boolean =
  process.env.NODE_ENV === "production" ? true : false;

export const envKeycloakAuthURL: string =
  process.env.REACT_APP_KEYCLOAK_URL || "";

export const envKeycloakRealm: string =
  process.env.REACT_APP_KEYCLOAK_REALM || "";

export const envKeycloakClientID: string =
  process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "";

export const envApplication: boolean =
  process.env.REACT_APP_DEFAULT_MODE === "application" ? true : false;

export const envSwitchable: boolean =
  process.env.REACT_APP_SWITCHABLE === "switchable" ? true : false;

export const envCreateOrganization: boolean =
  process.env.REACT_APP_CREATE_ORGANIZATION === "true" ? true : false;

export const envCreateRegion: boolean =
  process.env.REACT_APP_CREATE_REGION === "true" ? true : false;

export const envCreateInstance: boolean =
  process.env.REACT_APP_CREATE_INSTANCE === "true" ? true : false;
