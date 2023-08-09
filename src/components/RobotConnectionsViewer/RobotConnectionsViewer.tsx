import React, { ReactElement, useEffect, useState } from "react";
import StateCell from "../Cells/StateCell";
import { envOnPremise } from "../../helpers/envProvider";

interface IRobotConnectionsViewer {
  ide: any;
  ros: any;
  vdiURL: string;
}

export default function RobotConnectionsViewer({
  ide,
  ros,
  vdiURL,
}: IRobotConnectionsViewer): ReactElement {
  const [isRosConnected, setIsRosConnected] = useState<boolean | null>(null);
  const [isVDIConnected, setIsVDIConnected] = useState<boolean | null>(null);

  useEffect(() => {
    if (ros) {
      ros?.on("connection", () => {
        setIsRosConnected(true);
      });

      ros?.on("error", () => {
        setIsRosConnected(false);
      });
    }
  }, [ros]);

  useEffect(() => {
    if (ide && vdiURL && vdiURL.split(":")[0] === "wss") {
      const vdiConnector = new WebSocket(vdiURL + "ws?password=admin");

      vdiConnector.onopen = () => {
        setIsVDIConnected(true);
        vdiConnector.close();
      };

      vdiConnector.onerror = () => {
        setIsVDIConnected(false);
      };
    }
  }, [ide, vdiURL]);

  return (
    <div className="flex gap-6">
      {!envOnPremise && (
        <div className="flex gap-1">
          <span className="text-xs font-semibold">ROS: </span>
          <StateCell
            state={
              isRosConnected === true
                ? "Connected"
                : isRosConnected === false
                ? "Warning"
                : "Waiting"
            }
          />
        </div>
      )}
      <div className="flex gap-1">
        <span className="text-xs font-semibold">IDE: </span>
        <StateCell
          state={
            ide === true ? "Connected" : ide === false ? "Warning" : "Waiting"
          }
        />
      </div>
      <div className="flex gap-1">
        <span className="text-xs font-semibold">VDI: </span>
        <StateCell
          state={
            isVDIConnected === true
              ? "Connected"
              : isVDIConnected === false
              ? "Warning"
              : "Waiting"
          }
        />
      </div>
    </div>
  );
}
