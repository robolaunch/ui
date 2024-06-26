import EnvironmentConnections from "../EnvironmentConnections/EnvironmentConnections";
import EnvironmentMainLabels from "../EnvironmentMainLabels/EnvironmentMainLabels";
import EnvironmentHeaderTabs from "../EnvironmentHeaderTabs/EnvironmentHeaderTabs";
import { ReactElement } from "react";
import Card from "../Card/Card";

export default function EnvironmentHeader(): ReactElement {
  return (
    <Card dataTut="robot-header" className="!h-28 flex-none !p-0">
      <div className="flex h-full flex-col justify-between px-9 py-5 !pb-0">
        <div className="flex items-center justify-between">
          <EnvironmentMainLabels />
          <EnvironmentConnections />
        </div>
        <div className="flex items-center justify-between">
          <EnvironmentHeaderTabs />
        </div>
      </div>
    </Card>
  );
}
