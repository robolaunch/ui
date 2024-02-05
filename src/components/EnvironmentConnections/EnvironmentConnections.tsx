import ConnectionLabel from "../ConnectionLabel/ConnectionLabel";
import StateCell from "../TableInformationCells/StateCell";
import useCreateRobot from "../../hooks/useCreateRobot";
import { useKeycloak } from "@react-keycloak/web";
import useRobot from "../../hooks/useRobot";
import { ReactElement } from "react";
import { useAppSelector } from "../../hooks/redux";

export default function EnvironmentConnections(): ReactElement {
  const { connectionsReducer } = useRobot();
  const { keycloak } = useKeycloak();
  const { robotData } = useCreateRobot();
  const { applicationMode } = useAppSelector((state) => state.user);

  return (
    <div className="flex gap-4">
      {!applicationMode && (
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
            robotData?.step1?.services?.physicalIde?.httpsEndpoint
              ? "Virtual IDE"
              : "IDE"
          }
          url={robotData.step1.services.ide?.httpsEndpoint}
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
      {robotData?.step1?.services?.physicalIde?.isEnabled && (
        <div className="flex gap-1" id="ide">
          <ConnectionLabel
            label="Physical IDE"
            url={robotData?.step1?.services?.physicalIde?.httpsEndpoint}
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
            robotData.step1.services.vdi?.socketEndpoint &&
            "https://" +
              robotData.step1.services.vdi?.socketEndpoint?.split("//")[1] +
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
      {robotData.step1?.services.jupyterNotebook?.httpsEndpoint && (
        <div className="flex gap-1" id="jupyter">
          <ConnectionLabel
            label="Jupyter Notebook"
            url={robotData.step1.services.jupyterNotebook.httpsEndpoint}
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
      )}
    </div>
  );
}
