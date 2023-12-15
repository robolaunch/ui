import HiddenFrame from "../../components/HiddenFrame/HiddenFrame";
import RobotSubPageLayout from "../../layouts/RobotSubPageLayout";
import RobotContext from "../../contexts/RobotContext";
import { ReactElement } from "react";
import EnvironmentHeader from "../../components/EnvironmentHeader/EnvironmentHeader";

export default function RobotPage(): ReactElement {
  return (
    <RobotContext>
      <div className="flex h-full flex-col gap-6">
        <EnvironmentHeader />
        <RobotSubPageLayout />
      </div>
      <HiddenFrame />
    </RobotContext>
  );
}
