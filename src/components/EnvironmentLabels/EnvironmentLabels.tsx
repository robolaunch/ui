import { ReactElement } from "react";
import ColorLabel from "../ColorLabel/ColorLabel";
import { useParams } from "react-router-dom";
import RobotHeaderLabel from "../RobotHeaderLabel/RobotHeaderLabel";
import { envApplication } from "../../helpers/envProvider";

export default function EnvironmentLabels(): ReactElement {
  const url = useParams();

  return (
    <div className="flex items-center gap-4">
      <span className="flex items-center gap-2">
        <span className="text-lg font-medium">{url?.robotName}</span>
        <ColorLabel />
      </span>
      <div className="flex h-full items-center justify-center gap-4">
        <RobotHeaderLabel
          icon="organization"
          text={`Organization: ${url?.organizationName}`}
        />
        <RobotHeaderLabel
          icon="region"
          text={`Region: ${url?.roboticsCloudName}`}
        />
        <RobotHeaderLabel
          icon="instance"
          text={`Instance: ${url?.instanceName}`}
        />
        <RobotHeaderLabel
          icon="fleet"
          text={`${envApplication ? "Namespace" : "Fleet"}: ${url?.fleetName}`}
        />
      </div>
    </div>
  );
}
