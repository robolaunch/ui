import ConnectionLabel from "../ConnectionLabel/ConnectionLabel";
import StateCell from "../TableInformationCells/StateCell";
import { envApplication } from "../../helpers/envProvider";
import { useKeycloak } from "@react-keycloak/web";
import useRobot from "../../hooks/useRobot";
import { ReactElement, useEffect } from "react";

export default function Connections(): ReactElement {
  const { responseRobot, connectionsReducer } = useRobot();
  const { keycloak } = useKeycloak();

  useEffect(() => {
    console.log("connectionsReducer", connectionsReducer);
  }, [connectionsReducer]);

  return (
    <div className="flex gap-4">
      {!envApplication && (
        <div className="flex gap-1" id="ros">
          <ConnectionLabel label="ROS" />
          <StateCell
            state={
              connectionsReducer?.ros === null
                ? "Waiting"
                : connectionsReducer?.ros === true
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
            connectionsReducer?.virtualIDE === null
              ? "Waiting"
              : connectionsReducer?.virtualIDE
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
              connectionsReducer?.physicalIDE === null
                ? "Waiting"
                : connectionsReducer?.physicalIDE
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
            connectionsReducer?.vdi === null
              ? "Waiting"
              : connectionsReducer?.vdi
              ? "Connected"
              : "Warning"
          }
        />
      </div>
    </div>
  );
}
