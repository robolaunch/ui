import React, { ReactElement, useEffect, useState } from "react";

interface IRobotServicesStatusViewer {
  vdiURL: string;
  rosURL: string;
  ideURL: string;
}

export default function RobotServicesStatusViewer({
  vdiURL,
  rosURL,
  ideURL,
}: IRobotServicesStatusViewer): ReactElement {
  const [connectionStatus, setConnectionStatus] = useState<any>({
    vdi: null,
    ros: null,
    ide: null,
  });

  useEffect(() => {
    const vdi: WebSocket = new WebSocket(
      (vdiURL || "ws://localhost:8080/") + "ws?password=admin"
    );

    if (connectionStatus.vdi === null) {
      vdi.onopen = () => {
        setConnectionStatus({
          ...connectionStatus,
          vdi: true,
        });
        vdi.close();
      };

      vdi.onerror = () => {
        setConnectionStatus({
          ...connectionStatus,
          vdi: false,
        });
        vdi.close();
      };

      vdi.onclose = () => {
        setConnectionStatus({
          ...connectionStatus,
          vdi: false,
        });
        vdi.close();
      };
    }
  }, [vdiURL, connectionStatus]);

  return (
    <div>
      <div>
        vdi:
        {connectionStatus.vdi === null
          ? "null"
          : connectionStatus.vdi
          ? "true"
          : "false"}
      </div>
    </div>
  );
}
