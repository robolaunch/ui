import ConnectionLabel from "../ConnectionLabel/ConnectionLabel";
import StateCell from "../TableInformationCells/StateCell";
import { envApplication } from "../../helpers/envProvider";
import { useKeycloak } from "@react-keycloak/web";
import useRobot from "../../hooks/useRobot";
import { ReactElement } from "react";

export default function Connections(): ReactElement {
  const { responseRobot, isSettedCookie } = useRobot();
  const { keycloak } = useKeycloak();

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
        <ConnectionLabel label="IDE" url={responseRobot?.ideIngressEndpoint} />
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
