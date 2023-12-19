import EnvironmentObjectLabel from "../EnvironmentObjectLabel/EnvironmentObjectLabel";
import EnvironmentNameLabel from "../EnvironmentNameLabel/EnvironmentNameLabel";
import { envApplication } from "../../helpers/envProvider";
import { useParams } from "react-router-dom";
import { ReactElement } from "react";

export default function EnvironmentLabels(): ReactElement {
  const url = useParams();

  return (
    <div className="flex items-center gap-7">
      <EnvironmentNameLabel />
      <div className="flex items-center gap-3.5">
        <EnvironmentObjectLabel
          icon="organization"
          text={`Organization: ${url?.organizationName}`}
        />
        <EnvironmentObjectLabel
          icon="region"
          text={`Region: ${url?.roboticsCloudName}`}
        />
        <EnvironmentObjectLabel
          icon="instance"
          text={`Instance: ${url?.instanceName}`}
        />
        <EnvironmentObjectLabel
          icon="fleet"
          text={`${envApplication ? "Namespace" : "Fleet"}: ${url?.fleetName}`}
        />
      </div>
    </div>
  );
}
