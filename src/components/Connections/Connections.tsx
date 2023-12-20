import ConnectionLabel from "../ConnectionLabel/ConnectionLabel";
import StateCell from "../TableInformationCells/StateCell";
import { envApplication } from "../../helpers/envProvider";
import { useKeycloak } from "@react-keycloak/web";
import useRobot from "../../hooks/useRobot";
import { ReactElement, useEffect, useState } from "react";
import ROSLIB from "roslib";

export default function Connections(): ReactElement {
  const { responseRobot, isSettedCookie, isRobotReady } = useRobot();
  const { keycloak } = useKeycloak();

  const [isRosConnected, setIsRosConnected] = useState<boolean | null>(null);

  useEffect(() => {
    let rosClient: ROSLIB.Ros | null = null;

    const establishRosConnection = () => {
      rosClient = new ROSLIB.Ros({
        url: responseRobot?.bridgeIngressEndpoint,
      });

      rosClient.on("connection", () => setIsRosConnected(true));
      rosClient.on("error", () => setIsRosConnected(false));
    };

    const closeRosConnection = () => {
      if (rosClient) {
        rosClient.close();
      }
    };

    if (
      isRobotReady &&
      isSettedCookie &&
      responseRobot?.bridgeIngressEndpoint
    ) {
      closeRosConnection();
      establishRosConnection();
    }

    return closeRosConnection;
  }, [isRobotReady, isSettedCookie, responseRobot?.bridgeIngressEndpoint]);

  useEffect(() => {
    console.log("isRosConnected", isRosConnected);
  }, [isRosConnected]);

  return (
    <div className="flex gap-4">
      {!envApplication && (
        <div className="flex gap-1" id="ros">
          <ConnectionLabel label="ROS" />
          <StateCell
            state={
              isSettedCookie === undefined
                ? "Waiting"
                : isSettedCookie
                ? "Connected"
                : "Warning"
            }
          />
        </div>
      )}
      <div className="flex gap-1" id="ide">
        <ConnectionLabel
          label={
            responseRobot?.physicalIdeIngressEndpoint ? "Virtual IDE" : "IDE"
          }
          url={responseRobot?.ideIngressEndpoint}
        />
        <StateCell
          state={
            isSettedCookie === undefined
              ? "Waiting"
              : isSettedCookie
              ? "Connected"
              : "Warning"
          }
        />
      </div>
      {responseRobot?.physicalIdeIngressEndpoint && (
        <div className="flex gap-1" id="ide">
          <ConnectionLabel
            label="Physical IDE"
            url={responseRobot?.physicalIdeIngressEndpoint}
          />
          <StateCell
            state={
              isSettedCookie === undefined
                ? "Waiting"
                : isSettedCookie
                ? "Connected"
                : "Warning"
            }
          />
        </div>
      )}
      <div className="flex gap-1" id="vdi">
        <ConnectionLabel
          label="VDI"
          url={
            responseRobot?.vdiIngressEndpoint &&
            "https://" +
              responseRobot?.vdiIngressEndpoint?.split("//")[1] +
              `?usr=${keycloak?.tokenParsed?.preferred_username}&pwd=admin`
          }
        />
        <StateCell
          state={
            isSettedCookie === undefined
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
