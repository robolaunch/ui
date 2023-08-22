import Keycloak from "keycloak-js";
import {
  envKeycloakAuthURL,
  envKeycloakClientID,
  envKeycloakRealm,
} from "../helpers/envProvider";

const keycloak = new Keycloak({
  url: envKeycloakAuthURL,
  realm: envKeycloakRealm,
  clientId: envKeycloakClientID,
});

export default keycloak;
