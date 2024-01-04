import EnvironmentObjectLabel from "../EnvironmentObjectLabel/EnvironmentObjectLabel";
import EnvironmentNameLabel from "../EnvironmentNameLabel/EnvironmentNameLabel";
import { envApplication } from "../../helpers/envProvider";
import useMain from "../../hooks/useMain";
import { ReactElement } from "react";
import { orgNameViewer } from "../../functions/GeneralFunctions";

export default function EnvironmentLabels(): ReactElement {
  const { selectedState } = useMain();

  return (
    <div className="flex items-center gap-7">
      <EnvironmentNameLabel />
      <div className="flex items-center gap-3.5">
        <EnvironmentObjectLabel
          icon="organization"
          text={`Organization: ${orgNameViewer(
            selectedState?.organization?.organizationName!,
          )}`}
        />
        <EnvironmentObjectLabel
          icon="region"
          text={`Region: ${selectedState?.instance?.region}`}
        />
        <EnvironmentObjectLabel
          icon="instance"
          text={`Instance: ${selectedState?.instance?.name}`}
        />
        <EnvironmentObjectLabel
          icon="fleet"
          text={`${envApplication ? "Namespace" : "Fleet"}: ${selectedState
            ?.fleet?.name}`}
        />
      </div>
    </div>
  );
}
