import RobotHeader from "../../components/RobotHeader/RobotHeader";
import HiddenFrame from "../../components/HiddenFrame/HiddenFrame";
import RobotSubPageLayout from "../../layouts/RobotSubPageLayout";
import RobotContext from "../../contexts/RobotContext";
import { ReactElement } from "react";

export default function RobotPage(): ReactElement {
  return (
    <RobotContext>
      <div className="grid grid-cols-1 gap-6">
        <RobotHeader />
        <RobotSubPageLayout />
        <HiddenFrame />
      </div>
    </RobotContext>
  );
}
