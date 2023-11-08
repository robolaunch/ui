import React, { ReactElement, useEffect } from "react";
import useRobot from "../../hooks/useRobot";
import StateCell from "../TableInformationCells/StateCell";
import ConnectionLabel from "../ConnectionLabel/ConnectionLabel";
import { useKeycloak } from "@react-keycloak/web";

export default function Connections(): ReactElement {
  const { responseRobot, isSettedCookie } = useRobot();
  const { keycloak } = useKeycloak();

  useEffect(() => {
    console.log("isSettedCookie", isSettedCookie);
  }, [isSettedCookie]);

  return (
    <div className="flex gap-4">
      <div className="flex gap-1" id="ide">
        <ConnectionLabel label="IDE" url={responseRobot?.ideIngressEndpoint} />
        <StateCell
          state={
            isSettedCookie === null
              ? "Waiting"
              : isSettedCookie
              ? "Connected"
              : "Warning"
          }
        />
      </div>
      <div className="flex gap-1" id="vdi">
        <ConnectionLabel
          label="VDI"
          url={
            "https://" +
            responseRobot?.vdiIngressEndpoint?.split("//")[1] +
            `?usr=${keycloak?.tokenParsed?.preferred_username}&pwd=admin`
          }
        />
        <StateCell
          state={
            isSettedCookie === null
              ? "Waiting"
              : isSettedCookie
              ? "Connected"
              : "Warning"
          }
        />
      </div>
    </div>
  );
}
