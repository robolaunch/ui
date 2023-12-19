import { ReactElement } from "react";
import Button from "../Button/Button";
import useVDI from "../../hooks/useVDI";
import { useKeycloak } from "@react-keycloak/web";

export default function VDIControlButton(): ReactElement {
  const { remoteDesktopReducer, client } = useVDI();
  const { keycloak } = useKeycloak();

  function handleGetControl() {
    if (
      remoteDesktopReducer?.controller?.displayname ===
      keycloak?.tokenParsed?.preferred_username
    ) {
      client.current.send(JSON.stringify({ event: "control/release" }));
      return;
    }

    client.current.send(JSON.stringify({ event: "control/request" }));
  }

  return (
    <Button
      text={(() => {
        if (
          remoteDesktopReducer?.controller?.displayname ===
          keycloak?.tokenParsed?.preferred_username
        ) {
          return "Release Control";
        }

        if (remoteDesktopReducer?.controller?.displayname) {
          return "Request Control";
        }

        return "Take Control";
      })()}
      onClick={() => handleGetControl()}
      className="!h-9 !w-32 !text-[0.68rem]"
    />
  );
}
