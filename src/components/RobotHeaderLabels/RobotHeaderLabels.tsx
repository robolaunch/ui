import RobotHeaderLabel from "../RobotHeaderLabel/RobotHeaderLabel";
import { envApplication } from "../../helpers/envProvider";
import { useParams } from "react-router-dom";
import { ReactElement } from "react";

export default function RobotHeaderLabels(): ReactElement {
  const url = useParams();

  return (
    <div className="flex h-full items-center justify-center gap-8">
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
  );
}
