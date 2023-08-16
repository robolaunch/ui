import React, { ReactElement } from "react";
import useRobot from "../../hooks/useRobot";
import Button from "../Button/Button";

export default function RobotServiceButtons(): ReactElement {
  const { responseRobot, isSettedCookie } = useRobot();

  return (
    <div className="flex gap-2">
      <div className="flex  items-center rounded-lg">
        <a
          target="_blank"
          rel="noreferrer"
          href={responseRobot?.ideIngressEndpoint || "#"}
        >
          <Button
            disabled={!isSettedCookie}
            loading={!isSettedCookie}
            text={"Code Editor"}
            className="!h-9 text-xs px-4"
          />
        </a>
      </div>
      <div className="flex items-center rounded-lg p-2">
        <a
          target="_blank"
          rel="noreferrer"
          href={
            responseRobot?.vdiIngressEndpoint
              ? `https://${responseRobot?.vdiIngressEndpoint?.split("//")[1]}`
              : "#"
          }
        >
          <Button
            disabled={!isSettedCookie}
            loading={!isSettedCookie}
            text={"Remote Desktop"}
            className="!h-9 text-xs px-4"
          />
        </a>
      </div>
    </div>
  );
}
