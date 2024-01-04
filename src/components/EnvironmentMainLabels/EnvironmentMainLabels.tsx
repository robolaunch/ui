import EnvironmentObjectLabels from "../EnvironmentObjectLabels/EnvironmentObjectLabels";
import EnvironmentTitle from "../EnvironmentTitle/EnvironmentTitle";
import EnvironmentType from "../EnvironmentType/EnvironmentType";
import { ReactElement } from "react";

export default function EnvironmentMainLabels(): ReactElement {
  return (
    <div className="flex items-center gap-7">
      <span className="flex items-center gap-2">
        <EnvironmentTitle />
        <EnvironmentType />
      </span>
      <div className="flex items-center gap-3.5">
        <EnvironmentObjectLabels />
      </div>
    </div>
  );
}
