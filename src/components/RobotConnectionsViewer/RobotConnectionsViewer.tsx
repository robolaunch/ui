import React, { ReactElement, useEffect, useState } from "react";
import StateCell from "../Cells/StateCell";

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
      <div className="flex gap-1">
        <span>ROS: </span>
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
      <div className="flex gap-1">
        <span>IDE: </span>
        <StateCell
          state={
            ide === true ? "Connected" : ide === false ? "Warning" : "Waiting"
          }
        />
      </div>
      <div className="flex gap-1">
        <span>VDI: </span>
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
