export const isProduction: boolean =
  process.env.NODE_ENV === "production" ? true : false;

export const envKeycloakAuthURL: string =
  process.env.REACT_APP_KEYCLOAK_URL || "";

export const envKeycloakRealm: string =
  process.env.REACT_APP_KEYCLOAK_REALM || "";

export const envKeycloakClientID: string =
  process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "";

export const envApplicationMode: boolean =
  process.env.REACT_APP_DEFAULT_MODE === "application" ? true : false;

export const envSwitchableMode: boolean =
  process.env.REACT_APP_SWITCHABLE_MODE === "true" ? true : false;

export const envCreatableOrganization: boolean =
  process.env.REACT_APP_CREATABLE_ORGANIZATION === "true" ? true : false;

export const envCreatableRegion: boolean =
  process.env.REACT_APP_CREATABLE_REGION === "true" ? true : false;

export const envCreatableInstance: boolean =
  process.env.REACT_APP_CREATABLE_INSTANCE === "true" ? true : false;
