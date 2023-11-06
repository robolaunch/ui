import React, { ReactElement, useEffect } from "react";
import useRobot from "../../hooks/useRobot";
import StateCell from "../TableInformationCells/StateCell";
import ConnectionLabel from "../ConnectionLabel/ConnectionLabel";

export default function Connections(): ReactElement {
  const { responseRobot, isSettedCookie } = useRobot();

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
          url={"https://" + responseRobot?.vdiIngressEndpoint?.split("//")[1]}
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
