import EnvironmentPageLayout from "../../layouts/EnvironmentPageLayout/EnvironmentPageLayout";
import RobotContext from "../../contexts/RobotContext";
import { ReactElement } from "react";

export default function EnvironmentPage(): ReactElement {
  return (
    <RobotContext>
      <EnvironmentPageLayout />
    </RobotContext>
  );
}
